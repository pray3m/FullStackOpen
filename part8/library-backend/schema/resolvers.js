const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Author = require("../models/author");
const Book = require("../models/book");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const foundAuthor = await Author.findOne({ name: args.author });
        if (!foundAuthor) return [];
        return await Book.find({
          author: foundAuthor._id,
          genres: args.genre,
        }).populate("author");
      } else if (args.author) {
        const foundAuthor = await Author.findOne({ name: args.author });
        return await Book.find({ author: foundAuthor._id }).populate("author");
      } else if (args.genre)
        return await Book.find({ genres: { $in: [args.genre] } }).populate(
          "author"
        );
      else return await Book.find({}).populate("author");
    },

    allAuthors: async () => {
      const authors = await Author.find({});
      return authors;
    },
  },

  Author: {
    bookCount: async (root, args, { authorBookCountLoader }) => {
      // Use the DataLoader to get the book count for the author
      return await authorBookCountLoader.load(root._id);
    },
  },

  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("Invalid Credentials", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },

    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      let book;
      try {
        const existingAuthor = await Author.findOne({ name: args.author });
        if (!existingAuthor) {
          const author = new Author({ name: args.author });
          await author.save();
        }

        const foundAuthor = await Author.findOne({ name: args.author });
        book = new Book({ ...args, author: foundAuthor._id });
        await book.save();
        await book.populate("author");
      } catch (error) {
        if (error.name === "ValidationError") {
          throw new GraphQLError("validation failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args,
              error,
            },
          });
        } else {
          throw new GraphQLError("adding book failed", {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
              invalidArgs: args,
              error,
            },
          });
        }
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });
      return book;
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) return null;

      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        if (error.name === "ValidationError") {
          throw new GraphQLError("updating author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args,
              error,
            },
          });
        } else {
          throw new GraphQLError("updating author failed", {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
              invalidArgs: args,
              error,
            },
          });
        }
      }

      return author;
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;

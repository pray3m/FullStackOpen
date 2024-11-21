import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS, CREATE_BOOK } from "../queries";
import PropTypes from "prop-types";
import { updateCache } from "../utils/helpers";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      console.log(messages);
    },
    update: (cache, response) => {
      updateCache(cache, { query: ALL_BOOKS }, response.data.addBook);
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    createBook({
      variables: {
        title,
        published,
        author,
        genres,
      },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

NewBook.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default NewBook;

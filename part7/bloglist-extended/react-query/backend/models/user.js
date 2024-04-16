const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: [3, "Must be at least 3"],
    unique: true,
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
    minLength: [3, "Must be at least 3"],
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      onDelete: "cascade",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id, delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

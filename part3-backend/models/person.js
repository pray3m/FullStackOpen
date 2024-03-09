const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const url = process.env.MONGODB_URI

console.log("Connecting to ", url)

mongoose
  .connect(url)
  .then((_result) => console.log("Connected to MongoDB!"))
  .catch((error) => console.log("Error connecting to MongoDB:", error.message))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: (v) => /\d{2,3}-\d+/.test(v),
  },
})

personSchema.set("toJSON", {
  transform: (_doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  },
})

module.exports = mongoose.model("Person", personSchema)

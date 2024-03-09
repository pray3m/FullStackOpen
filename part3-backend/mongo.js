const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://prem:${password}@cluster0.xunejtq.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set("strictQuery", false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set("toJSON", {
  transform: (_doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  },
})

const Person = mongoose.model("Person", personSchema)

if (name && number) {
  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then((_result) => {
    console.log(`added ${person.name} ${person.number} to phonebook`)
  })
}

Person.find({}).then((result) => {
  console.log("Phonebook:")
  result.forEach((person) => {
    console.log(`${person.name} ${person.number}`)
  })
  mongoose.connection.close()
})

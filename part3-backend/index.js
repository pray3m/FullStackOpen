require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const Person = require("./models/person")

const app = express()
app.use(express.static("dist"))
app.use(express.json())
app.use(cors())

// Setting up logger
morgan.token("data", (req) => JSON.stringify(req.body))
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
)

// API Routes
app.get("/", (_req, res) => {
  res.send("<h1> Hey (FullStackOpen) 👨‍💻 </h1>")
})

app.get("/info", (_req, res, next) => {
  Person.estimatedDocumentCount({})
    .then((c) => {
      res.send(`<p>Phonebook has info for ${c} people</p>
    <p> ${new Date().toString()}  </p>
  `)
    })
    .catch((error) => next(error))
})

// Person API Routes
app.get("/api/persons", (_req, res) => {
  Person.find({}).then((persons) => res.json(persons))
})

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((_result) => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.post("/api/persons", (req, res, next) => {
  const body = req.body

  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({
      error: "name or number is missing",
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      res.json(updatedPerson)
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

const errorHandler = (error, _req, res, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () =>
  console.log(`Server listening on  http://localhost:${PORT}`)
)

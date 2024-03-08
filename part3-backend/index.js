require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");
const { error } = require("console");

const app = express();
app.use(express.json());
app.use(express.static("dist"));
app.use(cors());

// Setting up logger
morgan.token("data", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

// API Routes
app.get("/", (req, res) => {
  res.send("<h1> Hey (FullStackOpen) 👨‍💻 </h1>");
});

app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
  <p> ${new Date().toString()}  </p>
    `);
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => res.json(persons));
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.send(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });

  // if (persons.find((p) => p.name === body.name))
  //   return res.status(400).json({
  //     error: "name already exits",
  //   });
});

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server listening on  http://localhost:${PORT}`)
);

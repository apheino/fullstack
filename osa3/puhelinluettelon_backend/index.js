require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

/*
let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
      },
      {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
      },
      {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
      },
      {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
      }
] */

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

//app.use(morgan('tiny'))
morgan.token('body', (req, res) => {
  if(req.body){
    return JSON.stringify(req.body)
  } else {
    return '-'
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/', (req, res) => {
  res.send('<h1>Phonebook!</h1>')
})

app.get('/api/persons', (req, res) => {
  //res.json(persons)
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  /*const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person){
        res.json(person)
    } else {
        res.status(404).end()
    }
    */
  Person.findById(req.params.id)
    .then(person => {
      if(person){
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))

})

app.get('/info', (req, res) => {
  /*res.send(`<p>Phonebook has info for ${persons.length} people</p>
              <p>${new Date().toDateString()} ${new Date().toTimeString()}</p>`)
    */

  Person.find({}).then(persons => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
              <p>${new Date().toDateString()} ${new Date().toTimeString()}</p>`)
  })
})

/*
const generateId = () => {
    return Math.floor(Math.random() * 10000000)
  }
*/
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    })
  }
  if (!body.number) {
    return res.status(400).json({
      error: 'number missing'
    })
  }
  /*
    if (persons.filter(p => p.name === body.name).length > 0){
        console.log('name must be unique')
        return res.status(400).json({
            error: 'name must be unique'
            })
    }
    */
  const person = new Person({
    name: body.name,
    number: body.number,
    //id: generateId(),
  })
  /*
  persons = persons.concat(person)
  res.json(person)
  */

  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
  })
    .catch(error => next(error))

})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  /* const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
  */
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  //console.error(error.name)
  //console.error(error.kind)
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

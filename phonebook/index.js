// node_modules/.bin/nodemon index.js
console.log("'Hello' World")
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.static('build'))


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
  
app.get('/api/persons/:id', (request, response) => {
    console.log(`GET persons/${request.params}`)
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
        response.status(404).end()
    }
})


app.get('api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    console.log(id)

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    console.log(`${id} succesfully deleted`)
    response.status(204).end()
})


const generateId = () => {
    return Math.floor(Math.random() * (2**15))
}

const duplicateCheck = (person) => {
    for (const p of persons) {
        if (p.name == person.name) {
            console.log('duplicate name')
            return true
        }
    }
    return false
}
app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
    if (!body.name) {
        return response.status(400).json({ 
            error: 'name missing' 
        })
    }
    if (!body.number) {
        return response.status(400).json({ 
            error: 'number missing' 
        })
    }
    if (duplicateCheck(body.name)) {
        console.log(body.name)
        return response.status(400).json({ 
            error: `${body.name} is already in the phonebook` 
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }
    persons = persons.concat(person)
    response.json(persons)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
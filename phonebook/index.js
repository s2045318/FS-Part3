console.log("Hello World")
const express = require('express')
const app = express()

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


app.get('/info', (request,reponse) => {
    console.log('info page reached')
    const d = new Date();
    const html = `  <div>
                      <p>Phonebook has info for ${persons.length} people</p>
                      <p>${d}</p>
                    </div>`
    reponse.send(html)
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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
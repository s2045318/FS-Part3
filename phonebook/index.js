// node_modules/.bin/nodemon index.js
console.log("Hello World server started")
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.get('/api/persons', (request, response) => {
    console.log('request sent for all persons')
    Person.find({}).then(result => {
        response.json(result)
        result.forEach(note => {
            console.log(note)
        })
      })
  })
  
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
  //  if (duplicateCheck(body.name)) {
     //   console.log(body.name)
    //    return response.status(400).json({ 
    //        error: `${body.name} is already in the phonebook` 
   //     })
   // }

    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson => {
        response.json(savedPerson)
      })
})


const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
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



//let persons = [
 //   { 
  //    "id": 1,
  //    "name": "Arto Hellas", 
  //    "number": "040-123456"
  //  },
  //  { 
   //   "id": 2,
   //   "name": "Ada Lovelace", 
   //   "number": "39-44-5323523"
   // },
   // { 
   //   "id": 3,
   //   "name": "Dan Abramov", 
   //   "number": "12-43-234345"
  //  },
  //  { 
  //    "id": 4,
  //    "name": "Mary Poppendieck", 
   //   "number": "39-23-6423122"
   // }
//]

app.get('/api/persons', (request, response) => {
    console.log('request sent for all persons')
    Person.find({}).then(result => {
        response.json(result)
        result.forEach(note => {
            console.log(note)
        })
      })
  })
  



const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
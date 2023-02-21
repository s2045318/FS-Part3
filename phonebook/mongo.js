const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://jbggill:${password}@cluster0.z6pejcu.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {
    Person.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
        mongoose.connection.close()
    })
  })
}

else {
    
    const person = new Person({
        name: process.argv[3],
        number: String(process.argv[4]),
      })
      console.log(`adding ${person.name}...`)
      person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
      })
}



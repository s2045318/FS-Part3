import {useState, useEffect} from 'react'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newContact, setNewContact] = useState(['',''])
  const [operationMessage, setoperationMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(intialPersons => {
        console.log('promise fullfilled')
        setPersons(intialPersons)})
  },[])

  const handleAdd = (event) => {
    event.preventDefault()
    const contact = {
      name : newContact[0],
      number : newContact[1]
    }
    if (persons.some(value => value.name === contact.name)) {
      console.log("already in my records");
      setNewContact(['',''])
      alert(`${contact.name} is already added to the phonebook`)
      return 
    }
    personService
      .create(contact)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewContact(['',''])
        console.log('boo!! person added')
      })
    setoperationMessage(
        `Added '${contact.name}'`
    )
    setTimeout(() => {
      setoperationMessage(null)
      }, 5000
    )
  }


  const handleNewContactNameChange = (event) => {
    console.log(event.target.value)
    setNewContact([event.target.value,newContact[1]])
  }
  const handleNewContactNumberChange = (event) => {
    console.log(event.target.value)
    setNewContact([newContact[0],event.target.value])
  }
  const handleDelete = (id,name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
      setPersons(persons.filter(person => person.id !== id))
      console.log(`person number ${id} has been deleted`)
    
      setoperationMessage(
        `Deleted '${name}'`
      )
      setTimeout(() => {
        setoperationMessage(null)
      }, 5000)
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={operationMessage}/>
      <Form newContact={newContact} handleNewContactNameChange={handleNewContactNameChange}
            handleNewContactNumberChange={handleNewContactNumberChange } addContact={handleAdd}/>
      <h2>Numbers</h2>
      {persons.map(contact => <Contact id={contact.id} name={contact.name} handleDelete={handleDelete} number={contact.number} />)}
    </div>
  )
}

const Form = ({ newContact, handleNewContactNameChange, handleNewContactNumberChange, addContact }) => (
  <form onSubmit={addContact}>
    <div>name: <input value={newContact[0]} onChange={handleNewContactNameChange}/></div> 
    <div>number: <input value={newContact[1]} onChange={handleNewContactNumberChange}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Contact = (props) => {
  const name = props.name
  const number = props.number
  const id = props.id
  console.log(id)
  return (
      <p>{name} {number}  <button onClick={() => props.handleDelete(id,name)}>delete</button>
          <br/>
      </p>
  )
} 

const Notification = ({ message }) => {
  const notStyle ={
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
  }
  if (message === null) {
    return null
  }

  return (
    <div style = {notStyle}>
      {message}
    </div>
  )
}

export default App
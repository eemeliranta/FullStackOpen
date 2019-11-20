import React, { useState, useEffect  } from 'react'
import ReactDOM from 'react-dom'
import phonebook from './services/phonebook.js'
import './index.css'

const FilterForm = (props) => {
  return (
    <form>
      <div>Filter: <input value={props.value} onChange={props.onChange} /></div>
    </form>
  )
}

const AddNewPersonForm = (props) => {
  return (
    <div>
      <h2>Add new</h2>
      <form onSubmit={props.addPerson}>
        <div>name: <input value={props.newName} onChange={props.handleNameChange} /></div>
        <div>number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
    </div>
  )
}

const DisplayNumbers = (props) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {props.numbers}
      </ul>
    </div>
  )
}

const Notification = ({ message, type}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    phonebook
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setPersonFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('info')

  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleFilterChange = (event) => {setPersonFilter(event.target.value)}

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    if (persons.filter(person => person.name === newName).length > 0) {
      if(window.confirm(newName+" is already in the phonebook, replace old number with a new one?")){
        phonebook
        .update(persons.find(person => person.name === newName).id, newPerson)
        .then(response => {
          setPersons(persons.map(n => n.name !== newPerson.name ? n : newPerson))
          setMessageType('info')
          setMessage(`Person's '${newPerson.name}' has been updated`)
          setTimeout(() => {setMessage(null)}, 5000)
        })
        .catch(error => {
          setMessageType('error')
          setMessage(`Person's '${newPerson.name}' has already been deleted from the server`)
          setTimeout(() => {setMessage(null)}, 5000)
          setPersons(persons.filter(n => n.name !== newPerson.name))
        })
      }
    }
    else {
      phonebook
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setMessageType('info')
        setMessage(`Person '${newPerson.name}' added to the server`)
        setTimeout(() => {setMessage(null)}, 5000)
      })
    }
  }

  const deletePerson = (person) => {
    if(window.confirm("Are you sure you want to delete "+person.name+"?")){
      phonebook
      .remove(person.id)
      .then(response => {
        setPersons(persons.filter(n => n.id !== person.id))
        setMessageType('info')
        setMessage(`Person '${person.name}' deleted from the server`)
        setTimeout(() => {setMessage(null)}, 5000)
      })
      .catch(error => {
        setMessageType('error')
        setMessage(`Person's '${person.name}' has already been deleted from the server`)
        setTimeout(() => {setMessage(null)}, 5000)
        setPersons(persons.filter(n => n.name !== person.name))
      })
      
    }
  }
  
  const rows = () => persons.filter(person => person.name.toLowerCase().search(personFilter) >= 0).map(person =>
    <li key={person.name} > {person.name} {person.number} <button onClick={() => deletePerson(person)} >delete</button></li>
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <FilterForm value={personFilter} onChange={handleFilterChange} />
      <AddNewPersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <DisplayNumbers numbers={rows()}/>
    </div>
  )
}

//export default App

ReactDOM.render(<App />, document.getElementById('root'))
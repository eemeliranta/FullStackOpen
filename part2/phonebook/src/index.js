import React, { useState } from 'react'
import ReactDOM from 'react-dom'


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
        <div>name: <input value={props.newName} onChange={props.andleNameChange} /></div>
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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setPersonFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setPersonFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.filter(person => person.name === newName).length > 0) {
      alert(newName + ' is already added to phonebook')
    }
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const rows = () => persons.filter(person => person.name.toLowerCase().search(personFilter) >= 0).map(person =>
    <li key={person.name} > {person.name} {person.number}</li>
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm value={personFilter} onChange={handleFilterChange} />
      <AddNewPersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <DisplayNumbers numbers={rows()}/>
    </div>
  )
}

//export default App

ReactDOM.render(<App />, document.getElementById('root'))
import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
    const [ persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]) 

    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ listFilter, setListFilter ] = useState('')

    const addName = (event) => {
        event.preventDefault()

        if (persons.filter(person => person.name === newName).length === 0){
            const nameObject = {
                name: newName,
                number: newNumber
            }
            setPersons(persons.concat(nameObject))
            setNewName('')
            setNewNumber('')
            return
        }
        window.alert(`${newName} is already added to phonebook`)
        
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }
    const handleListFilterChange = (event) => {
        console.log(event.target.value)
        setListFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter 
                listFilter={listFilter}
                handleListFilterChange={handleListFilterChange} 
            /> 

            <h2>add a new</h2>
            <PersonForm 
                addName={addName}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />

            <h2>Numbers</h2>
            <Persons persons={persons} listFilter={listFilter} />
        </div>
    )

}

export default App
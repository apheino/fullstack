import React, { useState , useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
    const [ persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ listFilter, setListFilter ] = useState('')

    const hook = () => {
        //console.log('effect')
        personService
          .getAll()
          .then(response => {
            //console.log('promise fulfilled')
            setPersons(response)
        })
    }
      
    useEffect(hook, [])

    const addName = (event) => {
        event.preventDefault()
        const existingIndex = persons.findIndex(person => person.name === newName)

        if (existingIndex < 0){
            const nameObject = {
                name: newName,
                number: newNumber
            }
            
            personService
                .create(nameObject)
                .then(response => {
                    setPersons(persons.concat(response))
                    setNewName('')
                    setNewNumber('')
                }) 
        }
        else {
            if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
                const id = persons[existingIndex].id
                const nameObject = {
                    name: newName,
                    number: newNumber
                }
                personService
                    .update(id, nameObject)
                    .then(response => {
                        setPersons(persons.map(person => person.id !== id ? person : response))
                        setNewName('')
                        setNewNumber('')
                    })
            }
        }
    }

    const deletePersonId = (id, name) => {
        if (window.confirm(`Delete ${name} ?`)){
            personService
                .deleteId(id)
                .then(response => {
                    setPersons(persons.filter(person => person.id !== id))
                    setNewName('')
                    setNewNumber('')
                })
                .catch(error => {
                    alert(
                      `${name} was already deleted from server`
                    )
                    setPersons(persons.filter(person => person.id !== id))
                  })
        }
        else {
            console.log('Delete canceled...')
        }
    }
    
    const handleNameChange = (event) => {
        //console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        //console.log(event.target.value)
        setNewNumber(event.target.value)
    }
    const handleListFilterChange = (event) => {
        //console.log(event.target.value)
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
            <Persons 
                persons={persons} 
                listFilter={listFilter}
                deletePerson={deletePersonId} />
        </div>
    )

}

export default App
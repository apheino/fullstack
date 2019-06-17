import React from 'react'
import Person from './Person'

const Persons = ({persons, listFilter}) => {
    return (
        <div>
        {persons.filter(person => person.name.toUpperCase().indexOf(listFilter.toUpperCase())>=0).map(person => 
            <Person key={person.name} person={person}/>
        )}
        </div>
    )

}

export default Persons
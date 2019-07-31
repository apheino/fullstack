import React from 'react'
import Person from './Person'

const Persons = ({persons, listFilter, deletePerson}) => {
    return (
        <div>
        {persons.filter(person => person.name.toUpperCase().indexOf(listFilter.toUpperCase())>=0).map(person => 
            <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id, person.name)}/>
        )}
        </div>
    )

}
 
export default Persons
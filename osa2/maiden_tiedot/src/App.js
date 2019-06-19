import React, { useState , useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
    const [ countries, setCountries] = useState([]) 
    const [ listFilter, setListFilter ] = useState('')

    const hook = () => {
        console.log('effect')
        axios
          .get('https://restcountries.eu/rest/v2/all')
          .then(response => {
            console.log('promise fulfilled')
            console.log(response)
            setCountries(response.data)
        })
    }
      
    useEffect(hook, [])

    const handleListFilterChange = (event) => {
        console.log(event.target.value)
        setListFilter(event.target.value)
    }

    const handleCountrySelect = (event) => {
        console.log(event.target.value)
        setListFilter(event.target.value)
    }

    return (
        <div>
             
            <Filter 
                listFilter={listFilter}
                handleListFilterChange={handleListFilterChange} 
            /> 
            <Countries countries={countries} listFilter={listFilter} buttonHandler={handleCountrySelect} />
        </div>

            
    )

}

export default App
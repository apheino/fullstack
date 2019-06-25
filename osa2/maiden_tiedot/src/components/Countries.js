import React from 'react'
import Country from './Country'
import OneCountry from './OneCountry'

const Countries = ({countries, listFilter, buttonHandler}) => {
    const filteredCountries = countries.filter(country => country.name.toUpperCase().indexOf(listFilter.toUpperCase())>=0)
    if (filteredCountries.length > 10){
        return(
            <div>
                Too many matches, specify another filter
            </div>
        )
    } 
    else if (filteredCountries.length > 1){
        return (
            <div>
            {filteredCountries.map(country => 
                <Country key={country.name} country={country} buttonHandler={buttonHandler} />
            )}
            </div>
        )
    }

    else if (filteredCountries.length === 1){
        return (
            <div>
            {filteredCountries.map(country => 
                <OneCountry key={country.name} country={country}/> 
            )}
            </div>
        )
    }

    return(
        <div>
            No matches
        </div>
    )
  
}

export default Countries
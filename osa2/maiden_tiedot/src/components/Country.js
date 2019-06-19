import React from 'react'


const Country = ({country, buttonHandler}) => {
    return (
        <div>
            {country.name} <button onClick={buttonHandler} value={country.name}>show</button>
        </div>
    )
} 
 
export default Country
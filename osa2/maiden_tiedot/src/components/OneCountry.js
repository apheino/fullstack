import React, {useState, useEffect} from 'react'
import axios from 'axios'

const OneCountry = ({country}) => {
    const [ weather, setWeather] = useState({
        temp: 0,
        condition: '',
        windSpeed: 0,
        windDir: 'N/A'
    }) 
    

    const hook = () => {
        console.log('effect')
        axios
          .get('https://api.apixu.com/v1/current.json?key=d7408598edd34095857155057191806&q='+country.capital)
          .then(response => {
            console.log('promise fulfilled')
            console.log(response)
            const weatherObject = {
                temp: response.data.current.temp_c,
                condition: response.data.current.condition.icon,
                windSpeed: response.data.current.wind_kph,
                windDir: response.data.current.wind_dir
            }
            console.log(weatherObject)
            setWeather(weatherObject)
        })
    }
      
    useEffect(hook, [])

    return (
        <div>
            <h1>{country.name}</h1>
            <div>
                capital {country.capital}
            </div>
            <div>
                population {country.population}  
            </div>

            
            <h2>languages</h2>
                <ul>
                    {country.languages.map(language =>
                        <li key={language.iso639_1}>{language.name}</li>)}  
                </ul>

            <div>
                <img src={country.flag} alt='Flag' width = '200' />
            </div>

            <h2>Weather in {country.capital}</h2>
            <div>
                        <strong>temperature:</strong> {weather.temp}
            </div>
            <div>
                <img src={weather.condition} alt='Condition' width = '100' />
            </div>
            <div>
                <strong>wind:</strong> {weather.windSpeed} kph direction {weather.windDir}
            </div>
                          
        </div>
    )
}

export default OneCountry
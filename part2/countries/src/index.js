import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const DisplayListOfCountries = (props) => {
  return (
    <div>
      <ul>
        {props.countries}
      </ul>
    </div>
  )
}


const DisplayCountry = (props) => {
  const country = props.country
  const [weather, setWeather] = useState();
  useEffect(() => {
    axios
      .get('https://api.apixu.com/v1/current.json?key=__API_KEY_HERE__&q=' + country.capital)
      .then(response => {
        setWeather(response.data.current)
      })
  }, [])

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h2>Languages</h2>
      <ul>
        {country.languages.map(l => <li key={l.name} > {l.name}</li>)}
      </ul>
      <p><img src={country.flag} alt="Smiley face" height="80"></img></p>
      
      {weather && <div>
        <h2>Weather in {country.capital}</h2>
        <p><b>temperature:</b> {Math.round(weather.temp_c)} Celsius</p>
        <p><img src={weather.condition.icon} /></p>
        <p><b>wind:</b> {weather.wind_kph} kph direction {weather.wind_dir}</p>
      </div>}

    </div>)
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [shownCountry, setShownCountry] = useState()
  const [filter, setFilter] = useState('')


  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const rows = () => {
    return filteredCountries.map(country => <li key={country.name}> {country.name} <button onClick={() => setShownCountry(country)} >show</button></li>)
  }

  const filteredCountries = countries.filter(c => c.name.toLowerCase().search(filter) >= 0)
  return (
    <div>
      <div>find countries: <input value={filter} onChange={handleFilterChange} /></div>
      {filteredCountries.length > 10 && <p>Too many matches.</p>}
      {filteredCountries.length === 0 && <p>No matches.</p>}
      {(filteredCountries.length === 1 || shownCountry) && <DisplayCountry country={shownCountry || filteredCountries[0]} />}
      {(filteredCountries.length <= 10 && filteredCountries.length > 1 && !shownCountry) && <DisplayListOfCountries countries={rows()} />}
    </div>
  )
}

//export default App

ReactDOM.render(<App />, document.getElementById('root'))
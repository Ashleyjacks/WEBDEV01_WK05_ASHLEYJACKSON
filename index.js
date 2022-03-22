import axios from 'axios'
import inquirer from 'inquirer'
import questions from './questions.js'

const API_KEY = '3e34e589245d0f0fa0071c9fc8cfe1a1'

// ask user for their location
// use axios to fetch the lat and long
// use axios, use lat and long info to get the weather
// pass info back to user

const main = async (api_key) => {
    try {
        // asking for city and state
        let { city, state, option } = await inquirer.prompt(questions)

        // get coordinates for location
        let coords = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},us&appid=${api_key}`)
        let { lat, lon } = coords.data[0]

        let weather = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${api_key}`)
        console.log(weather.data)
    } catch (error) {
        console.log(error)
    }


}

main(API_KEY)
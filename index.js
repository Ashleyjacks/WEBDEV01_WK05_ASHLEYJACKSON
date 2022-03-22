import axios from 'axios'
import inquirer from 'inquirer'
import Table from 'cli-table3'
import voca from 'voca'
import { format, fromUnixTime } from 'date-fns'
import questions from './questions.js'

const API_KEY = '3e34e589245d0f0fa0071c9fc8cfe1a1'

const main = async (api_key) => {
    try {
        // asking for city and state
        let { city, state, option } = await inquirer.prompt(questions)

        // get coordinates for location
        let coords = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},us&appid=${api_key}`)
        let { lat, lon } = coords.data[0]

        // get weather info
        let weather = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${api_key}`)
        let { current, daily } = weather.data

        // initialize table
        let table = new Table({
            head: ['Date', 'Desc', 'Temp', 'Humiditiy']
            , colWidths: [15, 20, 15, 15]
        });

        // flitering result
        if (option == 'Current Day') {
            let { dt, weather, temp, humidity } = current
            let { description } = weather[0]


            table.push(
                [(format(fromUnixTime(dt), 'MM/dd/yyyy')),
                voca.titleCase(description),
                `${temp}°`, humidity]
            );

            console.log(table.toString())

        } else {

            for (const day of daily) {
                let { dt, temp, humidity, weather } = day
                let { description } = weather[0]
                table.push(
                    [
                        format(fromUnixTime(dt), 'MM/dd/yyy'),
                        voca.titleCase(description),
                        `${temp.day}°F`,
                        humidity
                    ]
                )
            }
            console.log(table.toString())
        }

    } catch (error) {
        console.log(error)
    }


}

main(API_KEY)
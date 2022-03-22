export default [
    {
        type: 'input',
        name: 'city',
        message: 'What is the city?'
    },
    {
        type: 'input',
        name: 'state',
        message: 'What is the state?'
    },
    {
        type: 'list',
        name: 'opition',
        message: 'Choose opition below',
        choices: [
            'Current Day',
            '7 Day Forecasts'
        ]
    }
]
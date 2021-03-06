require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const dbConnect = require('./utils/database')

const { PORT, SERVER } = process.env

//routes
const authRoute = require('./routes/auth')

const app = express()

//------middlewares------

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


//------connect routes-------
app.use('/auth', authRoute)


app.get('/', (req, res) => {
    res.send("Hello world")
})

//start server function as a callback to mongoose, first arg is error

function serverStart(error){
    if(error) return console.log(error)

    app.listen(PORT, SERVER, () => {
        console.log(`server start at ${PORT} port`)
    })
}

dbConnect(serverStart)


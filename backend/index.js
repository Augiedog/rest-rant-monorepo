// Modules and Globals
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { Sequelize } = require('sequelize')
const cors = require('cors')
const app = express();
const defineCurrentUser = require('./middleware/defineCurrentUser')

// Express Settings
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(defineCurrentUser)

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Rest-rant backend'
    })
})

// Controllers & Routes
app.use(express.urlencoded({ extended: true }))

app.use('/places', require('./controllers/places'))
app.use('/users', require('./controllers/users'))
app.use('/authentication', require('./middleware/auth'))

// Listen for Connections
app.listen(process.env.PORT, () => {
    console.log(`Serving it up on port ${process.env.PORT}`)
})
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })

// Users
const userModel = require('./users/userModel')(mongoose)
const User = require('./users/User')(userModel)
const userRoutes = require('./users/user.routes')(express, User)

// Teams
const teamModel = require('./teams/teamModel')(mongoose)
const Team = require('./teams/Team')(teamModel)
const teamRoutes = require('./teams/team.routes')(express, Team)

// Boards
const boardModel = require('./boards/boardModel')(mongoose)
const Board = require('./boards/Board')(boardModel)
const boardRoutes = require('./boards/board.routes')(express, Board)

// Cards
const cardModel = require('./cards/cardModel')(mongoose)
const Card = require('./cards/Card')(cardModel)
const cardRoutes = require('./cards/card.routes')(express, Card)



// Middleware
app.use(bodyParser.json())

// "Controllers" 
app.use('/users', userRoutes)
app.use('/teams', teamRoutes)
app.use('/boards', boardRoutes)
app.use('/cards', cardRoutes)

// fichero de gestión de errores
//app.use(errorHandle)

app.listen(4000, () => {
  console.log('Escuchando peticiones en el puerto 4000')
})
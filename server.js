const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const config = require('./configs/config')
const checkToken = require('./helpers/checkToken')
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/proyecto', { useNewUrlParser: true, useUnifiedTopology: true })

// Users
const userModel = require('./users/userModel')(mongoose)
const User = require('./users/User')(userModel)
const userRoutes = require('./users/user.routes')(express, User, checkToken)

// Boards
const boardModel = require('./boards/boardModel')(mongoose)
const Board = require('./boards/Board')(boardModel, mongoose)
const boardRoutes = require('./boards/board.routes')(express, Board, checkToken)

// Lists
const listModel = require('./lists/listModel')(mongoose)
const List = require('./lists/List')(listModel, boardModel, mongoose)
const listRoutes = require('./lists/list.routes')(express, List, checkToken)

// Cards
const cardModel = require('./cards/cardModel')(mongoose)
const Card = require('./cards/Card')(cardModel,boardModel,listModel, mongoose)
const cardRoutes = require('./cards/card.routes')(express, Card, List, checkToken)

//  Auth
const Auth = require('./auth/Auth')(jwt, config.secretKey, userModel)
const authRoutes = require('./auth/auth.routes')(express, Auth)



// Middleware
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(cors())

// "Controllers" 
app.use('/users', userRoutes)
app.use('/boards', boardRoutes)
app.use('/lists', listRoutes)
app.use('/cards', cardRoutes)
app.use('/auth', authRoutes)

// fichero de gestión de errores
//app.use(errorHandle)

app.listen(4000, () => {
  console.log('Escuchando peticiones en el puerto 4000')
})
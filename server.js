const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const config = require('./configs/config')
const checkToken = require('./helpers/checkToken')
const encripter = require('./helpers/encripter')
const cors = require('cors')
const nodemailer = require('nodemailer')
console.log('database', config.database);

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })

// Mailer
const Mailer = require('./mailer/Mailer')(nodemailer)

// Models
const cardModel = require('./cards/cardModel')(mongoose)
const listModel = require('./lists/listModel')(mongoose)
const boardModel = require('./boards/boardModel')(mongoose)
const userModel = require('./users/userModel')(mongoose)

//  Auth
const Auth = require('./auth/Auth')(jwt, config.secretKey, userModel, encripter)
const authRoutes = require('./auth/auth.routes')(express, Auth)


// Clases
const Card = require('./cards/Card')(cardModel, mongoose)
const List = require('./lists/List')(listModel, cardModel, Card, boardModel)
const Board = require('./boards/Board')(boardModel, userModel, listModel, List, cardModel,  Card, mongoose)
const User = require('./users/User')(userModel, boardModel, Board, listModel, List, cardModel, Card, Auth, Mailer, encripter)

// Rutas
const cardRoutes = require('./cards/card.routes')(express, Card, List, checkToken)
const listRoutes = require('./lists/list.routes')(express, Card, List, Board, checkToken)
const boardRoutes = require('./boards/board.routes')(express, Board, checkToken)
const userRoutes = require('./users/user.routes')(express, User, checkToken)





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

app.listen(config.port, () => {
  console.log('Escuchando peticiones en el puerto 4000')
})
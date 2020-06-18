console.log('[LOADING USER]')
const mongoose = require('mongoose')
mongoose.Promise = Promise
const config = require('../configs/config')
const User = require('../users/userModel')(mongoose)
const Board = require('../boards/boardModel')(mongoose)
const encripter = require('./../helpers/encripter')
mongoose.connect(config.database, { useNewUrlParser: true })

console.log('[1/3] Creating User...')
let testUser = new User({
  name: 'Maria',
  lastname: 'Nrihuega',
  email: 'maria@gmail.com',
  password: encripter('test'),

  rol: 'admin',
  company: 'arcipreste',
  active: true,
})
testUser.save().then((userEntity) => {
  console.log('[2/3] User created...')
  let board = new Board({
    title: 'Welcome',
    initDate: new Date()
  })
  board.save().then((boardEntity) => {
    userEntity.boards.push(boardEntity._id)
    userEntity.save().then(() =>{
       mongoose.connection.close()
      console.log('[3/3] User successfully created...')
    })
  })
})
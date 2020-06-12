
const config = require('./../configs/config')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const checkToken = (token) => {
    if (token) {
      let result = jwt.verify(token, config.secretKey)
      if (result.id !== '' && result.id !== 'undefined' && result.id !== null){
        return {success: true, message: 'Token verified', user: result}
      }  
    } else {
      let err = new Error('No token provided')
      err.status = 401
      return err
    }
  }

  let token = req.body.token || req.query.token || req.headers['authorization']
  let body = checkToken(token)
  
  
  if (body.message == 'Token verified' && body.success) {
    req.user = body.user
    next()
  } else {
    let error = new Error(body.message)
    error.status = 401
    next(error)
  }
}
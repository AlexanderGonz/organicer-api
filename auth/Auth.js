const { json } = require("body-parser")
const { secretKey } = require("../configs/config")

module.exports = (jwt, secretKey, userModel) => {

  class Auth {
    async login(credentials) {
      try {
        if(!credentials || !credentials.mail || !credentials.pass){
          return {success: false, message: 'faltan credenciales'}
        }
        let user = await userModel.findOne({email: credentials.mail, password: credentials.pass}).lean()
        if(user && user.id) {

          const token = jwt.sign(user, secretKey, {
            expiresIn: 86400
          })

          return {
            success: true,
            mensaje: 'Atenticacion correcta',
            token: token
          }

        } else {
          return {sumensaje: "mail o pass incorrecta"}
        }

      } catch (e) {
        throw(e)
      } 
    }
  }

  return new Auth()
}
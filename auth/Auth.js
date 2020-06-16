const { json } = require("body-parser")
const { secretKey } = require("../configs/config")

module.exports = (jwt, secretKey, userModel, encripter) => {

  class Auth {
    async login(credentials) {
      try {
        if(!credentials || !credentials.mail || !credentials.pass){
          return {success: false, message: 'Faltan credenciales'}
        }
        credentials.pass = encripter(credentials.pass)
        let user = await userModel.findOne({email: credentials.mail, password: credentials.pass}).lean()
        if(user && user._id) {

          if (!user.active) {
            return {
              success: false,
              message: `Validación incompleta, revise su correo electrónico (${user.email})`
            }
          }

          const token = jwt.sign(user, secretKey, {
            expiresIn: 86400
          })
          user.password = null

          return {
            success: true,
            message: 'Atenticacion correcta',
            token: token,
            user:user
          }

        } else {
          return {success: false, message: "Email o Password incorrecta"}
        }

      } catch (e) {
        throw(e)
      } 
    }
  }

  return new Auth()
}
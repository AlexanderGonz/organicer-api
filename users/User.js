const { response } = require("express");

module.exports = (userModel, boardModel, Board, listModel, List, cardModel, Card, Auth, config, Mailer, encripter) => {

  class User {
    convertArrayToObject = (array, key) => {
      const initialValue = {};
      return array.reduce((obj, item) => {
        return {
          ...obj,
          [item[key]]: item,
        };
      }, initialValue);
    };

    async create(admin, newUser) {
      try {
        let adminEntity = await userModel.findById(admin._id)
        if (adminEntity && adminEntity.rol === 'admin') {
          let password = this.generatePassword()
          newUser.password = encripter(password)
          newUser.company = admin.company
          newUser.active = false
          let doc = await userModel.create(newUser)

          // Activation mail
          let body = `
            <p> Saludos ${doc.name} ${doc.lastname}, </p>
            <p> 
              Bienvenido a OrgaNicer. Le proporcionamos sus credenciales de acceso con una contraseña
              aleatoria que, una vez dentro, le recomendamos cambiar:
              <ul>
                <li><strong>Usuario: </strong>${doc.email}</li>
                <li><strong>Contraseña: </strong>${password}</li>
              </ul>
            </p>
            <p>
              Para empezar a utilizar tu cuenta, deberá hacer click en el siguiente enlace de activación:
            </p>
            <p>
              <a href="${config.clientUrl}/activate/${doc._id}"><strong>Activar cuenta</strong></a>
            </p>
          `
          await Mailer.sendMail(doc.email, 'OrgaNicer - Activación de cuenta', body)

          return doc
        } else {
          if(adminEntity)
            throw new Error('Unauthorized')
          else
            throw new Error('User not Found')
        }
      } catch (e) {
        throw e
      }
    }

    generatePassword() {
      let chars = [ '1', 'A', '2', 'B', '3', 'C', '4', 'D', '5', 'E', '6', 'F', '7', 
        'G', '8', 'H', '9', 'I', '10', 'J', '11', 'K', '12', 'L', '13', 'M', '14', 'N', 
        '15', 'O', '16', 'P', '17', 'Q', '18', 'R', '19', 'S', '20', 'T', '21', 'U', '22', 
        'V', '23', 'W', '24', 'X', '25', 'Y', '26', 'Z'
      ]
      let password = ''
      for (let i = 0; i < 6; i ++) {
        password += chars[Math.floor(Math.random() * chars.length)]
      }
      return password
    }

    // Devuelve los usuarios de la empresa menos los que ya pertenecen al board indicado
    async getUsersCompany (admin, boardID){
      try{
        let adminEntity = await userModel.findById(admin._id)
        
        if(adminEntity.rol === 'admin'){
          let doc = await userModel.find({company:adminEntity.company, boards:{$nin:[boardID]}})
          return this.convertArrayToObject(doc, 'id')
        }else{
          throw new Error('Unauthorized')
        }

      }catch (e) {
        throw e
      }
    }

    async activateUser(id) {
      try {
        let user = await userModel.findById(id)
        
        if (user) {
          
          user.active = true
          user.save()
          return {success: true}
        } else {
          throw new Error('Usuario no encontrado')
        }
      } catch(e) {
        throw e
      }
    } 

    async addBoard(user, board) {
      try {
        let boardEntity = await Board.create(board)
        let userEntity = await userModel.findById(user._id)

        if(boardEntity && userEntity.rol === 'admin'){
          userEntity.boards = [...userEntity.boards, boardEntity._id]
          let doc = await userEntity.save()
          // devuelvo boardEntity porque me interesa coger su _id para el front
          return boardEntity

        } else {
          let msg
          if(boardEntity){
            msg = 'User unauthorized'
            Board.delete(boardEntity._id)
          }else {
            msg = 'List create Error'
          }
          throw new Error (msg)
        }
      }catch (e) {
        throw e
      }
    }

    async updateName(user) {
      try {
        let userEntity = await userModel.findOne({id:user.id})
        if (userEntity) {
          userEntity.name = user.name
          let doc = await userEntity.save()
          return doc
        } else {
          throw new Error('User not found')
        }
      }catch (e) {
        throw e
      }
    }

    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    async updateUser(admin, user) {
      try{
          if(user.password){
            user.password = encripter(user.password)
          }else{
            delete user['password'] 
          }
            
          let doc = await userModel.updateOne({_id: admin._id},{$set: user})
          return doc
        
      }catch (e) {
        throw e
      }
    }

    async updateBoards(boards, user) {
      try {
        let userEntity = await userModel.findOne({id:user.id})
        if (userEntity) {
          userEntity.boards = [...userEntity.boards, ...boards]
          let doc = await userEntity.save()
          return doc
        } else {
          throw new Error('User not found')
        }
      }catch (e) {
        throw e
      }
    }

    async removeFromBoard(admin, userID, boardID){
      try{
        
        let adminEntity = await userModel.findById(admin._id)
        if(adminEntity.rol === 'admin'){
          let userEntity = await userModel.findById(userID)
          if(adminEntity._id.equals(userEntity._id)){
            throw new Error('No puedes eliminarte a ti mismo')
          }else{
            console.log('admin', adminEntity._id);
            console.log('userr', userEntity._id);
            
            let boards = userEntity.boards.filter((board) => board !== boardID)
            userEntity.boards = boards
            let doc = await userEntity.save()
            return doc
          }
        }else{
          throw new Error('Unauthorized')
        }
      }catch (e) {
        throw e
      }
    }

    async delete(userId) {
      try {
        let doc = await userModel.findByIdAndDelete(userId)
        return doc
      } catch (e) {
        throw e
      }
    }

  }

  return new User()
}
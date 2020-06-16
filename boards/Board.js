module.exports = (boardModel, userModel, listModel, List, cardModel, Card, mongoose) => {

  class Board {
    convertArrayToObject = (array, key) => {
      const initialValue = {};
      return array.reduce((obj, item) => {
        return {
          ...obj,
          [item[key]]: item,
        };
      }, initialValue);
    };

    async getBoardData(user, boardID) {
      
      try {
        let userEntity = await userModel.findById(user._id)
        
        if(userEntity && userEntity.boards.includes(boardID)){
          let boardEntity = await boardModel.findById(boardID)
          let lists = await listModel.find({_id: {$in: boardEntity.lists}})
          let cardsIds = []
          for (let list of lists) {
            cardsIds = [...cardsIds, ...list.cards]
          }
          let cards = await cardModel.find({_id:{$in:cardsIds}})
          let users = await userModel.find({boards:boardID})

          return {
            lists: this.convertArrayToObject(lists, 'id'), 
            cards: this.convertArrayToObject(cards, 'id'),
            users: this.convertArrayToObject(users, 'id')
          }
          
        }else {
          throw new Error(userEntity ? 'Not a user board' : 'User not Found')
        }
        

      } catch (e) {
        throw e
      }
    }

    async getUsers(user, boardID) {
      try {
        let doc = await userModel.find({boards:boardID})
        return doc
      } catch (e) {
        throw e
      }
    }

    async getUserBoards(user) {
      try {
        let userEntity = await userModel.findById(user._id)

        if(userEntity){
          let boardsIds = userEntity.boards
          
          let boards = await boardModel.find({_id: {$in: boardsIds}})

          return this.convertArrayToObject(boards, 'id')
        }else{
          return 'User not Found'
        }

        
      } catch (e) {
        throw e
      }
    }

    async create(board) {
      try {
        board.initDate = new Date()
        let doc = await boardModel.create(board)
        return doc
      } catch (e) {
        throw e
      }
    }

    async updateTitle(user, board) {
      try {
        let userEntity = await userModel.findById(user._id)

        if(userEntity.boards.includes(board._id)){
          let boardEntity = await boardModel.findById(board._id)
          if (boardEntity) {
            boardEntity.title = board.title
            let doc = await boardEntity.save()
            return doc
          } else {
            throw new Error('Board not found')
          }
        }else{
          throw new Error('Not a user board')
        }
      }catch (e) {
        throw e
      }
    }

    async addList(list, boardID) {
      try {
        let listEntity = await List.create(list)
        let boardEntity = await boardModel.findById(boardID)

        if(listEntity && boardEntity){
          boardEntity.lists = [...boardEntity.lists, listEntity._id]
          let doc = await boardEntity.save()
          // devuelvo listEntity porque me interesa coger su _id para el front
          return listEntity

        } else {
          let msg
          if(listEntity){
            msg = 'Board not Found'
            List.delete(listEntity._id)
          }else {
            msg = 'List create Error'
          }
          throw new Error (msg)
        }
      }catch (e) {
        throw e
      }
    }

    async addUser(admin, userID, boardID) {
      try{
        let adminEntity = await userModel.findById(admin._id)
        console.log(userID);
        
        if(adminEntity.rol === 'admin'){
          let userEntity = await userModel.findById(userID)
          userEntity.boards.push(boardID)
          userEntity.save()
        } else {
          throw new Error('Unauthorized')
        }

      } catch(e){
        throw e
      }
    }

    async dragList(droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd,draggableId, boardID){
      try {
        let boardEntity = await boardModel.findById(boardID)
        
        if(boardEntity && boardEntity.lists.includes(draggableId)){
          // Sacamos la lista del board
          let pulledOutList = boardEntity.lists.splice(droppableIndexStart, 1)
          // Agregamos la lista en la nueva posicion
          boardEntity.lists.splice(droppableIndexEnd, 0, ...pulledOutList)
          let doc = await boardEntity.save()
  
          return doc
          
        }else{
          let msg = boardEntity ? 'Not a board´s list' : 'Board not Found'
          throw new Error(msg)
        }


      } catch(e){
        throw e
      } 
    }

    async delete(boardID) {
      try {
        let board = await boardModel.findById(boardID)
        if (board) {
          let lists = await listModel.find({_id: {$in: board.lists}})
          let cardsIds = []
          for (let list of lists) {
            cardsIds = [...cardsIds, ...list.cards]
          }

          await Promise.all([
            userModel.updateMany({boards: boardID}, {$pull: {boards: boardID}}),
            cardModel.deleteMany({_id: {$in: cardsIds}}),
            listModel.deleteMany({_id: {$in: board.lists}}),
            boardModel.findByIdAndDelete(boardID)
          ])  

          return {success: true}
        } else {
          throw new Error('Board not found')
        }
      } catch (e) {
        throw e
      }
    }


    async deleteList(user, listID, boardID) {
      try {
        let userEntity = await userModel.findById(user._id)

        if(userEntity.boards.includes(boardID)) {
          let board = await boardModel.findById(boardID)

          if (board && board.lists.includes(listID)) {
            let listEntity = await listModel.findById(listID)

            if(listEntity){
              
              // borramos las cards
              await cardModel.deleteMany({_id: {$in: listEntity.cards}})
              // borramos la list
              let doc = await listModel.findByIdAndDelete(listID)
              //quitamos la list del array de board
              board.lists = board.lists.filter(list => list != listID)
              await board.save()

              return doc
            }
          }
        }
      } catch (e) {
        throw e
      }
    }

  }

  return new Board()
}
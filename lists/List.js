
module.exports = (listModel, cardModel, Card, boardModel) => {
  
  class List {
    convertArrayToObject = (array, key) => {
      const initialValue = {};
      return array.reduce((obj, item) => {
        return {
          ...obj,
          [item[key]]: item,
        };
      }, initialValue);
    };

    /**
     * Get Lits list
     */
    async getList() {
      try {

        let list = await listModel.find()
        return list
      } catch (e) {
        throw e
      }
    }

    async getUserLists(user, boardID) {
      try {
        if(user.boards.includes(boardID)){
          let boardEntity = await boardModel.findOne({id:boardID})
          
          let listsIds = boardEntity.lists
          // let objId = listsIds.map(id => mongoose.Types.ObjectId(id))
          let lists = await listModel.find({id: {$in: listsIds}})

          return this.convertArrayToObject(lists, 'id')
        }

      } catch (e) {
        throw e
      }
    }

    async create(list) {
      try {
        let doc = await listModel.create(list)
        return doc
      } catch (e) {
        throw e
      }
    }

    async updateTitle(list) {
      try {
        let listEntity = await listModel.findById(list._id)
        if (listEntity) {
          listEntity.title = list.title
          let doc = await listEntity.save()
          return doc
        } else {
          throw new Error('List not found')
        }
      }catch (e) {
        throw e
      }
    }

    async dragCard(droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd,draggableId, boardID){
      try{
        // Misma lista
        if (droppableIdStart === droppableIdEnd) {
          let listEntity = await listModel.findById(droppableIdStart)

          if(listEntity){
            // Quitamos la card del la list
            let card = listEntity.cards.splice(droppableIndexStart, 1)
            // Agregamos la card en la nueva posicion
            listEntity.cards.splice(droppableIndexEnd, 0, ...card)
            let doc = await listEntity.save()
            return doc
          }else{
            throw new Error('List not Found')
          }  

        } else{
          // Otra lista
          // cogemos la lista de origen
          let listStart = await listModel.findById(droppableIdStart)
          // Quitamos la card de la lista
          let card = listStart.cards.splice(droppableIndexStart, 1)
          // Cogemos la lista destino
          let listEnd = await listModel.findById(droppableIdEnd)
  
          // Agregamos la card a la lista origen en la posicion indicada
          listEnd.cards.splice(droppableIndexEnd, 0, ...card);
          let docStart = await listStart.save()
          let docEnd = await listEnd.save()

          return {docStart, docEnd}
        }

      } catch(e){
        throw e
      } 
    }

    async addCard(card, listID) {
      try {
        let cardEntity = await Card.create(card)
        let listEntity = await listModel.findById(listID)

        if(cardEntity && listEntity){
          listEntity.cards = [...listEntity.cards, cardEntity._id]
          let doc = await listEntity.save()
          // devuelvo cardEntity porque me interesa coger su _id para el front
          return cardEntity

        } else {
          let msg
          if(cardEntity){
            msg = 'List not Found'
            Card.delete(cardEntity._id)
          }else {
            msg = 'Card create Error'
          }
          throw new Error (msg)
        }
      }catch (e) {
        throw e
      }
    }


    async deleteCard(cardID, listID) {
      try {
        let cardEntity =  await Card.delete(cardID)
        let listEntity = await listModel.findById(listID)

        if (cardEntity && listEntity) {
          listEntity.cards = listEntity.cards.filter(card => card != cardID)
          let doc = await listEntity.save()

          return doc
        } else {
          let msg = cardEntity ? 'List not Found' : 'Card not Found'
          throw new Error(msg)
        }
      }catch (e) {
        throw e
      }
    }

  }

  return new List()
}
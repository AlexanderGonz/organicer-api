module.exports = (cardModel, boardModel, listModel, mongoose) => {

  class Card {

    /**
     * Get Board list
     */
    async getList() {
      try {
        // cardModel.find().populate('users')
        let list = await cardModel.find() // modelo.find({condiciones [boardid: 'asdad232']}, {select [id: 0, name: 1], {orden, limite [limit: 10, sort: 'name']})
        return list
      } catch (e) {
        throw e
      }
    }
    
    async getLists (listsIds) {
      return await Promise.all(listsIds.map(async id => {
         return await listModel.findOne({id:id})
      }))
    }

    async getUserCards(user, boardID) {
      try {
        if(user.boards.includes(boardID)){
          let boardEntity = await boardModel.findOne({id:boardID} )
          
          let listsIds = boardEntity.lists
          let cardsIds = []
          
          let lists = await this.getLists(listsIds)
          
          lists.map(list => {
            cardsIds = [...cardsIds, ...list.cards]
          })
          


          // let objId = cardsIds.map(id => mongoose.Types.ObjectId(id))
          let cards = cardModel.find({id: {$in: cardsIds}})
          return cards
        }

      } catch (e) {
        throw e
      }
    }

    async create(card) {
      try {
        let doc = await cardModel.create(card)
        return doc
      } catch (e) {
        throw e
      }
    }

    async updateText(card) {
      try {
        let cardEntity = await cardModel.findOne({id:card.id})
        if (cardEntity) {
          cardEntity.text = card.text
          let doc = await cardEntity.save()
          return doc
        } else {
          throw new Error('Card not found')
        }
      }catch (e) {
        throw e
      }
    }

    async delete(cardId) {
      try {
        let doc = await cardModel.deleteOne({id:cardId})
        return doc
      } catch (e) {
        throw e
      }
    }

  }

  return new Card()
}
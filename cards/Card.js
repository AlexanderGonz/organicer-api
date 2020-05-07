module.exports = (cardModel) => {

  class Card {

    /**
     * Get Board list
     */
    async getList() {
      try {
        // cardModel.find().populate('users')
        let list = await cardModel.find() // modelo.find({condiciones [board_id: 'asdad232']}, {select [_id: 0, name: 1], {orden, limite [limit: 10, sort: 'name']})
        return list
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

    async updateTitle(card) {
      try {
        let cardEntity = await cardModel.findById(card._id)
        if (cardEntity) {
          cardEntity.name = card.name
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
        let doc = await cardModel.findByIdAndDelete(cardId)
        return doc
      } catch (e) {
        throw e
      }
    }

  }

  return new Card()
}
module.exports = (cardModel, boardModel, listModel, mongoose) => {

  class Card {
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
        let cardEntity = await cardModel.findById(card._id)
        console.log(card._id);
        
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

    async delete(cardID) {
      try {
        let doc = await cardModel.findByIdAndDelete(cardID)
        return doc
      } catch (e) {
        throw e
      }
    }

  }

  return new Card()
}
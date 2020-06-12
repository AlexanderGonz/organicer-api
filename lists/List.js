Card = require("../cards/Card")

module.exports = (listModel,boardModel, mongoose) => {
  
  class List {

    /**
     * Get Lits list
     */
    async getList() {
      try {
        // listModel.find().populate('users')
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
          let lists = listModel.find({id: {$in: listsIds}})
          return lists
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
        let listEntity = await listModel.findOne({id:list.id})
        if (listEntity) {
          listEntity.name = list.name
          let doc = await listEntity.save()
          return doc
        } else {
          throw new Error('List not found')
        }
      }catch (e) {
        throw e
      }
    }

    async addCard(card, listId) {
      try {
        let listEntity = await listModel.findOne({id:listId})
        if (listEntity) {
          listEntity.cards = [...listEntity.cards, card.id]
          let doc = await listEntity.save()
          return doc
        } else {
          // let doc = await Card.delete(card.id)
          throw new Error('List not found')
        }
      }catch (e) {
        throw e
      }
    }

    async delete(listId) {
      try {
        let doc = await listModel.findByIdAndDelete(listId)
        return doc
      } catch (e) {
        throw e
      }
    }

  }

  return new List()
}
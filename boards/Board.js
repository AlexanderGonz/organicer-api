module.exports = (boardModel, mongoose) => {

  class Board {

    /**
     * Get team list
     */
    async getList() {
      try {

        let list = await boardModel.find().populate('users')
        return list
      } catch (e) {
        throw e
      }
    }

    async getUserBoards(user) {
      try {
        let boardsIds = user.boards
        // let objId = boardsIds.map(id => mongoose.Types.ObjectId(id))

        let boards = await boardModel.find({id: {$in: boardsIds}})

        
        return boards
      } catch (e) {
        throw e
      }
    }

    async create(board) {
      try {
        let doc = await boardModel.create(board)
        return doc
      } catch (e) {
        throw e
      }
    }

    async updateName(board) {
      try {
        let boardEntity = await boardModel.findOne({id:board.id})
        if (boardEntity) {
          boardEntity.name = board.name
          let doc = await boardEntity.save()
          return doc
        } else {
          throw new Error('Board not found')
        }
      }catch (e) {
        throw e
      }
    }

    async updateLists(lists, boardId) {
      try {
        let boardEntity = await boardModel.findOne({id:boardId})
        if (boardEntity) {
          boardEntity.lists = [...boardEntity.lists, ...lists]
          let doc = await boardEntity.save()
          return doc
        } else {
          throw new Error('User not found')
        }
      }catch (e) {
        throw e
      }
    }

    async delete(boardId) {
      try {
        let doc = await boardModel.findByIdAndDelete(boardId)

        return doc
      } catch (e) {
        throw e
      }
    }

  }

  return new Board()
}
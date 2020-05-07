module.exports = (boardModel) => {

  class Board {

    /**
     * Get Board list
     */
    async getList() {
      try {
        // boardModel.find().populate('users')
        let list = await boardModel.find()
        return list
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

    async updateTitle(board) {
      try {
        let boardEntity = await boardModel.findById(board._id)
        if (boardEntity) {
          boardEntity.name = team.name
          let doc = await boardEntity.save()
          return doc
        } else {
          throw new Error('Board not found')
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
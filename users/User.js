module.exports = (userModel) => {

  class User {

    /**
     * Get user list
     */
    async getList() {
      try {
        // TeamModel.find().populate('users')
        let list = await userModel.find()
        return list
      } catch (e) {
        throw e
      }
    }

    async create(user) {
      try {
        let doc = await userModel.create(user)
        return doc
      } catch (e) {
        throw e
      }
    }

    async updateName(user) {
      try {
        let userEntity = await userModel.findById(user._id)
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
module.exports = (teamModel) => {

  class Team {

    /**
     * Get team list
     */
    async getList() {
      try {
        // TeamModel.find().populate('users')
        let list = await teamModel.find().populate('users')
        return list
      } catch (e) {
        throw e
      }
    }

    async create(team) {
      try {
        let doc = await teamModel.create(team)
        return doc
      } catch (e) {
        throw e
      }
    }

    async updateName(team) {
      try {
        let teamEntity = await teamModel.findById(team._id)
        if (teamEntity) {
          teamEntity.name = team.name
          let doc = await teamEntity.save()
          return doc
        } else {
          throw new Error('Team not found')
        }
      }catch (e) {
        throw e
      }
    }

    async delete(teamId) {
      try {
        let doc = await teamModel.findByIdAndDelete(teamId)

        return doc
      } catch (e) {
        throw e
      }
    }

  }

  return new Team()
}
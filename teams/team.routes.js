module.exports = (express, Team) => {

  let router = express.Router()

  router.get('/', async (req, res, next) => {
    try {
      let teams = await Team.getList()
      res.json(teams)
    } catch(e) {
      next(e)
    }
  })

  router.post('/', async (req, res, next) => {
    try {
      let team = req.body.team
      let doc =  await Team.create(team)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  router.put('/', async (req, res, next) => {
    try {
      let team = req.body.team
      let doc =  await Team.updateName(team)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  router.delete('/', async (req, res, next) => {
    try {
      let teamId = req.body.teamId
      let doc =  await Team.delete(teamId)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  
  return router
}
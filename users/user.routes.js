module.exports = (express, User) => {

  let router = express.Router()

  router.get('/', async (req, res, next) => {
    try {
      let users = await User.getList()
      res.json(users)
    } catch(e) {
      next(e)
    }
  })

  router.post('/', async (req, res, next) => {
    try {
      let user = req.body.user
      let doc =  await User.create(user)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  router.put('/', async (req, res, next) => {
    try {
      let user = req.body.user
      let doc =  await User.updateName(user)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  router.delete('/', async (req, res, next) => {
    try {
      let userId = req.body.userId
      let doc =  await User.delete(userId)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  
  return router
}
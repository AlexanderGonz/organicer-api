module.exports = (express, User, checkToken) => {

  let router = express.Router()

  router.get('/getAll', checkToken, async (req, res, next) => {
    try {
      let users = await User.getList()
      res.json(users)
    } catch(e) {
      next(e)
    }
  })

  router.get('/', checkToken, async (req, res, next) => {
    try {
      let user = await User.find(req.user.id)
      res.json({user:user})
    } catch(e) {
      next(e)
    }
  })

  

  router.post('/', checkToken, async (req, res, next) => {
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
  router.put('/updateBoards', checkToken, async (req, res, next) => {
    try {
      let boards = req.body.boards
      let doc =  await User.updateBoards(boards, req.user)
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
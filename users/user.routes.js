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

  router.post('/getUsersCompany', checkToken, async (req, res, next) => {
    try{
      let doc = await User.getUsersCompany(req.user, req.body.boardID)
      res.json(doc)
    }catch (e){
      throw e
    }
  })

  

  router.post('/', checkToken, async (req, res, next) => {
    try {
      let newUser = req.body.newUser
      let doc =  await User.create(req.user, newUser)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  router.post('/activate', async (req, res, next) => {
    try {
      let response = await User.activateUser(req.body.id)
      res.json(response)
    } catch (e) {
      next(e)
    }
  })

  router.post('/addBoard', checkToken, async (req, res, next) => {
    try {
      let { board } = req.body
      let doc = await User.addBoard(req.user, board)
      
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  router.put('/', checkToken, async (req, res, next) => {
    try {
      let user = req.body.user
      let doc =  await User.updateUser(req.user, user)
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

  router.put('/removeFromBoard', checkToken, async (req, res, next) => {
    try{
      let { userID, boardID} = req.body
      let doc = await User.removeFromBoard(req.user, userID, boardID)
      res.json(doc)
    }catch (e){
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
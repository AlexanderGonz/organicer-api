module.exports = (express, Board, checkToken) => {

  let router = express.Router()

  router.get('/', checkToken, async (req, res, next) => {
    try {
      let boards = await Board.getList()
      res.json(boards)
    } catch(e) {
      next(e)
    }
  })

  router.post('/getUsers', checkToken, async (req, res, next) => {
    try {
      let doc = await Board.getUsers(req.user, req.body.boardID)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  router.get('/getUserBoards', checkToken, async (req, res, next) => {
    try {
      let boards = await Board.getUserBoards(req.user)
      res.json({userBoards:boards})
    } catch(e) {
      next(e)
    }
  })
  

  router.post('/getBoardData', checkToken, async (req, res, next) => {
    try {
      
      let data = await Board.getBoardData(req.user, req.body.boardID)
      
      res.json(data)
    } catch(e) {
      next(e)
    }
  })

  router.post('/', async (req, res, next) => {
    try {
      let board = req.body.board
      let doc =  await Board.create(board)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  router.post('/addUser', checkToken, async (req,res,next) => {
    try{
      let {userID, boardID } = req.body
      let doc = await Board.addUser(req.user, userID, boardID)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  router.post('/addList', checkToken, async (req, res, next) => {
    try {
      let { list, boardID } = req.body
      let doc = await Board.addList(list, boardID)
      
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  router.post('/dragList', checkToken, async (req, res, next) => {
    try{
      let { droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd,draggableId, boardID } = req.body
      let doc = await Board.dragList(droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd,draggableId, boardID)

      res.json(doc)
    }catch(e){
      next(e)
    }
  })

  router.put('/', async (req, res, next) => {
    try {
      let board = req.body.board
      let doc =  await Board.updateName(board)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  router.put('/editTitle', checkToken,  async (req, res, next) => {
    try {
      let board = req.body.board
      let doc =  await Board.updateTitle(req.user, board)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  router.put('/updateLists', checkToken, async (req, res, next) => {
    try {
      let lists = req.body.lists
      let doc =  await Board.updateLists(lists, req.body.boardID)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  router.delete('/', async (req, res, next) => {
    try {
      let boardID = req.body.boardID
      let doc =  await Board.delete(boardID)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  router.delete('/deleteList', checkToken, async (req, res, next) => {
    try {
      let { boardID, listID } = req.body
      
      let doc =  await Board.deleteList(req.user, listID, boardID)

      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  
  return router
}
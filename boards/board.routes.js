module.exports = (express, Board, checkToken) => {

  let router = express.Router()

  router.get('/', async (req, res, next) => {
    try {
      let boards = await Board.getList()
      res.json(boards)
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

  router.post('/', async (req, res, next) => {
    try {
      let board = req.body.board
      board.initDate = new Date()
      let doc =  await Board.create(board)
      res.json(doc)
    } catch(e) {
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
      let boardId = req.body.boardId
      let doc =  await Board.delete(boardId)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  
  return router
}
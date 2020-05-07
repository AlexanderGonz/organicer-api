module.exports = (express, Board) => {

  let router = express.Router()

  router.get('/', async (req, res, next) => {
    try {
      let boards = await Board.getList()
      res.json(boards)
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

  router.put('/', async (req, res, next) => {
    try {
      let board = req.body.board
      let doc =  await Board.updateName(board)
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
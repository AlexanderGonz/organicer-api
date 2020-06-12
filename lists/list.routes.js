module.exports = (express, List, checkToken) => {

  let router = express.Router()

  router.get('/', async (req, res, next) => {
    try {
      let lists = await List.getList()
      res.json(lists)
    } catch(e) {
      next(e)
    }
  })

  router.post('/getUserLists', checkToken, async (req, res, next) => {
    try {
      
      let lists = await List.getUserLists(req.user, req.body.boardID)
      
      res.json({userLists:lists})
    } catch(e) {
      next(e)
    }
  })

  router.post('/', async (req, res, next) => {
    try {
      let list = req.body.list
      let doc =  await List.create(list)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  router.put('/', async (req, res, next) => {
    try {
      let list = req.body.list
      let doc =  await List.updateName(list)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  router.put('/updateCards', checkToken, async (req, res, next) => {
    try {
      let cards = req.body.cards
      let doc =  await List.updateCards(cards, req.body.listID)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  router.delete('/', async (req, res, next) => {
    try {
      let listId = req.body.listId
      let doc =  await List.delete(listId)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })
  
  return router
}
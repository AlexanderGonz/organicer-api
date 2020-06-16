module.exports = (express, Card, List, Board, checkToken) => {

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

  router.post('/addCard', checkToken, async (req, res, next) => {
    try {
      let {card, listID } = req.body
      let doc = await List.addCard(card, listID)
      
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  router.post('/dragCard', checkToken, async (req, res, next) => {
    try{
      let { droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd,draggableId, boardID } = req.body
      let doc = await List.dragCard(droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd,draggableId, boardID)

      res.json(doc)
    }catch(e){
      next(e)
    }
  })

  router.put('/editTitle', checkToken,  async (req, res, next) => {
    try {
      let list = req.body.list
      let doc =  await List.updateTitle(list)
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


  router.delete('/deleteCard', checkToken, async (req, res, next) => {
    try {
      let { cardID, listID } = req.body
      
      let doc = await List.deleteCard(cardID, listID)
      res.json(doc )
    } catch(e) {
      next(e)
    }
  })
  
  return router
}
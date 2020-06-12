module.exports = (express, Card, List, checkToken) => {

  let router = express.Router()

  router.get('/', async (req, res, next) => {
    try {
      let cards = await Card.getList()
      res.json(cards)
    } catch(e) {
      next(e)
    }
  })

  router.post('/getUserCards', checkToken, async (req, res, next) => {
    try {
      
      let cards = await Card.getUserCards(req.user, req.body.boardID)
      
      res.json({userCards:cards})
    } catch(e) {
      next(e)
    }
  })

  router.post('/addCard', async (req, res, next) => {
    try {
      let {card, listID } = req.body
      let doc =  await Card.create(card)
      let docList = await List.addCard(card, listID)
      
      
      res.json([doc, docList])
    } catch(e) {
      next(e)
    }
  })

  router.put('/editText', async (req, res, next) => {
    try {
      let card = req.body.card
      let doc =  await Card.updateText(card)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  router.delete('/', async (req, res, next) => {
    try {
      let cardId = req.body.cardId
      let doc =  await Card.delete(cardId)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })
  
  return router
}
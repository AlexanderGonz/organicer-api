module.exports = (express, Card) => {

  let router = express.Router()

  router.get('/', async (req, res, next) => {
    try {
      let cards = await Card.getList()
      res.json(cards)
    } catch(e) {
      next(e)
    }
  })

  router.post('/', async (req, res, next) => {
    try {
      let card = req.body.card
      let doc =  await Card.create(card)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  router.put('/', async (req, res, next) => {
    try {
      let card = req.body.card
      let doc =  await Card.updateName(card)
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
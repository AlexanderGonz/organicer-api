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


  router.put('/editText', checkToken, async (req, res, next) => {
    try {
      let card = req.body.card
      let doc =  await Card.updateText(card)
      res.json(doc)
    } catch(e) {
      next(e)
    }
  })

  
  return router
}
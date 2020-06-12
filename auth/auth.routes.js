module.exports = (express, Auth) => {
  let router = express.Router()

  router.post('/', async (req, res, next) => {
    try {
      let response = await Auth.login(req.body.login)
      res.json(response)
    } catch(e){
      next(e)
    }
  })

  return router
}
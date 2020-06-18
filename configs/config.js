module.exports = {
  // database: process.env.MONGODB || 'mongodb://localhost:27017/proyecto',
  database: process.env.MONGODB || 'mongodb://alexandergonz:Internet12@ds111623.mlab.com:11623/heroku_p435mwrn',
  port: process.env.PORT || 4000,
  secretKey: "miclaveultrasecreta123*"
}
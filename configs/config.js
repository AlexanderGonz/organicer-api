module.exports = {
  // database: process.env.MONGODB || 'mongodb://localhost:27017/proyecto',
  database: process.env.MONGODB || 'mongodb+srv://alexandergonz:Internet12@organicer-53ui2.mongodb.net/organicer',
  port: process.env.PORT || 4000,
  secretKey: "miclaveultrasecreta123*",
  clientUrl: "organicer.herokuapp.com"
}
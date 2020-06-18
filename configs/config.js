module.exports = {
  database: process.env.MONGODB || 'mongodb://localhost:27017/proyecto',
  port: process.env.PORT || 4000,
  secretKey: "miclaveultrasecreta123*"
}
module.exports = (mongoose) => {
  const Schema = mongoose.Schema
  const userModel = new Schema({
    username: {type: String, required: true},
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String },
    password: {type: String, required: true},
    rol: {type: String},
    teamId: [{type: String}]
  })

  return mongoose.model('User', userModel)
}
module.exports = (mongoose) => {
  const Schema = mongoose.Schema
  const userModel = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: Number },
    email: { type: String, required: true, unique: true, dropDups: true },
    password: {type: String, required: true},
    rol: {type: String, default: 'normie'},
    company: {type: String},
    active: {type: Boolean, required: true, default: false},
    boards: [{type: String}]
  })

  return mongoose.model('User', userModel)
}
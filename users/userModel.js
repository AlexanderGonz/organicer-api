module.exports = (mongoose) => {
  const Schema = mongoose.Schema
  const userModel = new Schema({
    id: {type:String, required:true},
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: Number },
    email: { type: String, required: true, unique: true, dropDups: true },
    password: {type: String, required: true},
    rol: {type: String},
    boards: [{type: String}]
  })

  return mongoose.model('User', userModel)
}
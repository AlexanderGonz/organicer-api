module.exports = (mongoose) => {
  const Schema = mongoose.Schema
  const boardModel = new Schema({
    teamId: {type: String},
    title: { type: String, required: true },
  })



  return mongoose.model('Board', boardModel)
}
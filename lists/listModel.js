module.exports = (mongoose) => {
  const Schema = mongoose.Schema
  const listModel = new Schema({
    title: { type: String, required: true },
    cards: [{type: String}]
  })



  return mongoose.model('List', listModel)
}
module.exports = (mongoose) => {
  const Schema = mongoose.Schema
  const listModel = new Schema({
    id: {type:String, required:true},
    title: { type: String, required: true },
    cards: [{type: String}]
  })



  return mongoose.model('List', listModel)
}
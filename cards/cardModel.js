module.exports = (mongoose) => {
  const Schema = mongoose.Schema
  const cardModel = new Schema({
    boardId: {type: String, required: true},
    title: { type: String, required: true },
    description: { type: String},
    priority: {type: String, required: true, enum: ["low", "medium", "high"]},
    responsibleId: [{ type: String }],
  })



  return mongoose.model('Card', cardModel)
}
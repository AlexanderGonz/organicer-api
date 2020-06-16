module.exports = (mongoose) => {
  const Schema = mongoose.Schema
  const cardModel = new Schema({
    text: { type: String, required: true },
    //priority: {type: String, required: true, enum: ["low", "medium", "high"]},
    //responsibleId: [{ type: String }],
  })



  return mongoose.model('Card', cardModel)
}
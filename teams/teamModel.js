module.exports = (mongoose) => {
  const Schema = mongoose.Schema
  const teamModel = new Schema({
    name: { type: String, required: true },
    initDate: { type: Date, required: true}
  })



  return mongoose.model('Team', teamModel)
}
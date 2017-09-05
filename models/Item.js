const mongoose = require('mongoose')

//setting up Schema
const ItemSchema = new mongoose.Schema({
  description: {type: String, required: true},
  cost: {type: Number, required: true},
  quantity: {type: Number, required: true},
  available: {type: Boolean, required: true}
})

//function to get available items
ItemSchema.statics.getAvailableItems = function (available, cb) {
  return this.find({ available: true })
}

const Item = mongoose.model('Item', ItemSchema)

module.exports = Item

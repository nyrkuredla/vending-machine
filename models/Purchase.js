const mongoose = require('mongoose')

//setting up Schema
const PurchaseSchema = new mongoose.Schema({
  description: {type: String, required: true},
  cost: {type: Number, required: true},
  quantity: {type: Number, required: true},
  time: {type: Date, required: true}
})

//function to list purchases
PurchaseSchema.statics.getAllPurchases = function (purchases, cb) {
  return this.find()
}

const Purchase = mongoose.model('Purchase', PurchaseSchema)

module.exports = Purchase

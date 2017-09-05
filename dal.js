//pulling in purchase and item schema
const Purchase = require('./models/Purchase')
const Item = require('./models/Item')

//setting up mongoose and bluebird
const mongoose = require('mongoose')
const bluebird = require('bluebird')
mongoose.connect('mongodb://localhost/vending')

//getting all items from db
function getAllItems () {
  return Item.find()
}

//adding item to db
function addItem (newItem) {
  const item = new Item(newItem)
  item.save(function (err) {
    console.log(err)
  })
  console.log("Added item, wahoo")
  return Promise.resolve("success")
}

//getting item by ID
function getItemById (itemId) {
  return Item.findOne({ "_id": itemId })
}

//update item to db
function updateItem (itemId, itemNew) {
  return Item.findOneAndUpdate({ "_id": itemId}, itemNew, {upsert: false})
}

//show available items
function getAvailableItems (availableItems) {
  return Item.getAvailableItems();
}


module.exports = {
  getAllItems, addItem, getItemById, updateItem, getAvailableItems
}

//pulling in purchase and item schema
const Purchase = require('./models/Purchase')
const Item = require('./models/Item')
let vendorMoney = 1000;

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

function addPurchase (newPurchase) {
  const purchase = new Purchase(newPurchase)
  purchase.save(function (err) {
    console.log(err)
  })
  console.log("Added purchase, wahoo")
  return Promise.resolve("success")
}

function purchaseItem(customerMoney, itemId){
  return getItemById(itemId).then(function (item) {
    console.log('customer money: ', customerMoney)
    console.log('item', item)
    let newPurchase = {
      "description" : item.description,
      "cost": item.cost,
      "quantity": item.quantity,
      "date": Date.now()
    }
      console.log(newPurchase);
      vendorMoney += item.cost;
      console.log(vendorMoney);
      let itemCost = item.cost;
      return vendorMoney;
      // returnChange(customerMoney, itemCost);
      // return addPurchase(newPurchase);
    }
  )}



function getAllPurchases(purchases) {
  return Purchase.find();
}

function getVendorTotal() {
  console.log(vendorMoney);
  let vendorTotal = vendorMoney;
  return vendorTotal;
}

function returnChange(customerMoney, itemCost) {
  customerMoney -= itemCost;
  console.log(customerMoney)
  let changeAlert = {'change': customerMoney}
  return changeAlert;
}

module.exports = {
  getAllItems, addItem, getItemById, updateItem, getAvailableItems, purchaseItem, addPurchase, getAllPurchases, getVendorTotal
}

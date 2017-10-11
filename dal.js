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
    //take description, etc as arguments in the function params: addPurchase ({ description, cost...}) and then add in: newPurchase = new Purchase({description, etc.})
    let newPurchase = {
      "description" : item.description,
      "cost": item.cost,
      "quantity": item.quantity,
      "time": Date.now()
    }
      console.log('you purchased: ', newPurchase);
      vendorMoney += item.cost;
      console.log('vendor money ', vendorMoney);
      let itemCost = item.cost;
      let change = returnChange(customerMoney, itemCost);
      addPurchase(newPurchase);
      let receipt = {"purchase" : newPurchase, "change" : change}
      return receipt;
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
  let changeAlert = {'change': customerMoney}
  return changeAlert;
}

module.exports = {
  getAllItems, addItem, getItemById, updateItem, getAvailableItems, purchaseItem, addPurchase, getAllPurchases, getVendorTotal
}

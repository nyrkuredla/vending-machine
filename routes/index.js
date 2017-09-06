const router = require('express').Router();
const Purchase = require('../models/Purchase');
const Item = require('../models/Item');
const { getAllItems, addItem, getItemById, updateItem, getAvailableItems, purchaseItem, addPurchase, getAllPurchases, getVendorTotal } = require('../dal.js')
const bodyParser = require('body-parser')

//vendor routes
router
  .route('/api/vendor/items')
  .get(function (req, res) {
    getAllItems().then(function (users) {
      console.log(users)
      res.status(200).json(users)
    })
  })
  .post(function (req, res) {
    console.log(req.body)
    addItem(req.body).then(function(newItem){
    res.status(200).send('new item posted')
  })
})

router
  .route('/api/vendor/items/:itemId')
  .put(function (req, res) {
    console.log(req.body)
    // updateItem(req.body).then(function(itemNew) {
      res.status(200).send('item updated')
    // })
  })

router
    .route('/api/vendor/purchases')
    .get(function (req, res) {
      getAllPurchases().then(function (vendorMoney) {
        res.status(200).json(vendorMoney)
      })
    })

router
  .route('/api/vendor/money')
  .get(function (req, res) {
    res.status(200).json(getVendorTotal())
    })

//customer routes

router
  .route('/api/customer/items')
  .get(function (req, res) {
    getAvailableItems().then(function (items){
    res.status(200).json(items)
  })
  })

router
  .route('/api/customer/items/:itemId/purchases')
  .post(function (req, res) {
    let customerMoney = req.body;
    let itemId = req.params.itemId;
    purchaseItem(customerMoney, itemId);
    res.status(200).send('yay')
    // purchaseItem(customerMoney, itemId).then(function(kaching) {
    //   // res.status(200).json(kaching)
    // })
  }
  )

module.exports = router;

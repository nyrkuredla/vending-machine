const router = require('express').Router();
const Purchase = require('../models/Purchase');
const Item = require('../models/Item');
const { getAllItems, addItem, getItemById, updateItem, getAvailableItems } = require('../dal.js')
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
      res.status(200).send('list of purchases goes here')
    })

router
  .route('/api/vendor/money')
  .get(function (req, res) {
    res.status(200).send('money displayed here')
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
    res.status(200).send('items get purchased here')
  })

module.exports = router;

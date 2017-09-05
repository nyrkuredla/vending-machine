const router = require('express').Router();
const Purchase = require('../models/Purchase');
const Item = require('../models/Item');

//vendor routes
router
  .route('/api/vendor/items')
  .get(function (req, res) {
    res.status(200).send('all items go here')
  })
  .post(function (req, res) {
    res.status(200).send('new items posted here')
  })

router
  .route('/api/vendor/items/:itemId')
  .put(function (req, res) {
    res.status(200).send('update items here')
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
    res.status(200).send('available items go here')
  })

router
  .route('/api/customer/items/:itemId/purchases')
  .post(function (req, res) {
    res.status(200).send('items get purchased here')
  })

module.exports = router;

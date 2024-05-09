let {CreateProduct}= require('../Controllers/products')
let {fetchProducts} =require('../Controllers/products')
let {deleteProducts}= require('../Controllers/products')
let {editProduct}= require('../Controllers/products')
let {fetchOneProduct} = require('../Controllers/products')
let {editQuantity}= require ('../Controllers/products')
let router= require('express').Router()


router.post('/saveProduct', CreateProduct)
router.get('/getProducts', fetchProducts)
router.post('/deleteProducts', deleteProducts)
router.post('/editProduct', editProduct)
router.post('/fetchOneProduct', fetchOneProduct)
router.post('/editQuantity', editQuantity)
module.exports= router
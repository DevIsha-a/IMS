// let { createSaleOrder}= require('../Controller/saleOrder')
// let {fetchSalesOrders}= require('../Controller/saleOrder')
let{createSaleOrder}= require('../Controllers/saleOrder')
let {fetchSalesOrders}= require('../Controllers/saleOrder')
let router= require('express').Router()

router.post('/createSaleOrder',createSaleOrder)
router.get('/fetchSalesOrders', fetchSalesOrders)


module.exports= router

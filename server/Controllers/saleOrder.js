let SaleOrder = require("../models/saleOrder");

module.exports.createSaleOrder = async (req, res, next) => {
  let { product,  purchasePrice, quantity, salePrice, buyer } = req.body;

  try {
    let newSaleOrder = new SaleOrder({  product,  purchasePrice, quantity, salePrice, buyer});
    let resp = await newSaleOrder.save();
    res.send({ data: resp, msg: "order saved" });
  } catch (error) {
    res.send({err,  msg: "serverError" });
  }
};

module.exports.fetchSalesOrders=async(req, res, next)=>{

    try {
        let resp =await SaleOrder.find({})
        // let resp = await SaleOrder.find({}).populate('product', 'stock price title');

        res.send({data:resp, msg:'sent'})
    } catch (error) {
        res.send({error,  msg: "serverError" })
    }
   

}
module.exports.fetchSalesOrder=async(req, res, next)=>{
    let {product_id}= req.body
    try {
        let resp= await SaleOrder.find({product:product_id})
        res.send({data: resp , msg:'sent'})
        
        
    } catch (error) {
        res.send({error,  msg: "serverError" })
        
    }
   
}
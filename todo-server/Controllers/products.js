let Product= require('../models/product')


module.exports.CreateProduct= async(req, res, next)=>{
    console.log(req.body)
    let {brand,category, description,price,stock,title}= req.body
    try {
        let product= new Product({brand,category, description,price,stock,title})
        let newProduct=await product.save()
        console.log(newProduct)
        res.send({data:newProduct, msg:'saved'})
        
    } catch (error) {
        res.send(error)
        console.log(error)
    }
   

}
module.exports.fetchProducts= async(req, res, next)=>{
    try {
        
        let allproducts= await Product.find({})
        res.send({data:allproducts, msg:'sent'})
    } catch (error) {
        
        res.send({error})
    }
   
}
module.exports.fetchOneProduct= async(req, res, next)=>{
    let {product_id}= req.body
    try {
        
        let product= await Product.find({_id:product_id})
        res.send({data:product, msg:'sent'})
    } catch (error) {
        
        res.send({error})
    }
   
}
module.exports.deleteProducts= async (req, res, next)=>{
    let {prod_id}= req.body
    try {
        
        let result= await Product.findOneAndDelete({_id: prod_id})
        if(result){
            let newproducts= await Product.find({})
        res.send({data:newproducts, msg:'deleted'})}
    } catch (error) {
        res.send({error})
    }
   
   

}

module.exports.editQuantity= async (req, res, next)=>{
    let {product, quantity}= req.body
    product.stock=product.stock-quantity
    console.log(req.body)
    try {
        
   let resp= await  Product.findOneAndUpdate({ _id:product._id }, { $set: product});
   console.log(resp)
   if(resp){
    let newproducts= await Product.find({})
   res.send({data:newproducts, msg:'updated' })}
   console.log(newProducts)
    } catch (error) {
        console.log(error)
        
    }
   
}
module.exports.editProduct=async(req, res, next)=>{
   

      let {product}= req.body
      try {
        
        let resp= await  Product.findOneAndUpdate({ _id:product._id }, { $set: product});
        console.log(resp +' is my response')
        if(resp){
         let newproducts= await Product.find({})
        res.send({data:newproducts, msg:'updated' })
        console.log(newproducts)}
        
         } catch (error) {
             console.log(error)
             
         }
      
}
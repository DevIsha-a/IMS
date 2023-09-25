let mongoose= require('mongoose')

let saleOrderSchema= mongoose.Schema({
    
   product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product'
   },
    
      quantity: {
        type: Number,
        required: true
      },
      salePrice:{
        type: Number,
        required: true

      },
      purchasePrice:{
        type: Number,
        required: true

      },
      buyer:{
        type:String, 
        required:true
      }
     
    
    
})
const Order= mongoose.model('Order', saleOrderSchema)
module.exports= Order
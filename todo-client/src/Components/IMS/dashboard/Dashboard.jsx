
import axios from 'axios';
import React, {useState, useEffect} from 'react'

import HeaderContainer from '../header/HeaderContainer';

const Dashboard = () => {
  const [sales, setsales] = useState([])
  const [products, setProducts] = useState([])
  
    useEffect(() => {
        const fetchProducts= async ()=>{
            let prods=await axios.get('http://localhost:5500/api/getProducts',{})
            setProducts(prods.data.data)
        }
        fetchProducts()

      
    }, [])

    useEffect(() => {

      const fetchSales=async()=>{
             let resp= await axios.get('http://localhost:5500/api/fetchSalesOrders')
             setsales(resp.data.data)
             
     
      }
      
      fetchSales()
     }, [])
     
  return (
    <div className='h-screen  w-100 '>
      <HeaderContainer></HeaderContainer>
       
    <div  className='   w-[80%] ml-1 md:ml-[23%]  py-3   '>
    <p className='mb-4 text-xl'>Welcome to inventory!</p>
    {/* <div className='flex   justify-evenly '>
      <div className=' hover:scale-105 hover:text-white text-white ease-in-out transition w-[200px] h-[120px] bg-gray-800 border-2   flex  flex-col items-center justify-center'>
        <p className=' w-full  px-4 text-3xl'> { products?.length}</p>
        <p className=''> Products </p>
      </div>
     
      
      <div className=' hover:scale-105 hover:text-white text-white ease-in-out transition w-[200px] h-[120px] bg-gray-800 border-2   flex  flex-col items-center justify-center'>
        <p className=' w-full px-4 text-3xl'> {sales?.length}</p>
        <p className='  '> Sales </p>
      </div>
      </div> */}
      <div>
        <p className='my-10 text-xl'>Latest Products</p>
        <div  className=' h-screen  w-[90%] ml-1 m-auto mx-auto  '>
        <table className='min-w-full text-left text-sm font-light'>
  <thead className='border-b font-medium dark:border-neutral-500 '>
    <tr>
      <th className='px-6 py-3 text-left'>
        Title
      </th>
      <th className='px-6 py-3 text-left'>
        Brand
      </th>
      <th className='px-6 py-3 text-left'>
        Price
      </th>
      <th className='px-6 py-3 text-left'>
        Stock
      </th>
    </tr>
  </thead>
  <tbody>
  {products.length > 1 ? (
  products.slice(0, 3).map((product) => (
    <tr key={product.id} className='border-t border-gray-200'>
      <td className='px-6 py-4'>{product.title}</td>
      <td className='px-6 py-4'>{product.brand}</td>
      <td className='px-6 py-4'>{product.price}</td>
      <td className='px-6 py-4'>{product.stock}</td>
    </tr>
  ))
) : (
  <>
    <tr>
      <td colSpan='4'>loading products...</td>
    </tr>
  </>
)}

  </tbody>
</table>

        </div>
      </div>
    </div>
    </div>
  )
}

export default Dashboard

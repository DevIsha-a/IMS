import React, { useEffect, useState } from 'react'
import {FiEdit3} from 'react-icons/fi'
import {AiTwotoneDelete } from 'react-icons/ai';
 import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProduct from './EditProduct';
import { Link } from 'react-router-dom';
import {MdAddCircleOutline} from 'react-icons/md'
import axios from 'axios';
import './pagination.css'

import ReactPaginate from 'react-paginate';
const AllProducts = () => {
  
  const [currentPage, setCurrentPage] = useState(0);
     const [showEditProd, setshowEditProd] = useState(false)
     const [currProd, setcurrProd] = useState('')
     const [products, setProducts] = useState([])
     const [loading, setloading] = useState(false)
     useEffect(() => {
         const fetchProducts= async ()=>{
          setloading(true)
             let prods=await axios.get('http://localhost:5500/api/getProducts',{})
             setProducts(prods.data.data)
             setloading(false)
         }
         fetchProducts()
 
       
     }, [])

    const itemsPerPage = 4;
    const pageCount = Math.ceil(products.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const handlePageChange = ({ selected }) => {
      setCurrentPage(selected);
    };

    const showProd=(prod)=>{
        setshowEditProd(true)
        setcurrProd(prod)
    }

        const deleteProuct=async (id)=>{
            let resp= await axios.post('http://localhost:5500/api/deleteProducts', {prod_id:id})
            
            if (resp.data.msg=='deleted'){
              setProducts(resp.data.data)
           toast.error('Product deleted', { position: toast.POSITION.BOTTOM_RIGHT, autoClose:1000})
            }
            
        }
function truncateId(id) {
    const truncatedIdLength = 7;
    if (id.length <= truncatedIdLength) {
      return id;
    } else {
      return id.substring(0, truncatedIdLength) + "...";
    }
  }
  
  

  return (
    <div className='h-screen  w-100  '>
        <div  className=' h-screen  w-[80%] ml-1 md:ml-[24%]   '>
        <p className='my-4 text-xl'>Welcome to inventory! </p>
        <p>We have following products available in our stock</p>
        <table className='min-w-full text-left text-sm font-light'>
  <thead className='border-b font-medium dark:border-neutral-500'>
    <tr>
      <th className='px-6 py-4'>
        Id#
      </th>
      <th className='px-6 py-4'>
        Title
      </th>
      <th className='px-6 py-4'>
        Brand
      </th>
      <th className='px-6 py-4'>
        Purchase Price
      </th>
      <th className='px-6 py-4'>
        Stock
      </th>
      <th className='px-6 py-4'>
        Operations
      </th>
    </tr>
  </thead>
  <tbody className='group'>
    {products?.length > 0 ? (
      products.slice(startIndex, endIndex).map((product) => (
        <tr key={product._id} className='border-t border-gray-200'>
          <td className='px-6 py-4'>{truncateId(product._id)}</td>
          <td className='px-6 py-4'>{product.title}</td>
          <td className='px-6 py-4'>{product.brand}</td>
          <td className='px-6 py-4'>{product.price}</td>
          <td className='px-6 py-4'>
            {product.stock > 0 ? (
              <span className='text-green-500'>In stock ({product.stock})</span>
            ) : (
              <span className='text-red-500'>Sold out</span>
            )}
          </td>
          <td className='px-6 py-4 flex gap-3 justify-left '>
            <Link className='no-underline text-black' to={`/products/sell/${product._id}`} >sell</Link>
            <FiEdit3 onClick={() => showProd(product)}></FiEdit3>
            <AiTwotoneDelete onClick={() => deleteProuct(product._id)}></AiTwotoneDelete>
          </td>
        </tr>
      ))
    ) :loading? (
      <>
        <tr>
          <td colSpan='5 ml-10'>loading products...</td>
        </tr>
      </>
    ): <>
    <tr>
      <td colSpan='5 ml-10'>No Products found</td>
    </tr>
  </> }
  </tbody>
</table>

        </div>
        {showEditProd && <EditProduct products={products} showEditProd={showEditProd} setshowEditProd={setshowEditProd}  setProducts={setProducts} product={currProd}/>}
     <ToastContainer></ToastContainer>

     <Link to='/products/add'  className='fixed left-[54%] bottom-[30px]   '><MdAddCircleOutline className='  text-[40px] text-purple-600'></MdAddCircleOutline></Link>
     <div className="flex fixed bottom-[10px] right-6 justify-center mt-5">
        <div>showing <span>{startIndex+1} - {endIndex<=products.length? endIndex: products.length} out of { products.length} items</span></div>
          <ReactPaginate
             previousLabel={'Previous'}
             nextLabel={'Next'}
             breakLabel={'...'}
             breakClassName={'break-me'}
             pageCount={pageCount}
             marginPagesDisplayed={2}
             pageRangeDisplayed={5}
             onPageChange={handlePageChange}
             containerClassName={'pagination'}
             subContainerClassName={'pages pagination'}
             activeClassName={'active'}
          />

        </div>
    </div>
  )
}

export default AllProducts

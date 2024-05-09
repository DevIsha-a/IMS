import React, { useEffect, useState } from 'react'
 import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import {MdAddCircleOutline} from 'react-icons/md'
import axios from 'axios';
import '../products/pagination.css'
import ReactPaginate from 'react-paginate';
const Sales = () => {
    const [sales, setsales] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 4;
    const pageCount = Math.ceil(sales.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage
    const handlePageChange = ({ selected }) => {
      setCurrentPage(selected);
    };
   const [loading, setloading] = useState(false)
useEffect(() => {

 const fetchSales=async()=>{
  setloading(true)
        let resp= await axios.get('http://localhost:5500/api/fetchSalesOrders')
        setsales(resp.data.data)
        setloading(false)
 }
 fetchSales()
}, [])

function truncateId(id) {
    const truncatedIdLength = 8;
    if (id.length <= truncatedIdLength) {
      return id;
    } else {
      return id.substring(0, truncatedIdLength) + "...";
    }
  }
  
  
  
  
  

  return (
    <div className='h-screen  w-100 '>
        <div className='h-screen w-[80%] ml-1 md:ml-[21%]'>
        {/* Replace the classes in the second table */}
        <p className='my-4 text-xl'>Welcome to inventory!</p>
        <table className='min-w-full text-left text-sm font-light'>
          <thead className='border-b font-medium dark:border-neutral-500'>
            <tr>
              <th scope='col' className='px-6 py-4'>
                Order Id#
              </th>
              <th scope='col' className='px-6 py-4'>
                Product Id#
              </th>
              <th scope='col' className='px-6 py-4'>
                Quantity
              </th>
              <th scope='col' className='px-6 py-4'>
                Purchase Price
              </th>
              <th scope='col' className='px-6 py-4'>
                Sales Price
              </th>
              <th scope='col' className='px-6 py-4'>
                Profit
              </th>
              <th scope='col' className='px-6 py-4'>
                Buyer
              </th>
            </tr>
          </thead>
          <tbody>
            {sales?.length > 0 ? (
              sales?.slice(startIndex, endIndex).map((sale) => (
                <tr key={sale.orderId} className='border-t border-gray-200 border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-300 dark:hover:bg-neutral-300'>
                  <td className='px-6 py-4'>{truncateId(sale._id)}</td>
                  <td className='px-6 py-4'>{truncateId(sale.product)}</td>
                  <td className='px-6 py-4'>{sale.quantity}</td>
                  <td className='px-6 py-4'>{sale.purchasePrice}</td>
                  <td className='px-6 py-4'>{sale.salePrice}</td>
                  <td className='px-6 py-4'>
                    {(sale.salePrice - sale.purchasePrice) * sale.quantity}
                  </td>
                  <td className='px-6 py-4'>{sale.buyer}</td>
                </tr>
              ))
            ) :loading? (
              <tr>
                <td colSpan='5 ml-5'>Loading sales...</td>
              </tr>
            ): <tr>
            <td colSpan='5 ml-5'>No Sales yet</td>
          </tr>}
          </tbody>
        </table>
      </div>
         <ToastContainer></ToastContainer>

     {/* <Link to='/products/sell'  className='fixed  bottom-10 right-10   '><MdAddCircleOutline className='  text-[40px] text-purple-600'></MdAddCircleOutline></Link> */}
     <div className="flex fixed bottom-[10px] right-6 justify-center mt-5">
        <div>showing <span>{startIndex+1} - {endIndex<=sales.length? endIndex: sales.length} out of { sales.length} items</span></div>
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

export default Sales

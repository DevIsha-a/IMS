import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { BsFillHouseFill } from 'react-icons/bs'
import {HiOutlineHome} from 'react-icons/hi'
import {BsBagCheck} from 'react-icons/bs'
import { Link } from 'react-router-dom';


const SideBar = ({showSideBar, setshowSideBar}) => {



  return( <div className={` z-9999 md:w-[20%] w-[80%] border ${showSideBar ? 'absolute md:absolute' : 'hidden md:absolute border-l-2'}`}>

 <div className=' '>
   <div className='flex'>
   {/* bg-purple-300 */}
<div className={` flex  relative  w-[full] `}>
    <div className={` min-h-[100vh] py-10 flex  flex-col bg-white px-10 gap-3 sm:w-[60%] w-[full  `}>
     
        <div >
            <h3 className=' font-bold text-lg mb-3'>Home</h3>

            <div className='px-5 items-center gap-4 flex '>
              {/* <div><BsFillHouseFill></BsFillHouseFill></div>   */}
              <div><HiOutlineHome></HiOutlineHome></div>
              <Link to="/dashboard" className='min-w-[100px] no-underline text-black'>Dashboard</Link> 
            </div>

        </div>
        <div>
            <h3 className=' font-bold text-lg mb-3'>Product</h3>
            <div className=' flex flex-col gap-5'>
                <div  className='px-5 items-center gap-4 flex text-l'>
                    <div><BsBagCheck ></BsBagCheck></div>
                   < Link to="/products" className='min-w-[100px] no-underline text-black cursor-pointer' onClick={() => console.log("Link clicked!")}>Inventory</Link> 
                </div>
                 <div  className='px-5 items-center gap-4 flex '>
                    <div><BsBagCheck></BsBagCheck></div>
                    <Link  to="/sales" className=' min-w-[100px] no-underline text-black'>Sales</Link>

                </div>
                <div className='px-5 items-center gap-4 flex'>
  <div>
    <BsBagCheck />
  </div>
  <Link to="/products/add" className='min-w-[100px] no-underline text-black'>
    Purchase Products
  </Link>
</div>

               
                


            </div>


        </div>
       


    </div>
 

</div> <RxCross2 onClick={() => { setshowSideBar(false); console.log(showSideBar) }} className={` md:hidden flex  right-0 top-4 text-3xl`}></RxCross2>
</div>
    </div>
    
    <div className='hidden md:absolute'>X</div>
    </div>
  )
}

export default SideBar

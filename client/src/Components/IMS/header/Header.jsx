import React from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
const Header = ({showSideBar, setshowSideBar}) => {
  return (
    <div className='bg-slate-800 py-2 px-4 sticky  w-full z-100 flex gap-4 items-center '>
        <GiHamburgerMenu className='md:hidden ' onClick={()=>setshowSideBar(true)}></GiHamburgerMenu>
        <h2 className='text-lg  text-white '>  Inventory  System
      </h2>
     
    </div>
  )
}

export default Header

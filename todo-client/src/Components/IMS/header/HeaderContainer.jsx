import React, { useState } from 'react'
import SideBar from './sideBar'
import Header from './Header'
const HeaderContainer = () => {
    
const [showSideBar, setshowSideBar] = useState(true)
  return (
    <div>
        <Header showSideBar={showSideBar} setshowSideBar={setshowSideBar}></Header>
        <SideBar showSideBar={showSideBar} setshowSideBar={setshowSideBar}></SideBar>
      
    </div>
  )
}

export default HeaderContainer

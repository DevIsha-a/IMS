// HOOKS
import { Route, Routes } from 'react-router-dom';
// APP COMPONENTS
import UserSignIn from './Pages/SignIn/UserSignIn';
import UserSignUp from './Pages/SignUp/UserSignUp';
import Home from './Pages/Home/Home';
// import Dashboard from '../src/Components/IMS/dashboard/Dashboard'
import Products from './Pages/Products/Products';
import SalesPage from './Pages/Sales/SalesPage';
import PurchasePage from './Pages/purchase/PurchasePage';
import SellProductPage from './Pages/Products/sellProductPage'
import Dashboard from './Pages/dashboard/dashboardpage'




function App() {
  return <>

    <Routes>
      <Route path='/' element={<UserSignIn />} />

      <Route path="sign-up" element={<UserSignUp />} />
      <Route path="home" element={<Products />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/add" element={<PurchasePage />} />
      <Route path="/products/sell/:id" element={<SellProductPage />} />
      <Route path="/sales" element={<SalesPage />} />
    </Routes>
  </>
}

export default App;

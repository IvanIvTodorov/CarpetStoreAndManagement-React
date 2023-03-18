import { Routes, Route } from "react-router-dom"
import { useState } from "react";
import { AuthContext } from "./contexts/AuthContext.js";

import 'bootstrap/dist/css/bootstrap.css';
import { Footer } from './components/Footer/Footer.js';
import { Header } from './components/Header/Header.js'
import { Register } from "./components/Register/Register.js";
import { Login } from "./components/Login/Login.js";
import { Home } from "./components/Home/Home.js";
import { Products } from "./components/Products/Products.js";
import { ProductDetail } from "./components/Products/ProductDetail.js";
import { Cart } from "./components/Order/Cart.js";
import { MyOrders } from "./components/Order/MyOrders.js";
import { Create } from "./components/Create/Create.js";
import { Produce } from "./components/Produce/Produce.js";
import { Inventory } from "./components/Inventory/Inventory.js";


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'))
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin'))

  return (
    <AuthContext.Provider value={{isAuth, isAdmin}}>
      <div>
        <Header isAuth={isAuth} setIsAuth={setIsAuth} setIsAdmin={setIsAdmin}/>
          <main style={{ minHeight: "517px" }}>
            <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login setIsAuth={setIsAuth} setIsAdmin={setIsAdmin} />} />
              <Route path='/' element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/details' element={<ProductDetail />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/myorders' element={<MyOrders />} />
              <Route path='/create' element={<Create />} />
              <Route path='/produce' element={<Produce />} />
              <Route path='/inventory' element={<Inventory />} />
            </Routes>
          </main>
        <Footer />
      </div> 
    </AuthContext.Provider>
  );
}

export default App;

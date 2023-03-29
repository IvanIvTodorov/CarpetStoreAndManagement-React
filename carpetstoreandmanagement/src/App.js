import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext.js";
import { getDocs, collection, doc, getDoc } from 'firebase/firestore'
import { db, auth } from './firebase';

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
import { ProduceFromOrder } from "./components/Produce/ProduceFromOrder.js";
import { Inventory } from "./components/Inventory/Inventory.js";
import { Edit } from "./components/Edit/Edit.js";
import { Orders } from "./components/Order/Orders.js";
import { RawMaterials } from "./components/RawMaterials/RawMaterials.js";
import { Produce } from "./components/Produce/Produce.js";
import { OrderDetails } from "./components/Order/OrderDetails.js";
import { NotFound } from "./components/NotFound/NotFound.js";
import { Forbiden } from "./components/Forbiden/Forbiden.js";


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'))
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin'))
  const [carpets, setCarpets] = useState([])
  const [userProducts, setUserProducts] = useState([])


  const carpetCollection = collection(db, 'carpet')
  useEffect(() => {
    const getCarpets = async () => {
      const data = await getDocs(carpetCollection)
      setCarpets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getCarpets();
  }, [])

  return (
    <AuthContext.Provider value={{ isAuth, isAdmin, userProducts }}>
      <div style={{
        backgroundColor: 'cornsilk',
      }}>
        <Header isAuth={isAuth} setIsAuth={setIsAuth} setIsAdmin={setIsAdmin} isAdmin={isAdmin} />
        <main style={{ minHeight: "517px" }}>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login setIsAuth={setIsAuth} setIsAdmin={setIsAdmin} />} />
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products carpets={carpets} setUserProducts={setUserProducts} />} />
            <Route path='/products/paths' element={<Products carpets={carpets} setUserProducts={setUserProducts} />} />
            <Route path='/products/carpets' element={<Products carpets={carpets} setUserProducts={setUserProducts} />} />
            <Route path='/details/:carpetId' element={<ProductDetail setCarpets={setCarpets} setUserProducts={setUserProducts} />} />
            <Route path='/cart' element={<Cart setUserProducts={setUserProducts} userProducts={userProducts} />} />
            <Route path='/myorders' element={<MyOrders />} />
            <Route path='/myorders/:orderId' element={<OrderDetails />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/edit/:carpetId' element={<Edit setCarpets={setCarpets} />} />
            <Route path='/create' element={<Create setCarpets={setCarpets} />} />
            <Route path='/produce/:orderId' element={<ProduceFromOrder />} />
            <Route path='/produce/' element={<Produce />} />
            <Route path='/inventory' element={<Inventory />} />
            <Route path='/rawmaterials' element={<RawMaterials />} />
            <Route path='/forbiden' element={<Forbiden />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;

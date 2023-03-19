import { Routes, Route } from "react-router-dom"
import { useState,useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext.js";
import { getDocs, collection } from 'firebase/firestore'
import { db } from './firebase';

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
import { Edit } from "./components/Edit/Edit.js";


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'))
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin'))
  const [carpets, setCarpets] = useState([])

    const carpetCollection = collection(db, 'carpet')
    useEffect(() => {
        const getCarpets = async () => {
            const data = await getDocs(carpetCollection)
            setCarpets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getCarpets();
    }, [])

  return (
    <AuthContext.Provider value={{isAuth, isAdmin}}>
      <div>
        <Header isAuth={isAuth} setIsAuth={setIsAuth} setIsAdmin={setIsAdmin} isAdmin={isAdmin}/>
          <main style={{ minHeight: "517px" }}>
            <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login setIsAuth={setIsAuth} setIsAdmin={setIsAdmin} />} />
              <Route path='/' element={<Home />} />
              <Route path='/products' element={<Products carpets={carpets} isAdmin={isAdmin}/>} />
              <Route path='/details/:carpetId' element={<ProductDetail isAdmin={isAdmin}/>} />
              <Route path='/edit/:carpetId' element={<Edit setCarpets={setCarpets}/>} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/myorders' element={<MyOrders />} />
              <Route path='/create' element={<Create isAdmin={isAdmin} isAuth={isAuth}/>} />
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

import { Routes, Route } from "react-router-dom"
import { useState,useEffect } from "react";
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
import { Produce } from "./components/Produce/Produce.js";
import { Inventory } from "./components/Inventory/Inventory.js";
import { Edit } from "./components/Edit/Edit.js";
import { Orders } from "./components/Order/Orders.js";
import { RawMaterials } from "./components/RawMaterials/RawMaterials.js";


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

            const carpetCollection2 = collection(db, 'userProducts')
            const data3 = await getDocs(carpetCollection2)
            let userId = auth.currentUser.uid
            const document = doc(db, 'userProducts', userId)
            const data2 = await getDoc(document);

            if (data2.data()) {
                setUserProducts(Object.entries(data2.data().carpets).map((carpet => {
                    return {
                        id: carpet[0],
                        ...carpet[1]
                    }
                })));
            }
        }

        getCarpets();
    }, [])

  return (
    <AuthContext.Provider value={{isAuth, isAdmin, userProducts}}>
      <div>
        <Header isAuth={isAuth} setIsAuth={setIsAuth} setIsAdmin={setIsAdmin} isAdmin={isAdmin}/>
          <main style={{ minHeight: "517px" }}>
            <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login setIsAuth={setIsAuth} setIsAdmin={setIsAdmin} />} />
              <Route path='/' element={<Home />} />
              <Route path='/products' element={<Products carpets={carpets} isAdmin={isAdmin} setUserProducts={setUserProducts}/>} />
              <Route path='/products/paths' element={<Products carpets={carpets} isAdmin={isAdmin} setUserProducts={setUserProducts}/>} />
              <Route path='/products/carpets' element={<Products carpets={carpets} isAdmin={isAdmin} setUserProducts={setUserProducts}/>} />
              <Route path='/details/:carpetId' element={<ProductDetail isAdmin={isAdmin} setCarpets={setCarpets} carpets={carpets} setUserProducts={setUserProducts}/>} />
              <Route path='/edit/:carpetId' element={<Edit setCarpets={setCarpets}/>} />
              <Route path='/cart' element={<Cart setUserProducts={setUserProducts} userProducts={userProducts}/>} />
              <Route path='/myorders' element={<MyOrders />} />
              <Route path='/orders' element={<Orders userProducts={userProducts}/>} />
              <Route path='/create' element={<Create isAdmin={isAdmin} isAuth={isAuth} setCarpets={setCarpets}/>} />
              <Route path='/produce/:orderId' element={<Produce />} />
              <Route path='/inventory' element={<Inventory />} />
              <Route path='/rawmaterials' element={<RawMaterials />} />
            </Routes>
          </main>
        <Footer />
      </div> 
    </AuthContext.Provider>
  );
}

export default App;

import style from './Products.Module.css'
import { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../firebase';
import { Link } from 'react-router-dom';


export const Products = () => {
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
        <div className='container'>
            <div className="row">
                {carpets.map((carpet) => {
                    return <div key={carpet.id} className="col-md-3 col-sm-6">
                        <div className="product-grid2">
                            <div className="product-image2">
                                <Link to="/details">
                                    <img className="pic-1" style={{ width: '350px', height: '400px' }} src={carpet.imgUrl} />
                                    <img className="pic-2" style={{ width: '350px', height: '400px' }} src={carpet.imgUrl} />

                                </Link>
                                <Link className="add-to-cart" href="">
                                    Add to cart
                                </Link>
                            </div>
                            <div className="product-content">
                                <h3 className="title">
                                    <Link to='/details'>{carpet.name}</Link>
                                </h3>
                                <span className="price">${carpet.price}</span>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
};
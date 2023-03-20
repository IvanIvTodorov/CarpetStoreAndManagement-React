import style from './ProductDetails.Module.css'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db, auth } from '../../firebase';
import { getDoc, doc, deleteDoc, collection, addDoc, updateDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const ProductDetail = ({ isAdmin, setCarpets, carpets, setUserProducts }) => {
    const [carpet, setCarpet] = useState({})
    const { carpetId } = useParams();

    const docRef = doc(db, 'carpet', carpetId);
    let navigate = useNavigate();

    useEffect(() => {
        const getCarpet = async () => {
            const data = await getDoc(docRef);
            setCarpet(data.data())
        };

        getCarpet();
    }, [])

    const onDelete = async (e) => {
        e.preventDefault();
        await deleteDoc(docRef)
        setCarpets(carpets => (carpets.filter(x => x.id != carpetId)))
        navigate('/products')
    }



    const addProduct = async (e) => {
        e.preventDefault();
        const userId = auth.currentUser.uid;
        const docRef = doc(db, 'userProducts', userId);
        const data = await (await getDoc(docRef)).data();


        if (!data || Object.keys(data) == 0) {
            await setDoc(doc(db, 'userProducts', userId), {
                carpets: {
                    [carpetId]:
                    {
                        qty: 1,
                        imgUrl: carpet.imgUrl,
                        price: carpet.price,
                        name: carpet.name
                    }
                }
            })
                .catch(err => { console.log(err) })
        } else {
            if (!data.carpets.hasOwnProperty(carpetId)) {
                await setDoc(docRef, {
                    carpets: {
                        [carpetId]:
                        {
                            qty: 1,
                            imgUrl: carpet.imgUrl,
                            price: carpet.price,
                            name: carpet.name
                        }
                    }
                }, { merge: true })
                    .catch(err => { console.log(err) })
            }
        }

        if (data) {
            setUserProducts(Object.entries(data.carpets).map((carpet => {
                return {
                    id: carpet[0],
                    ...carpet[1]
                }
            })));
        }
    }

    return (
        <div className="container">
            <div className="card">
                <div className="container-fliud">
                    <div className="wrapper row">
                        <div className="preview col-md-6">
                            <div className="preview-pic tab-content">
                                <div className="tab-pane active" id="pic-1">
                                    <img src={carpet.imgUrl} style={{ width: '600px', height: '400px' }} />
                                </div>
                            </div>
                        </div>
                        <div className="details col-md-6">
                            <h3 className="product-title">{carpet.name}</h3>
                            <h2>
                                Origin: <span>Bulgaria</span>
                            </h2>
                            <h2>
                                Price: <span>${carpet.price}</span>
                            </h2>
                            <hr />
                            <hr />
                            <div>
                                <label style={{ fontSize: '25px' }}>Product description:</label>
                                <p className="product-description" >
                                    Polyester machine made carpet from the highest quality !
                                </p>
                            </div>
                            <hr />
                            {!isAdmin ?
                                <div className="action">
                                    <button onClick={addProduct} className="add-to-cart btn btn-default" type="button">
                                        Add to cart
                                    </button>
                                </div>
                                :
                                <div className="action">
                                    <div className='d-flex justify-content-between'>
                                        <Link to={{ pathname: `/edit/${carpetId}` }} style={{ border: 'solid black', marginLeft: '50px' }} className="add-to-cart btn" type="button">
                                            Edit
                                        </Link>
                                        <button style={{ border: 'solid black', marginRight: '50px' }} className="add-to-cart btn" type="button" onClick={onDelete}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
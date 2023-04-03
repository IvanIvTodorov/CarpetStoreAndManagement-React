import style from './Products.Module.css'
import { Link } from 'react-router-dom';
import { useLocation} from 'react-router-dom';
import { auth, db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext'



export const Products = ({ carpets, setUserProducts}) => {

    const location = useLocation();
    const path = location.pathname.split('/');
    const {isAdmin, isAuth} = useContext(AuthContext)



    if (path[2] == 'paths') {
        carpets = carpets.filter(carpet => carpet.type.toLowerCase() == 'path');
    } else if (path[2] == 'carpets') {
        carpets = carpets.filter(carpet => carpet.type.toLowerCase() == 'carpet');
    }

    const addProduct = async (e, carpetId) => {
        e.preventDefault();
        const docRef2 = doc(db, 'carpet', carpetId);
        const data2 = await getDoc(docRef2);
        const carpet = data2.data();

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
                        name: carpet.name,
                        type: carpet.type
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
                            name: carpet.name,
                            type: carpet.type
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

        return alert(`You have successfully added ${carpet.name} to your cart`)
    }

    return (
        <div className='container' style={{ minHeight: '567px'}}>
            <div className="row">
                {carpets.length > 0 ? carpets.map((carpet) => {
                    return <div key={carpet.id} className="col-md-3 col-sm-6" style={{marginBottom: '25px', marginTop: '25px'}}>
                        <div className="product-grid2">
                            <div className="product-image2">
                                <Link to={{ pathname: `/details/${carpet.id}` }}>
                                    <img className="pic-1" style={{ width: '350px', height: '400px' }} src={carpet.imgUrl} />
                                    <img className="pic-2" style={{ width: '350px', height: '400px' }} src={carpet.imgUrl} />

                                </Link>
                                {isAuth && !isAdmin &&
                                    <Link onClick={e => addProduct(e, carpet.id)} className="add-to-cart" to="">
                                        Add to cart
                                    </Link>
                                }
                                {isAdmin &&
                                    <Link className="add-to-cart" to={{ pathname: `/edit/${carpet.id}` }}>
                                        Edit
                                    </Link>
                                }

                            </div>
                            <div className="product-content">
                                <h3 className="title"  >
                                    <Link to={{ pathname: `/details/${carpet.id}` }}>{carpet.name}</Link>
                                </h3>
                                <hr />
                                <span className="price">${carpet.price}</span>
                            </div>
                        </div>
                    </div>
                })
                    :
                    <h1 style={{ textAlign: 'center' }}>We are adding designs at the moment !</h1>
                }
            </div>
        </div>
    )
};
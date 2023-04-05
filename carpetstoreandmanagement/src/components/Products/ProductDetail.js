import style from './ProductDetails.Module.css'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db, auth } from '../../firebase';
import { getDoc, doc, deleteDoc, collection, addDoc, updateDoc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext'


export const ProductDetail = ({ setCarpets, setUserProducts }) => {
    const [carpet, setCarpet] = useState({})
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const { carpetId } = useParams();
    const { isAdmin, isAuth } = useContext(AuthContext)

    const docRef = doc(db, 'carpet', carpetId);
    let navigate = useNavigate();
    const commentCollection = collection(db, 'comments')

    useEffect(() => {
        const getCarpet = async () => {
            const data = await getDoc(docRef);
            setCarpet({ ...data.data() });
            const queryComments = query(commentCollection, where("carpetId", "==", carpetId));
            const commentDocs = await getDocs(queryComments);

            let filtered = commentDocs.docs.map(doc => ({ ...doc.data(), commentId: doc.id }));
            filtered = filtered.sort((x, y) => x.time - y.time);

            setComments(filtered)
        };

        getCarpet();
    }, [])

    const onDelete = async (e) => {
        e.preventDefault();
        await deleteDoc(docRef)
        setCarpets(carpets => (carpets.filter(x => x.id != carpetId)))
        alert('You have successfully deleted this item !')
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
                        qty: Number(1),
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
                            qty: Number(1),
                            imgUrl: carpet.imgUrl,
                            price: carpet.price,
                            name: carpet.name
                        }
                    }
                }, { merge: true })
                    .catch(err => { console.log(err) })
            } else {               
                return alert('You have already added this product !')
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

    const sendComment = async (e) => {
        e.preventDefault()

        let timeNow = Date.now();

        addDoc(commentCollection, {
            text: comment,
            carpetId: carpetId,
            userId: auth.currentUser.uid,
            time: timeNow,
            email: auth.currentUser.email[0].toUpperCase(),
        }).then(async () => {
            const queryComments = query(commentCollection, where("carpetId", "==", carpetId));
            const commentDocs = await getDocs(queryComments);

            let filtered = commentDocs.docs.map(doc => ({ ...doc.data(), commentId: doc.id }));
            filtered = filtered.sort((x, y) => x.time - y.time);
            setComments(filtered)
            setComment('')
        })
    }

    const onDeleteComment = async (e, commentId) => {
        e.preventDefault();
        await deleteDoc(doc(db, 'comments', commentId));

        const queryComments = query(commentCollection, where("carpetId", "==", carpetId));
        const commentDocs = await getDocs(queryComments);

        let filtered = commentDocs.docs.map(doc => ({ ...doc.data(), commentId: doc.id }));
        filtered = filtered.sort((x, y) => x.time - y.time);
        setComments(filtered)
    }

    return (
        <>
            <div className='container' style={{ minHeight: '517px' }}>
                <div className="card">
                    <div className="container-fliud">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="tab-content">
                                    <div className="tab-pane active" id="pic-1">
                                        <img src={carpet.imgUrl} style={{ width: '600px', height: '400px' }} />
                                    </div>
                                </div>
                            </div>
                            <div className="details col-md-6">
                                <h3 className="product-title">Name: {carpet.name}</h3>
                                <hr />
                                <h3 className="product-title">
                                    Price: <span>${carpet.price}</span>
                                </h3>
                                <hr />
                                <h3 className="product-title">
                                    Type: <span> {carpet.type}</span>
                                </h3>
                                <hr />
                                <h3 className="product-title">
                                    Origin: <span>Bulgaria</span>
                                </h3>
                                <hr />
                                {isAuth && !isAdmin &&
                                    <div className="action">
                                        <button onClick={addProduct} className="add-to-cart btn btn-default" type="button">
                                            Add to cart
                                        </button>
                                    </div>
                                }
                                {isAdmin &&
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
            {isAuth &&
                <div className="container my-2">
                    <h1 style={{ textAlign: 'center' }}>Leave a comment</h1>
                    <div className="row mt-4 d-flex justify-content-center">
                        <div className="col-md-9">
                            <form className=" reply-form ">
                                <div className="commentBox">
                                    <ul className="list-unstyled">
                                        {comments.map((x, index) => {
                                            return <li key={index}>
                                                <span className="profileBox">{x.email}</span>{" "}
                                                <span className="profileText">
                                                    {x.text}
                                                </span>
                                                {x.userId === auth.currentUser.uid &&
                                                    <button style={{ border: 'solid black' }} className="btn btn-danger float-right" type="button" onClick={e => onDeleteComment(e, x.commentId)}>
                                                        Delete
                                                    </button>
                                                }

                                            </li>
                                        })}

                                    </ul>
                                </div>
                                <div id="div_id_username" className="form-group required">
                                    <div className="controls form-group d-flex w-100 ">
                                        <input
                                            className="input-md  textinput textInput form-control"
                                            id="id_username"
                                            placeholder="Write your review"
                                            type="text"
                                            onChange={(value) => setComment(value.target.value)}
                                            value={comment}
                                        />
                                        <button
                                            type="submit"
                                            className="btn btn-info border-radius-0  m-0 w-25"
                                            onClick={sendComment}
                                        >
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};
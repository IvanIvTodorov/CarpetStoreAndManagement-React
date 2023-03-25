import style from './Edit.Module.css'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useContext} from 'react';
import { updateDoc, doc, getDoc,collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

import {AuthContext } from '../../contexts/AuthContext'

export const Edit = ({setCarpets}) => {
    const { carpetId } = useParams();
    const [carpet, setCarpet] = useState({})
    let navigate = useNavigate();
    const docRef = doc(db, 'carpet', carpetId);
    const carpetCollection = collection(db, 'carpet')

    const name = useRef(null);
    const type = useRef(null);
    const price = useRef(null);
    const imgUrl = useRef(null);
    const {isAdmin, isAuth} = useContext(AuthContext)
    
    useEffect(() => {
        if (isAuth && !isAdmin) {
            navigate('/')
        } else if (!isAdmin || !isAuth) {
            navigate('/login')
        }
        const getCarpet = async () => {
            const data = await getDoc(docRef);
            setCarpet(data.data())
        };

        

        getCarpet();
    }, [])

    const onPost = async (e) => {
        e.preventDefault();
        await updateDoc(docRef, {
            name: name.current.value,
            type: type.current.value,
            price: price.current.value,
            imgUrl: imgUrl.current.value
        }).then(async () => {
            const data = await getDocs(carpetCollection)
            setCarpets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            alert('You have successfully edited this product !')
            navigate(`/products`)
        })
    }

    return (
        <div className="wrapper fadeInDown" style={{ minHeight: '567px' }}>
            <div id="formContent">
                <div className="fadeIn first">
                    <h1>Edit design</h1>
                </div>
                <form>
                    <input
                        type="text"
                        id="name"
                        className="fadeIn second"
                        name="name"
                        ref={name}
                        defaultValue={carpet.name}
                        placeholder="Product name"
                    />
                    <input
                        type="text"
                        id="type"
                        className="fadeIn third"
                        name="type"
                        ref={type}
                        defaultValue={carpet.type}
                        placeholder="Product type"

                    />
                    <input
                        type="number"
                        id="price"
                        className="fadeIn third"
                        name="price"
                        ref={price}
                        defaultValue={carpet.price}
                        min={1}
                        placeholder="Product price"
                    />
                    <input
                        type="text"
                        id="imgUrl"
                        className="fadeIn third"
                        name="imgUrl"
                        ref={imgUrl}
                        defaultValue={carpet.imgUrl}
                        placeholder="Product image URL"
                    />
                    <input onClick={onPost} type="submit" className="fadeIn fourth" defaultValue="Register" />
                </form>
            </div>
        </div>
    );
};
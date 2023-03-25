import style from './Create.Module.css'
import { useContext, useEffect, useState } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import {AuthContext } from '../../contexts/AuthContext'


export const Create = ({setCarpets }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const carpetCollection = collection(db, 'carpet')
    let navigate = useNavigate();

    const onPost = async (e) => {
        e.preventDefault();
        addDoc(carpetCollection, {
            name: name,
            type: type,
            price: price,
            imgUrl: imgUrl
        }).then(async () => {
            const data = await getDocs(carpetCollection)
            setCarpets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            alert(`You hace successfully created new design !`)
            navigate('/products')
        })
    }

    const {isAdmin, isAuth} = useContext(AuthContext)

    useEffect(() => {
        if (isAuth && !isAdmin) {
            navigate('/')
        } else if (!isAdmin || !isAuth) {
            navigate('/login')
        }
    }, []);

    return (
        <div className="wrapper fadeInDown" style={{ minHeight: '567px' }}>
            <div id="formContent">
                <div className="fadeIn first">
                    <h1>Create design</h1>
                </div>
                <form>
                    <input
                        type="text"
                        id="name"
                        className="fadeIn second"
                        name="name"
                        onChange={value => setName(value.target.value)}
                        value={name}
                        placeholder="Product name"
                    />
                    <input
                        type="text"
                        id="type"
                        className="fadeIn third"
                        name="type"
                        onChange={value => setType(value.target.value)}
                        value={type}
                        placeholder="Product type"

                    />
                    <input
                        type="number"
                        id="price"
                        className="fadeIn third"
                        name="price"
                        onChange={value => setPrice(value.target.value)}
                        value={price}
                        min={1}
                        placeholder="Product price"
                    />
                    <input
                        type="text"
                        id="imgUrl"
                        className="fadeIn third"
                        name="imgUrl"
                        onChange={value => setImgUrl(value.target.value)}
                        value={imgUrl}
                        placeholder="Product image URL"
                    />
                    <input onClick={onPost} type="submit" className="fadeIn fourth" defaultValue="Register" />
                </form>
            </div>
        </div>
    );
};
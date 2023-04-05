import style from './Create.Module.css'
import { Fragment, useContext, useEffect, useState } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'


export const Create = ({ setCarpets }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [error, setError] = useState([]);
    const carpetCollection = collection(db, 'carpet')
    let navigate = useNavigate();
    const { isAdmin, isAuth } = useContext(AuthContext)

    useEffect(() => {
        if (isAuth && !isAdmin) {
            navigate('/forbiden')
        } else if (!isAdmin || !isAuth) {
            navigate('/login')
        }
    }, []);

    const onPost = async (e) => {
        e.preventDefault();

        let errMsg = []
        if (!name || name.length <= 0 || name.length > 10) {
            errMsg.push('Name length should be between 0 and 10');
        }

        if (!type || type.length <= 0 || type.length > 10) {
            errMsg.push('Type length should be between 0 and 10')
        }

        if (!price || !Number(price) || Number(price) <= 0 || Number(price) > 1000) {
            errMsg.push('Price should be in a range from 1 to 1000')
        }

        if (!imgUrl || imgUrl.length <= 0) {
            errMsg.push('ImageUrl length should be higher than 0')
        }

        if (errMsg.length > 0) {
           return setError(errMsg);
        }else{
            setError([])
        }


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


    return (
        <>{error.length > 0 && error &&
            <div className="alert alert-danger text-center">
                {error.map((e, index) => {
                    return <Fragment key={index}>
                        <strong>{e}</strong>
                        <br/>
                    </Fragment>
                })}
            </div>
            }

            <div className="wrapper fadeInDown" style={{ minHeight: '551px' }}>
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
        </>

    );
};
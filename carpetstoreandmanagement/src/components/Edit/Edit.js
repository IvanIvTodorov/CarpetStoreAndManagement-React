import style from './Edit.Module.css'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { updateDoc, doc, getDoc,collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

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

    useEffect(() => {
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
            navigate('/products')
        })
    }

    return (
        <div className="container">
            <div className="row main">
                <div className="main-login main-center">
                    <form>
                        <div className="form-group">
                            <label htmlFor="email" className="cols-sm-2 control-label">
                                Name
                            </label>
                            <div className="cols-sm-10">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="fa fa-envelope fa" aria-hidden="true" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        id="email"
                                        placeholder="Enter your Email"
                                        defaultValue={carpet.name}
                                        ref={name}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username" className="cols-sm-2 control-label">
                                Type
                            </label>
                            <div className="cols-sm-10">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="fa fa-users fa" aria-hidden="true" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        id="username"
                                        placeholder="Enter your Username"
                                        defaultValue={carpet.type}
                                        ref={type}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="cols-sm-2 control-label">
                                Price
                            </label>
                            <div className="cols-sm-10">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="fa fa-lock fa-lg" aria-hidden="true" />
                                    </span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="password"
                                        id="password"
                                        placeholder="Enter your Password"
                                        defaultValue={carpet.price}
                                        ref={price}
                                        min={0}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm" className="cols-sm-2 control-label">
                                Image URL
                            </label>
                            <div className="cols-sm-10">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="fa fa-lock fa-lg" aria-hidden="true" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="confirm"
                                        id="confirm"
                                        placeholder="Confirm your Password"
                                        defaultValue={carpet.imgUrl}
                                        ref={imgUrl}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group d-flex justify-content-center">
                            <a
                                target="_blank"
                                type="button"
                                id="button"
                                className="btn btn-primary btn-lg btn-block login-button"
                                onClick={onPost}
                            >
                                Edit
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
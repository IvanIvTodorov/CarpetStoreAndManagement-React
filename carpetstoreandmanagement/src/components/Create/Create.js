import style from './Create.Module.css'
import { useEffect, useRef } from 'react';
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

export const Create = ({ isAdmin, isAuth }) => {
    const name = useRef(null);
    const type = useRef(null);
    const price = useRef(null);
    const imgUrl = useRef(null);
    const carpetCollection = collection(db, 'carpet')
    let navigate = useNavigate();

    const onPost = async (e) => {
        e.preventDefault();
        await addDoc(carpetCollection, {
            name: name.current.value,
            type: type.current.value,
            price: price.current.value,
            imgUrl: imgUrl.current.value
        }).then(() => {
            navigate('/products')
        })
    }

    useEffect(() => {
        if (isAuth && !isAdmin) {
            navigate('/')
        }else if (!isAdmin || !isAuth) {
            navigate('/login')
        }
    }, []);

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
                                Create
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
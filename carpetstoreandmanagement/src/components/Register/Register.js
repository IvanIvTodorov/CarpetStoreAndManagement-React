import style from './Register.Module.css'

import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../../firebase'

export const Register = () => {
    const email =  useRef(null);
    const password = useRef(null);
    const rePassword = useRef(null);
    let navigate = useNavigate();

    const onRegister = e => {
        e.preventDefault();
        try {
            if (password.current.value !== rePassword.current.value) {
                throw new Error("Password missmatch !")
            }
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then(user => {
                    console.log(user);
                    navigate('/login');
                })
                .catch(err => {
                    console.log(err);
                });      
            
        } catch (error) {
            console.log(error)
        }    
    }
    return (
        <div className="container">
            <div className="row main">
                <div className="main-login main-center">
                    <form>
                        <div className="form-group">
                            <label htmlFor="email" className="cols-sm-2 control-label">
                                Email
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
                                        ref={email}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="cols-sm-2 control-label">
                                Password
                            </label>
                            <div className="cols-sm-10">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="fa fa-lock fa-lg" aria-hidden="true" />
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        id="password"
                                        placeholder="Enter your Password"
                                        ref={password}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm" className="cols-sm-2 control-label">
                                Confirm Password
                            </label>
                            <div className="cols-sm-10">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="fa fa-lock fa-lg" aria-hidden="true" />
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="confirm"
                                        id="confirm"
                                        placeholder="Confirm your Password"
                                        ref={rePassword}
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
                                onClick={onRegister}
                            >
                                Register
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
};
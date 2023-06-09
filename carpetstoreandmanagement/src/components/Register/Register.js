import style from './Register.Module.css'

import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { AuthContext } from '../../contexts/AuthContext';

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [error, setError] = useState('');
    const {isAuth} = useContext(AuthContext);

    let navigate = useNavigate();


    useEffect(() => {
        if (isAuth) {
            navigate('/')
        } 
    }, []);

    const onRegister = e => {
        e.preventDefault();

        if (password !== rePassword) {
            return setError("Password missmatch !")
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(user => {
                navigate('/login');
                alert('You have been registrated successfully !')
            })
            .catch(err => {
                return setError(err.message.slice(10));
            });

    }
    return (
        <>
            {error &&
                <div className="alert alert-danger text-center">
                    <strong>{error}</strong>
                </div>
            }
            <div className="wrapper fadeInDown" style={{ minHeight: '551px' }}>
                <div id="formContent">
                    <div className="fadeIn first">
                        <h1>Register</h1>
                    </div>
                    <form>
                        <input
                            type="text"
                            id="login"
                            className="fadeIn second"
                            name="login"
                            placeholder="Type your email"
                            onChange={value => setEmail(value.target.value)}
                            value={email}
                        />
                        <input
                            type="password"
                            className="fadeIn third"
                            name="login"
                            placeholder="Type your password"
                            onChange={value => setPassword(value.target.value)}
                            value={password}
                        />

                        <input
                            type="password"
                            className="fadeIn third"
                            name="login"
                            placeholder="Confirm your password"
                            onChange={value => setRePassword(value.target.value)}
                            value={rePassword}
                        />
                        <input onClick={onRegister} type="submit" className="fadeIn fourth" defaultValue="Register" />
                    </form>
                </div>
            </div>
        </>
    )
};
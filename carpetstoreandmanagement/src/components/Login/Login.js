import style from './Login.Module.css'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, provider } from '../../firebase'
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

export const Login = ({setIsAuth, setIsAdmin }) => {
    let navigate = useNavigate();

    const signWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                if (result.user.uid == "41ZdJ9N2UggDvyaPCaNlSFt39DB3") {
                    localStorage.setItem("isAdmin", true);
                    setIsAdmin(true);
                }
                localStorage.setItem("isAuth", true);
                setIsAuth(true)
                navigate("/")
            });
    };

    const email = useRef(null);
    const password = useRef(null);

    const onUserLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((result) => {
                    localStorage.setItem("isAuth", true);
                    setIsAuth(true)
                    navigate("/")
                })
                .catch((error) => {
                    console.log(error);
                })
    }



    return (
        <div className="container">
            <div className="row main">
                <div className="main-login main-center">
                    <form>
                        <div className="form-group">
                            <label htmlFor="email" className="cols-sm-2 control-label">
                                Your Email
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
                    </form>
                    <div className="form-group d-flex justify-content-center">
                        <a
                            target="_blank"
                            type="button"
                            id="button"
                            className="btn btn-primary btn-lg btn-block login-button"
                            onClick={onUserLogin}
                        >
                            Login
                        </a>
                    </div>
                    <div className='loginPage col-md-12 text-center'>
                        <button className='login-with-google-btn' onClick={signWithGoogle}>Sign in with Google</button>
                    </div>

                </div>
            </div>
        </div>

    )
};
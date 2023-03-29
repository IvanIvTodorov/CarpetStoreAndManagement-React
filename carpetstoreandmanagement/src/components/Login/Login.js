import style from './Login.Module.css'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, provider } from '../../firebase'
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Login = ({ setIsAuth, setIsAdmin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
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


    const onUserLogin = (e) => {
        try {
            e.preventDefault();
            signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                localStorage.setItem("isAuth", true);
                setIsAuth(true)
                navigate("/")
            })
            .catch((error) => {
                setError('Invalid username or password !')
            })         
        } catch (error) {
            setError('Invalid username or password !')
        }     
    }



    return (
        <>  {error &&
                <div className="alert alert-danger text-center">
                    <strong>{error}</strong>
                </div>
            }
            <div className="wrapper fadeInDown" style={{ minHeight: '551px' }}>
                <div id="formContent">
                    <div className="fadeIn first">
                        <h1>Login</h1>
                    </div>
                    <form>
                        <input
                            type="text"
                            className="fadeIn second"
                            placeholder="Type your email"
                            onChange={value => setEmail(value.target.value)}
                            value={email}
                        />
                        <input
                            type="password"
                            className="fadeIn third"
                            placeholder="Type your password"
                            onChange={value => setPassword(value.target.value)}
                            value={password}
                        />
                        <input onClick={onUserLogin} type="submit" className="fadeIn fourth" defaultValue="Log In" />
                    </form>
                    <div className='loginPage col-md-12 text-center'>
                        <button className='login-with-google-btn' onClick={signWithGoogle}>Log in with Google</button>
                    </div>
                </div>
            </div>
        </>

    )
};

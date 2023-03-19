import style from './Header.Module.css';
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase'


export const Header = ({ isAuth, setIsAuth, setIsAdmin, isAdmin }) => {
    let navigate = useNavigate();
    const signUserOut = () => {
        signOut(auth)
            .then(() => {
                localStorage.clear();
                setIsAuth(false);
                setIsAdmin(false);
                navigate("/");
            })
    }

    return (
        <div id="menu_area" className="menu-area">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-light navbar-expand-lg mainmenu">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="active">
                                    <Link to="/">
                                        Home <span className="sr-only"></span>
                                    </Link>
                                </li>
                                <li className="dropdown">
                                    <Link
                                        className="dropdown-toggle"
                                        to="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        Products
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <Link to="/products">Carpets</Link>
                                        </li>
                                        <li>
                                            <Link to="/products">Paths</Link>
                                        </li>
                                        <li>
                                            <Link to="/products">All</Link>
                                        </li>
                                    </ul>
                                </li>
                                {isAdmin &&
                                    <>
                                        <li className="active">
                                            <Link to="/create">
                                                Create design<span className="sr-only"></span>
                                            </Link>
                                        </li>
                                        <li className="active">
                                            <Link to="/inventory">
                                                Inventory <span className="sr-only"></span>
                                            </Link>
                                        </li>
                                        <li className="active">
                                            <Link to="/produce">
                                                Produce <span className="sr-only"></span>
                                            </Link>
                                        </li>
                                    </>
                                }
                            </ul>
                            <ul className='right-ul navbar-nav'>
                                {isAuth ?
                                    <li>
                                        <Link to="#" type='button' onClick={signUserOut}>Logout</Link>
                                    </li>
                                    :
                                    <>
                                        <li>
                                            <Link to="/login">Login</Link>
                                        </li>
                                        <li>
                                            <Link to="/register">Register</Link>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};
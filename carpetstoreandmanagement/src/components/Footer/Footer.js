import style from './Footer.Module.css'
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

export const Footer = () => {
    const { isAdmin } = useContext(AuthContext)
    return (
        <footer>
            <div className="bottom section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="copyright">
                                {isAdmin ?
                                    <p>Company budget: $5000</p>
                                    :
                                    <p> © <span>2023</span>{" "}
                                        CarpetStoreAndManagement
                                    </p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
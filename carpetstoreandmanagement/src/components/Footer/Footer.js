import style from './Footer.Module.css'

export const Footer = () => {
    return (
        <footer>
            <div className="bottom section-padding">
                <div className="container">
                    <div className="d-flex justify-content-between">

                        <div className='copyright'>
                            <p> © <span>2023</span>{" "}
                                CarpetStoreAndManagement
                            </p>
                        </div>
                        <div className='copyright'>
                            <p> Adress:
                                Sliven, Bul. Hadzhi Dimitar 42
                            </p>
                        </div>
                        <div className='copyright'>
                            <p>Call us: <a href='tel:+359555555555' style={{color: 'black'}}> 
                                    +359 555 555 555
                                </a>                      
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
import style from './Footer.Module.css'

export const Footer = () => {
    return (
        <footer>
            <div className="bottom section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="copyright">
                                <p> © <span>2023</span>{" "}
                                    CarpetStoreAndManagement
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
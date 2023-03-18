import style from './ProductDetails.Module.css'

export const ProductDetail = () => {
    return (
        <div className="container">
            <div className="card">
                <div className="container-fliud">
                    <div className="wrapper row">
                        <div className="preview col-md-6">
                            <div className="preview-pic tab-content">
                                <div className="tab-pane active" id="pic-1">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGmEgyFVWne87A2RGnqYA1TJq2-UaBU_sUEgQqQc-d&s" style={{ width: '600px', height: '400px' }} />
                                </div>
                            </div>
                        </div>
                        <div className="details col-md-6">
                            <h3 className="product-title">Carpet Name</h3>
                            <p className="product-description">
                                Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia
                                sem sem! Repudiandae et! Massa senectus enim minim sociosqu delectus
                                posuere.
                            </p>
                            <h4 className="price">
                                current price: <span>$180</span>
                            </h4>
                            <h5 className="colors">
                                color: <span>RED</span>
                            </h5>
                            <div className="action">
                                <button className="add-to-cart btn btn-default" type="button">
                                    add to cart
                                </button>
                            </div>                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
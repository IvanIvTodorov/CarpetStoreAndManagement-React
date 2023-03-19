import style from './Products.Module.css'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


export const Products = ({ carpets, isAdmin }) => {
    const location = useLocation();
    const path = location.pathname.split('/');

    if (path[2] == 'paths') {
        carpets = carpets.filter(carpet => carpet.type.toLowerCase() == 'path');
    }else if (path[2] == 'carpets')
    {
        carpets = carpets.filter(carpet => carpet.type.toLowerCase() == 'carpet');
    }

    return (
        <div className='container'>
            <div className="row">
                {carpets.map((carpet) => {
                    return <div key={carpet.id} className="col-md-3 col-sm-6">
                        <div className="product-grid2">
                            <div className="product-image2">
                                <Link to={{ pathname: `/details/${carpet.id}` }}>
                                    <img className="pic-1" style={{ width: '350px', height: '400px' }} src={carpet.imgUrl} />
                                    <img className="pic-2" style={{ width: '350px', height: '400px' }} src={carpet.imgUrl} />

                                </Link>
                                {isAdmin ?
                                    <Link className="add-to-cart" to={{ pathname: `/edit/${carpet.id}` }}>
                                        Edit
                                    </Link>
                                    :
                                    <Link className="add-to-cart" to="">
                                        Add to cart
                                    </Link>
                                }

                            </div>
                            <div className="product-content">
                                <h3 className="title">
                                    <Link to={{ pathname: `/details/${carpet.id}` }}>{carpet.name}</Link>
                                </h3>
                                <span className="price">${carpet.price}</span>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
};
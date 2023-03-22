import style from './RawMaterials.Module.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'



export const RawMaterials = () => {
    const [yarn, setYarn] = useState(null);
    const [warp, setWarp] = useState(null);
    const [weft, setWeft] = useState(null);

    const increaseAmount = async (value, rawMaterial) => {
        if (rawMaterial == "yarn") {
            setYarn(value.target.value)
        }else if(rawMaterial == "warp"){
            setWarp(value.target.value)
        }else{
            setWeft(value.target.value)
        }
    };

    
    return (
        <div className='container'>
            <div className="row d-flex justify-content-center">
                <div className="col-md-3 col-sm-6">
                    <div className="product-grid2">
                        <div className="product-image2">
                            <Link>
                                <img className="pic-1" style={{ width: '350px', height: '400px' }} src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg" />
                                <img className="pic-2" style={{ width: '350px', height: '400px' }} src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg" />
                            </Link>
                            <Link className="add-to-cart">
                                Buy
                            </Link>
                        </div>
                        <div className="product-content form-inline">

                            <input onChange={value => increaseAmount(value, "warp")} min={1} defaultValue={1} className="form-control" type="number"></input>
                        </div>
                    </div>
                </div><div className="col-md-3 col-sm-6">
                    <div className="product-grid2">
                        <div className="product-image2">
                            <Link>
                                <img className="pic-1" style={{ width: '350px', height: '400px' }} src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg" />
                                <img className="pic-2" style={{ width: '350px', height: '400px' }} src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg" />
                            </Link>
                            <Link className="add-to-cart">
                                Buy
                            </Link>
                        </div>
                        <div className="product-content form-inline">

                            <input onChange={value => increaseAmount(value, "weft")} min={1} defaultValue={1} className="form-control" type="number"></input>
                        </div>
                    </div>
                </div><div className="col-md-3 col-sm-6">
                    <div className="product-grid2">
                        <div className="product-image2">
                            <Link>
                                <img className="pic-1" style={{ width: '350px', height: '400px' }} src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg" />
                                <img className="pic-2" style={{ width: '350px', height: '400px' }} src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg" />
                            </Link>
                            <Link className="add-to-cart">
                                Buy
                            </Link>
                        </div>
                        <div className="product-content form-inline">
                            <input onChange={value => increaseAmount(value, "yarn")} min={1} defaultValue={1} className="form-control" type="number"></input>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
import style from './RawMaterials.Module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { AuthContext } from '../../contexts/AuthContext'



export const RawMaterials = () => {
    const [yarn, setYarn] = useState(1);
    const [warp, setWarp] = useState(1);
    const [weft, setWeft] = useState(1);
    const { isAuth, isAdmin } = useContext(AuthContext);
    const navigate = useNavigate();
    const budgetRef = doc(db, 'budget', 'budget');

    useEffect(() => {
        if (isAuth && !isAdmin) {
            navigate('/forbiden')
        } else if (!isAdmin || !isAuth) {
            navigate('/login')
        }
    }, [])

    const increaseAmount = async (value, rawMaterial) => {
        if (value.target.value < 1) {
            value.target.value = 1;
            return alert('Quantity should be higher than 0 !')
        }
        if (rawMaterial == "yarn") {
            setYarn(value.target.value)
        } else if (rawMaterial == "warp") {
            setWarp(value.target.value)
        } else {
            setWeft(value.target.value)
        }
    };

    const buyWeft = async () => {
        const weftRef = doc(db, 'rawMaterials', 'weft');
        const document = await getDoc(weftRef);


        const budget = (await getDoc(budgetRef)).data();
        const newBudget = Number(budget.budget) - Number(weft)

        if (newBudget < 0) {
            alert('You do not have enough budget...')
        } else {
            await updateDoc(weftRef, {
                qty: Number(Object.values(document.data())[0] + Number(weft))
            });

            updateDoc(budgetRef, {
                [`budget`]: newBudget
            });

            alert(`You have successfuly bought ${Number(weft)} pcs of weft!`)
        }
    }

    const buyYarn = async () => {
        const yarnRef = doc(db, 'rawMaterials', 'yarn');
        const document = await getDoc(yarnRef);

        const budget = (await getDoc(budgetRef)).data();
        const newBudget = Number(budget.budget) - Number(yarn)

        if (newBudget < 0) {
            alert('You do not have enough budget...')
        } else {
            await updateDoc(yarnRef, {
                qty: Number(Object.values(document.data())[0] + Number(yarn))
            });

            updateDoc(budgetRef, {
                [`budget`]: newBudget
            });

            alert(`You have successfuly bought ${Number(yarn)} pcs of yarn!`)
        }
    }

    const buyWarp = async () => {
        const warpRef = doc(db, 'rawMaterials', 'warp');
        const document = await getDoc(warpRef);

        const budget = (await getDoc(budgetRef)).data();
        const newBudget = Number(budget.budget) - Number(warp)

        if (newBudget < 0) {
            alert('You do not have enough budget...')
        } else {
            await updateDoc(warpRef, {
                qty: Number(Object.values(document.data())[0] + Number(warp))
            });

            updateDoc(budgetRef, {
                [`budget`]: newBudget
            });

            alert(`You have successfuly bought ${Number(warp)} pcs of warp !`)
        }
    }

    return (
        <div className='container' style={{ minHeight: '551px' }}>
            <div className="row d-flex justify-content-center" >
                <div className="col-md-3 col-sm-6">
                    <div className="product-grid2">
                        <div className="product-image2">
                            <Link>
                                <img className="pic-1" style={{ width: '350px', height: '400px' }} src="https://m.media-amazon.com/images/I/71FroNsHUBL.jpg" />
                                <img className="pic-2" style={{ width: '350px', height: '400px' }} src="https://m.media-amazon.com/images/I/71FroNsHUBL.jpg" />
                            </Link>
                            <Link onClick={buyWarp} className="add-to-cart">
                                Buy Warp
                            </Link>
                        </div>
                        <div className="product-content form-inline">

                            <input onChange={value => increaseAmount(value, "warp")} min={1} defaultValue={1} className="form-control" type="number" style={{ border: '1px solid black' }}></input>
                        </div>
                    </div>
                </div><div className="col-md-3 col-sm-6">
                    <div className="product-grid2">
                        <div className="product-image2">
                            <Link>
                                <img className="pic-1" style={{ width: '350px', height: '400px' }} src="https://www.lankava.fi/media/catalog/product/cache/ee39f55c891f4ddf5a992621ab0f18ac/w/i/wilma-m.jpg" />
                                <img className="pic-2" style={{ width: '350px', height: '400px' }} src="https://www.lankava.fi/media/catalog/product/cache/ee39f55c891f4ddf5a992621ab0f18ac/w/i/wilma-m.jpg" />
                            </Link>
                            <Link onClick={buyYarn} className="add-to-cart">
                                Buy Yarn
                            </Link>
                        </div>
                        <div className="product-content form-inline">

                            <input onChange={value => increaseAmount(value, "yarn")} min={1} defaultValue={1} className="form-control" type="number" style={{ border: '1px solid black' }}></input>
                        </div>
                    </div>
                </div><div className="col-md-3 col-sm-6">
                    <div className="product-grid2">
                        <div className="product-image2">
                            <Link>
                                <img className="pic-1" style={{ width: '350px', height: '400px' }} src="https://5.imimg.com/data5/XX/SA/NJ/SELLER-86236584/polyeter-cotton-yarn-2f-pc-yarn-500x500-jpg-500x500.jpg" />
                                <img className="pic-2" style={{ width: '350px', height: '400px' }} src="https://5.imimg.com/data5/XX/SA/NJ/SELLER-86236584/polyeter-cotton-yarn-2f-pc-yarn-500x500-jpg-500x500.jpg" />
                            </Link>
                            <Link onClick={buyWeft} className="add-to-cart">
                                Buy Weft
                            </Link>
                        </div>
                        <div className="product-content form-inline">
                            <input onChange={value => increaseAmount(value, "weft")} min={1} defaultValue={1} className="form-control" type="number" style={{ border: '1px solid black' }}></input>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
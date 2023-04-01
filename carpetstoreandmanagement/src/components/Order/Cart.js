import { collection, getDoc, getDocs, doc, updateDoc, deleteField, setDoc, addDoc, deleteDoc } from "firebase/firestore"
import { db, auth } from "../../firebase"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

export const Cart = ({ setUserProducts, userProducts }) => {
    const navigate = useNavigate();
    let totalPrice = userProducts.map(x => +x.qty * +x.price).reduce((a,b) => a + b, 0)
    const {isAuth} = useContext(AuthContext);
    
    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }

        const getCarpets = async () => {
            const carpetCollection = collection(db, 'userProducts')
            const data = await getDocs(carpetCollection)
            const document = doc(db, 'userProducts', auth.currentUser.uid)
            const data2 = await getDoc(document);

            if (data2.data()) {
                setUserProducts(Object.entries(data2.data().carpets).map((carpet => {
                    return {
                        id: carpet[0],
                        ...carpet[1]
                    }
                })));
            }
        }

        getCarpets();
    }, [])

    const deleteItem = async (e, carpetId) => {
        e.preventDefault();
        const userId = auth.currentUser.uid;
        const document = doc(db, 'userProducts', userId);
        const information = await getDoc(document);

        await updateDoc(document, {
            [`carpets.${carpetId}`]: deleteField()
        });

        const curInformation = await getDoc(document);
        if (information.data()) {
            setUserProducts(Object.entries(curInformation.data().carpets).map((carpet => {
                return {
                    id: carpet[0],
                    ...carpet[1]
                }
            })));
        }

        return alert(`You have successfully removed this item!`)
    }

    const increaseAmount = async (value, carpetId) => {
        if (value.target.value <= 0) {
            alert("The qty must be higher than 0 !!!")
            value.target.value = 1;
        }

        const userId = auth.currentUser.uid;
        const document = doc(db, 'userProducts', userId);
        const information = await getDoc(document);

        updateDoc(document, {
            [`carpets.${carpetId}.qty`]: Number(value.target.value)
        });

        const carpet = userProducts.map(y => {
            if (y.id === carpetId) {
                return {
                    id: y.id,
                    qty: Number(value.target.value),
                    price: y.price,
                    imgUrl: y.imgUrl,
                    type: y.type,
                    name: y.name
                }
            }

            return y
        });

        await setUserProducts(carpet)
    }

    const checkoutProducts = async (e, totalPrice) => {
        e.preventDefault();
        const userId = auth.currentUser.uid;
        const ordersCollection = collection(db, 'orders')
        const document = doc(db, 'userProducts', userId);
        const currentData = await getDoc(document);

        let addOrder = currentData.data().carpets;

        await addDoc(ordersCollection, {
            [userId]: {...addOrder},
            isCompleted: false,
            dateOforder: new Date().toLocaleDateString("de-DE")
        });

        await deleteDoc(document)
        setUserProducts([])
        alert('You have successfully completed your order !')

        const budgetRef = doc(db, 'budget', 'budget');
        const budget = (await getDoc(budgetRef)).data();
        const newBudget = Number(budget.budget) + Number(totalPrice) 

        updateDoc(budgetRef, {
            [`budget`]: newBudget
        });

        navigate('/myorders')
    }

    if (userProducts.length > 0) {
        return (
            <div className="container" style={{ minHeight: '551px' }}>
                <div className="row d-flex justify-content-center">
                    <div className="col-sm-12 col-md-10 col-md-offset-1">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Name</th>
                                    <th style={{textAlign: 'center'}}>Quantity</th>
                                    <th className="text-center">Price</th>
                                    <th className="text-center">Total</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userProducts.map((carpet) => {
                                    return <tr key={carpet.id}>
                                        <td className="col-sm-1 col-md-1">
                                            <div className="media">
                                                <Link className="thumbnail pull-left" to={`/details/${carpet.id}`}>
                                                    {" "}
                                                    <img
                                                        className="media-object"
                                                        src={carpet.imgUrl}
                                                        style={{ width: 72, height: 72 }}
                                                    />{" "}
                                                </Link>
                                            </div>
                                        </td>
                                        <td className="col-sm-2 col-md-5"><span>{carpet.name}</span></td>
                                        <td className="col-sm-1 col-md-2" style={{ textAlign: "center" }}>
                                            <input style={{backgroundColor: 'seashell'}}
                                                type="number"
                                                className="form-control text-center"
                                                defaultValue={Number(carpet.qty)}
                                                min={1}
                                                onChange={value => increaseAmount(value, carpet.id)}
                                            />
                                        </td>
                                        <td className="col-sm-1 col-md-1 text-center">
                                            <strong>${carpet.price}</strong>
                                        </td>
                                        <td className="col-sm-1 col-md-1 text-center">
                                            <strong>${Number(carpet.price) * Number(carpet.qty)}</strong>
                                        </td>
                                        <td className="col-sm-1 col-md-1">
                                            <button onClick={e => deleteItem(e, carpet.id)} type="button" className="btn btn-danger">
                                                <span className="glyphicon glyphicon-remove" /> Remove
                                            </button>
                                        </td>
                                    </tr>
                                })}
                                <tr>
                                    <td> &nbsp; </td>
                                    <td> &nbsp; </td>
                                    <td> &nbsp; </td>
                                    <td>
                                        <h3>Total: </h3>
                                    </td>
                                    <td className="text-right">
                                        <h3>
                                            <strong>${totalPrice}</strong>
                                        </h3>
                                    </td>
                                    <td>
                                        <button onClick={e => checkoutProducts(e, totalPrice)} type="button" className="btn btn-success">
                                            Checkout <span className="glyphicon glyphicon-play" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    } else {
        return (

            <div style={{ minHeight: '551px' }}>
                <h1 className="alert alert-danger" style={{ textAlign: 'center' }}>
                    Your shopping cart is empty!
                </h1>
                <div className="d-flex justify-content-center">
                    <Link style={{ textAlign: "center" }} to="/products">
                        Back to products
                    </Link>
                </div>
            </div>
        )
    }
}
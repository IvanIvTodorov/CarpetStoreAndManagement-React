import { collection, getDoc, getDocs, doc, updateDoc, deleteField } from "firebase/firestore"
import { db, auth } from "../../firebase"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const Cart = ({setUserProducts, userProducts}) => {

    useEffect(() => {
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

    const navigate = useNavigate();
    const deleteItem = async (e, carpetId) => {
        e.preventDefault();
        const userId = auth.currentUser.uid;
        const document = doc(db, 'userProducts', userId);
        const information = await getDoc(document);

        await updateDoc(document, {
            [`carpets.${carpetId}`]: deleteField()
        });

        
        if (information.data()) {
            setUserProducts(Object.entries(information.data().carpets).map((carpet => {
                return {
                    id: carpet[0],
                    ...carpet[1]
                }
            })));
        }

    }
    if (userProducts.length > 0) {
        return (
            <div className="container" style={{ minHeight: '567px' }}>
                <div className="row d-flex justify-content-center">
                    <div className="col-sm-12 col-md-10 col-md-offset-1">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th className="text-center">Price</th>
                                    <th className="text-center">Total</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userProducts.map((carpet) => {
                                    return <tr key={carpet.id}>
                                        <td className="col-sm-8 col-md-6">
                                            <div className="media">
                                                <a className="thumbnail pull-left" href="#">
                                                    {" "}
                                                    <img
                                                        className="media-object"
                                                        src={carpet.imgUrl}
                                                        style={{ width: 72, height: 72 }}
                                                    />{" "}
                                                </a>
                                            </div>
                                        </td>
                                        <td className="col-sm-1 col-md-1" style={{ textAlign: "center" }}>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                defaultValue={carpet.qty}
                                            />
                                        </td>
                                        <td className="col-sm-1 col-md-1 text-center">
                                            <strong>${carpet.price}</strong>
                                        </td>
                                        <td className="col-sm-1 col-md-1 text-center">
                                            <strong>$14.61</strong>
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
                                    <td>
                                        <h3>Total:</h3>
                                    </td>
                                    <td className="text-right">
                                        <h3>
                                            <strong>$31.53</strong>
                                        </h3>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-success">
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

            <div>
                <h1 style={{ textAlign: 'center' }}>
                    Your shopping cart is Empty!
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
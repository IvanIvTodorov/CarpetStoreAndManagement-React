import { useEffect, useState, Fragment, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../../contexts/AuthContext";

export const OrderDetails = () => {
    const { orderId } = useParams();
    const [userOrders, setUserOrders] = useState([])
    const [orderStatus, setOrderStatus] = useState(null);
    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);

    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
        const getCarpets = async () => {
            const orderRef = doc(db, 'orders', orderId)
            const document = await getDoc(orderRef);

            const data = document.data();
            setOrderStatus(data.isCompleted);
            delete data.isCompleted
            delete data.dateOforder
            delete data.time;


            setUserOrders(data)
        }

        getCarpets();
    }, [])
    return (
        <>
            {
                orderStatus ?
                    <h1 className="alert alert-danger" style={{ textAlign: 'center' }}>Your order has been sent !</h1>
                    :
                    <h1 className="alert alert-danger" style={{ textAlign: 'center' }}>We are preparing your order!</h1>
            }
            <div className="container" style={{ minHeight: '511px' }}>
                <div className="row">
                    <div className="span5">
                        <table className="table table-striped table-condensed">
                            <thead>
                                <tr>
                                    <th>Product name</th>
                                    <th>Product type</th>
                                    <th>Product price</th>
                                    <th>Product quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.values(userOrders).map((order, index) => {
                                    return <Fragment key={index}>
                                        {
                                            Object.entries(order).map((x, index) => {
                                                return <tr key={index}>
                                                    <td><Link style={{color: 'black'}} to={{ pathname: `/details/${x[0]}` }}>{x[1].name}</Link></td>
                                                    <td>{x[1].type}</td>
                                                    <td>{x[1].price}</td>
                                                    <td>{x[1].qty}</td>
                                                </tr>
                                            })
                                        }
                                    </Fragment>

                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};
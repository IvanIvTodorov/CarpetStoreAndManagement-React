import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

export const MyOrders = () => {
    const [userOrders, setUserOrders] = useState([])
    const [orderIds, setOrderIds] = useState([]);
    const [dates, setDates] = useState([]);
    

    useEffect(() => {
        const getOrders = async () => {
            const carpetCollection = collection(db, 'orders')
            const data = await getDocs(carpetCollection)
            const userId = auth.currentUser.uid;
            setOrderIds(data.docs.map(d => d.id))
            const orders = data.docs.map(d => ({ ...d.data() }));
            const filteredOrders = [];
            const dateOforders = [];
            for (let index = 0; index < orders.length; index++) {

                const el = orders[index];
                delete el.isCompleted;
                dateOforders.push(el.dateOforder);
                delete el.dateOforder;

                if (el.hasOwnProperty(userId)) {

                    filteredOrders.push(el);
                }
            }
            
            setDates(dateOforders)
            setUserOrders(filteredOrders.map(x => Object.entries(x).map(y => Object.values(y[1]).map((z, index) =>
            ({
                id: Object.keys(y[1])[index],
                ...z
            })))[0]));
        }

        getOrders();
    }, [])

    if (userOrders.length > 0) {
        return (
            <div className="container" style={{ minHeight: '567px' }}>
                <div className="row">
                    <div className="span5">
                        <table className="table table-striped table-condensed">
                            <thead>
                                <tr>
                                    <th>Order id</th>
                                    <th>Date of order</th>
                                    <th>Total price</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userOrders.map((order, index) => {
                                    const total = userOrders[index].map(x => +x.qty * +x.price).reduce((a,b) => a + b, 0);
                                    return <tr key={index}>
                                        <td>{orderIds[index]}</td>
                                        <td>{dates[index]}</td>
                                        <td>{total}</td>
                                        <td>
                                            <Link to={`/myorders/${orderIds[index]}`}>
                                                Order details
                                            </Link>
                                        </td>
    
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }else {
        return (

            <div style={{ minHeight: '567px' }}>
                <h1 style={{ textAlign: 'center' }}>
                    Your do not have any orders!
                </h1>
                <div className="d-flex justify-content-center">
                    <Link style={{ textAlign: "center" }} to="/products">
                        Back to products
                    </Link>
                </div>
            </div>
        )
    }
    
};
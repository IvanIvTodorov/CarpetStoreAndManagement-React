import { useState, useEffect } from "react"
import { db, auth } from "../../firebase"
import { collection, getDocs, getDoc, doc } from "firebase/firestore"
import { useNavigate } from "react-router-dom";

export const Orders = ({ userProducts }) => {
    const [orders, setOrders] = useState([])
    const [orderId, setOrdersId] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getOrders = async () => {
            const carpetCollection = collection(db, 'orders')
            const data = await getDocs(carpetCollection)
            const userId = auth.currentUser.uid;
            const orders = data.docs.map((d) => ({ ...d.data() }));


            const mapped = orders.map(x => Object.entries(x).map(y => Object.values(y[1]).map((z, index) =>
            ({
                id: Object.keys(y[1])[index],
                ...z
            })))[0]);

            const orderIds = []
            for (let index = 0; index < data.docs.length; index++) {
                orderIds.push(data.docs[index].id)
            }

            setOrdersId(orderIds)
            setOrders(mapped)
        }

        getOrders();
    }, [])

    const produceItems = async (e, orderId) => {
        e.preventDefault();
        
        navigate(`/produce/${orderId}`)
    }

    return (
        <div className="container" style={{ minHeight: '567px' }}>
            <div className="row">
                <div className="span5">
                    <table className="table table-striped table-condensed">
                        <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Product Id</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th/>
                                <th/>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => {
                                return <>
                                    <>  <tr>
                                        <td>{orderId[index]}</td>
                                        <td>
                                            {orders[index].map((x, index) => {
                                                return <div key={index}>{x.id}</div>
                                            })}
                                        </td>
                                        <td>
                                            {orders[index].map((x, index) => {
                                                return <div key={index}>{x.qty}</div>
                                            })}
                                        </td>
                                        <td>
                                            {orders[index].map((x, index) => {
                                                return <div key={index}>{x.price}</div>
                                            })}
                                        </td>
                                        <td>
                                            <button onClick={e => produceItems(e, orderId[index])} className="btn btn-danger">Produce</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-success">Complete order</button>
                                        </td>
                                    </tr>
                                    </>
                                    <tr style={{ borderTop: "5px solid red" }}>
                                    </tr>
                                </>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db, auth } from "../../firebase";
import { useState } from "react";
import { UNSAFE_getPathContributingMatches } from "@remix-run/router";

export const MyOrders = () => {
    const [userOrders, setUserOrders] = useState([])

    useEffect(() => {
        const getOrders = async () => {
            const carpetCollection = collection(db, 'orders')
            const data = await getDocs(carpetCollection)
            const userId = auth.currentUser.uid;
            const orders = data.docs.map((d) => ({ ...d.data() }));

            const filtered = orders.filter(x => x.hasOwnProperty(userId))

            setUserOrders(filtered.map(x => Object.entries(x).map(y => Object.values(y[1]).map((z, index) =>
            ({
                id: Object.keys(y[1])[index],
                ...z
            })))[0]));
        }

        getOrders();
    }, [])

    return (
        <div className="container" style={{ minHeight: '567px' }}>
            <div className="row">
                <div className="span5">
                    <table className="table table-striped table-condensed">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>                           
                        </thead>
                        <tbody>
                            {userOrders.map((order, index) => {
                                console.log(order);
                                return <>
                                    {order.map(x => {
                                        return <tr key={x.id}>
                                            <td>{x.name}</td>
                                            <td>{x.type}</td>
                                            <td>{x.qty}</td>
                                            <td>{x.price}</td>
                                            <td>
                                                <span className="label label-success">In process...</span>
                                            </td>
                                        </tr>
                                    })}
                                    <td style={{borderTop: "5px solid red"}}></td>
                                    <td style={{borderTop: "5px solid red"}}></td>
                                    <td style={{borderTop: "5px solid red"}}></td>
                                    <td style={{borderTop: "5px solid red"}}></td>
                                    <td style={{borderTop: "5px solid red"}}></td>
                                </>                                
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
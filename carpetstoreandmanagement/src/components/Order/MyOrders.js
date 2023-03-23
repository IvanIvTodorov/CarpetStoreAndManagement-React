import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useState, Fragment, useEffect } from "react";

export const MyOrders = () => {
    const [userOrders, setUserOrders] = useState([])

    useEffect(() => {
        const getOrders = async () => {
            const carpetCollection = collection(db, 'orders')
            const data = await getDocs(carpetCollection)
            const userId = auth.currentUser.uid;
            const orders = data.docs.map((d) => ({ ...d.data() }));
            const filteredOrders = [];

            for (let index = 0; index < orders.length; index++) {

                const el = orders[index];
                delete el.isCompleted;
                if (el.hasOwnProperty(userId)) {

                    filteredOrders.push(el);
                }
            }
            // const filtered = orders.filter(x => x.hasOwnProperty(userId))

            setUserOrders(filteredOrders.map(x => Object.entries(x).map(y => Object.values(y[1]).map((z, index) =>
            ({
                id: Object.keys(y[1])[index],
                ...z
            })))[0]));
        }

        getOrders();
    }, [])

    return (
        // <div className="container" style={{ minHeight: '567px' }}>
        //     <div className="row">
        //         <div className="span5">
        //             <table className="table table-striped table-condensed">
        //                 <thead>
        //                     <tr style={{borderBottom: '1px solid black'}}>
        //                         <th>Product Name</th>
        //                         <th>Type</th>
        //                         <th>Quantity</th>
        //                         <th>Price</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>

        //                     {userOrders.map((order, index) => {
        //                         return <Fragment key={index}>

        //                             {order.map(x => {
        //                                 return <tr style={{border: '1px solid black'}} key={x.id}>
        //                                     <td>{x.name}</td>
        //                                     <td>{x.type}</td>
        //                                     <td>{x.qty}</td>
        //                                     <td>{x.price}</td>
        //                                 </tr>
        //                             })}

        //                             <tr key={index} style={{height: "30px" }}>
        //                             </tr>
        //                         </Fragment>
        //                     })}
        //                 </tbody>
        //             </table>
        //         </div>
        //     </div>
        // </div>
        <div className="container">
            <div className="row">
                <div className="span5">
                    {userOrders.map((order, index) => {
                        return <table key={index} className="table table-striped table-condensed">
                            <thead>
                                <tr>
                                    <th>Product name</th>
                                    <th>Type</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {order.map((x, index) => {
                                        return <tr key={index}>
                                            <td>{x.name}</td>
                                            <td>{x.type}</td>
                                            <td>{x.qty}</td>
                                            <td>{x.price}</td>
                                            <td>
                                                <span className="label label-success">Active</span>
                                            </td>
                                        </tr>
                                    })}
                            </tbody>
                        </table>
                    })}
                </div>
            </div>
        </div>
    );
};
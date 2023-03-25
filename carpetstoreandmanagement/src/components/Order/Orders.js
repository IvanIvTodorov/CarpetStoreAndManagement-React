import { useState, useEffect, Fragment, useContext } from "react"
import { db, auth } from "../../firebase"
import { collection, getDocs, getDoc, doc, setDoc, updateDoc, query, where } from "firebase/firestore"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export const Orders = () => {
    const [orders, setOrders] = useState([])
    const [orderId, setOrdersId] = useState([]);
    const navigate = useNavigate();
    const {isAdmin, isAuth} = useContext(AuthContext);

    useEffect(() => {
        if (isAuth && !isAdmin) {
            navigate('/')
        } else if (!isAdmin || !isAuth) {
            navigate('/login')
        }
    }, []);

    const getOrders = async () => {
        const carpetCollection = query(collection(db, "orders"), where("isCompleted", "==", false));
        const data = await getDocs(carpetCollection)

        const curOrders = data.docs.map((d) => ({ ...d.data() }));

        const filteredOrders = [];
        for (let index = 0; index < curOrders.length; index++) {

            const el = curOrders[index];
            delete el.isCompleted;
            delete el.dateOforder;
            filteredOrders.push(el);
        }


        const mapped = filteredOrders.map(x => Object.entries(x).map(y => Object.values(y[1]).map((z, index) =>
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

    useEffect(() => {
        getOrders()
    }, [])

    const produceItems = async (e, orderId) => {
        e.preventDefault();

        navigate(`/produce/${orderId}`)
    }

    const completeOrder = async (e, orderId) => {
        e.preventDefault();
        const docRef = doc(db, "orders", orderId);
        const document = await getDoc(docRef);

        const filter = document.data();
        delete filter.dateOforder;
        delete filter.isCompleted;
        let arr = [];
        let arrQty = [];
        const products = Object.values(filter).map(x => (Object.values(x).map((z, index) => ({
            ...z, id: Object.keys(x)[index]
        }, arr.push(Object.keys(x)[index]), arrQty.push(z.qty)))));


        let alertMsg = 'You do not have enough pcs from '
        let isAlert = false;
        for (let index = 0; index < arr.length; index++) {
            const curDocRef = doc(db, 'inventory', arr[index])
            const curDoc = await getDoc(curDocRef);

            const carpet = curDoc.data();
            if (!carpet) {
                return alert(alertMsg + arr[index])
            }
            delete carpet.name;
            delete carpet.type;
            const invQty = carpet.qty;


            if (invQty < arrQty[index]) {
                alertMsg = alertMsg + arr[index]
                isAlert = true;
            }

        }

        if (isAlert) {
            alert(alertMsg)
            return;
        } else {
            for (let index = 0; index < arr.length; index++) {
                const docRef = doc(db, 'inventory', arr[index])
                const docToUpdate = await getDoc(docRef);
                const filter = docToUpdate.data();
                delete filter.isCompleted
                delete filter.dateOforder
                delete filter.name
                delete filter.type

                const orderQty = Number(arrQty[index]);
                const newQty = filter.qty - orderQty;

                await updateDoc(docRef, {
                    qty: newQty
                });

            };

            await setDoc(docRef, { isCompleted: true }, { merge: true });
            getOrders()
            return alert('You have successfuly completed this order !')
        }

    }

    if (!orders || orders.length === 0) {
        return <h1 style={{ textAlign: 'center', minHeight: '559px' }}>All orders are completed !</h1>
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
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th />
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => {
                                return <Fragment key={index}>
                                    <tr>
                                        <td>{orderId[index]}</td>
                                        <td>
                                            {orders[index].map((x, index) => {
                                                return <div key={index}>{x.id}</div>
                                            })}
                                        </td>
                                        <td>
                                            {orders[index].map((x, index) => {
                                                return <div key={index}>{x.name}</div>
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
                                            <button onClick={e => completeOrder(e, orderId[index])} className="btn btn-success">Complete order</button>
                                        </td>
                                    </tr>
                                    <tr>
                                    </tr>
                                </Fragment>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const Produce = () => {
    const { orderId } = useParams();
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        const getCarpets = async () => {
            const docRef = doc(db, "orders", orderId);
            const document = await getDoc(docRef);

            setOrderItems(Object.values(document.data()).map(x => (Object.values(x).map((z, index) => ({
                ...z, id: Object.keys(x)[index]
            })))));
        }

        getCarpets();
    }, [])

    const produceItem = async (e, carpetId, qty) => {
        e.preventDefault();
        console.log(carpetId);
        console.log(qty);
        const ref = doc(db, "inventory", carpetId);
        const inventoryCarpet = await getDoc(ref);

        console.log(inventoryCarpet.data());

        if (!inventoryCarpet.data()) {
            console.log('first');
            await setDoc(doc(db, 'inventory', carpetId), {
                qty: Number(qty)
            })
            .catch(err => { console.log(err) })
        }else{
            console.log('second');
            await setDoc(doc(db, 'inventory', carpetId), {
                qty: (Number(Object.values(inventoryCarpet.data())[0]) + Number(qty))
            })
            .catch(err => { console.log(err) })
        }    
    }

    return (
        <div className="container" style={{ minHeight: '567px' }}>
            <div className="row d-flex justify-content-center">
                <div className="col-sm-12 col-md-10 col-md-offset-1">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderItems.map(x => {
                                return <>
                                    {x.map(carpet => {
                                        return <tr key={carpet.id}>
                                            <td className="col-sm-8 col-md-6">
                                                <div className="media justify-content-center">
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
                                                <span>{carpet.qty}</span>
                                            </td>
                                            <td className="col-sm-1 col-md-1">
                                                <button onClick={e => produceItem(e, carpet.id, carpet.qty)} type="button" className="btn btn-success">
                                                    <span className="glyphicon glyphicon-remove" /> Produce
                                                </button>
                                            </td>
                                        </tr>
                                    })}
                                </>
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
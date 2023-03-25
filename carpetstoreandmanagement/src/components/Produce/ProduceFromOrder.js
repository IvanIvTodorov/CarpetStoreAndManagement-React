import { useParams, Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const ProduceFromOrder = () => {
    const { orderId } = useParams();
    const [orderItems, setOrderItems] = useState([]);
    useEffect(() => {
        const getCarpets = async () => {
            const docRef = doc(db, "orders", orderId);
            const document = await getDoc(docRef);

            const filtered = document.data();

            delete filtered.isCompleted
            delete filtered.dateOforder

            setOrderItems(Object.values(filtered).map(x => (Object.values(x).map((z, index) => ({
                ...z, id: Object.keys(x)[index]
            })))));
        }

        getCarpets();
    }, [])

    const produceItem = async (e, carpetId, qty, carpetName, carpetType) => {
        e.preventDefault();

        const yarnRef = doc(db, 'rawMaterials', 'yarn');
        const yarnDocument = await getDoc(yarnRef);
        const weftRef = doc(db, 'rawMaterials', 'weft');
        const weftDocument = await getDoc(weftRef);
        const warpRef = doc(db, 'rawMaterials', 'warp');
        const warpDocument = await getDoc(warpRef);

        let alertMsg = 'You need to buy more ';
        if (Number(qty) > Number(Object.values(yarnDocument.data())[0])) {
            alertMsg = alertMsg + "yarn "

        };

        if (Number(qty) > Number(Object.values(weftDocument.data())[0])) {
            alertMsg = alertMsg + "weft "
        };

        if (Number(qty) > Number(Object.values(warpDocument.data())[0])) {
            alertMsg = alertMsg + "warp "
        };

        if (alertMsg.includes('yarn') || alertMsg.includes('weft') || alertMsg.includes('warp')) {
            alert(alertMsg)
            return;
        }

        const ref = doc(db, "inventory", carpetId);
        const inventoryCarpet = await getDoc(ref);

        if (!inventoryCarpet.data()) {
            await setDoc(doc(db, 'inventory', carpetId), {
                qty: Number(qty),
                name: carpetName,
                type: carpetType
            })
                .catch(err => { console.log(err) })
        } else {
            let curValue = 0;
            for (const key of Object.values(inventoryCarpet.data())) {
                if (Number.isInteger(key)) {
                    curValue = key
                }
            }
            await updateDoc(doc(db, 'inventory', carpetId), {
                qty: curValue + Number(qty),
            })
                .catch(err => { console.log(err) })
        }

        await updateDoc(weftRef, {
            qty: Number(Object.values(weftDocument.data())[0] - Number(qty))
        });

        await updateDoc(yarnRef, {
            qty: Number(Object.values(yarnDocument.data())[0] - Number(qty))
        });

        await updateDoc(warpRef, {
            qty: Number(Object.values(warpDocument.data())[0] - Number(qty))
        });

        return alert(`You hace successfully produced ${qty} pcs of ${carpetName}`)
    }

    return (
        <div className="container" style={{ minHeight: '567px' }}>
            <div className="row d-flex justify-content-center">
                <div className="col-sm-12 col-md-10 col-md-offset-1">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderItems.map((x, index) => {
                                return <Fragment key={index}>
                                    {x.map((carpet, index) => {
                                        return <tr key={index}>
                                            <td className="col-sm-1 col-md-1">
                                                <div className="media justify-content-center">
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
                                            <td className="col-sm-8 col-md-6">{carpet.name}</td>
                                            <td className="col-sm-1 col-md-1" style={{ textAlign: "center" }}>
                                                <span>{carpet.qty}</span>
                                            </td>
                                            <td className="col-sm-1 col-md-1">
                                                <button onClick={e => produceItem(e, carpet.id, carpet.qty, carpet.name, carpet.type)} type="button" className="btn btn-success">
                                                    <span className="glyphicon glyphicon-remove" /> Produce
                                                </button>
                                            </td>
                                        </tr>
                                    })}
                                </Fragment>
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
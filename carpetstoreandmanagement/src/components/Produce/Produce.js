import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

export const Produce = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getCarpets = async () => {
            const docRef = collection(db, "carpet");
            const document = await getDocs(docRef);

            setItems(document.docs.map((doc) => ({ ...doc.data(), id: doc.id, qty: 1 })));
        }

        getCarpets();
    }, [])

    const produceItem = async (e, carpetId, qty) => {
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
                qty: Number(qty)
            })
                .catch(err => { console.log(err) })
        } else {
            await setDoc(doc(db, 'inventory', carpetId), {
                qty: (Number(Object.values(inventoryCarpet.data())[0]) + Number(qty))
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
    }

    const increaseAmount = async (value, carpetId) => {
        if (value.target.value <= 0) {
            alert("The qty must be higher than 0 !!!")
            value.target.value = 1;
        }

        const currentItems = items.map(y => {
            if (y.id === carpetId) {
                return {
                    id: y.id,
                    qty: value.target.value,
                    price: y.price,
                    imgUrl: y.imgUrl,
                    type: y.type
                }
            }

            return y
        });

        await setItems(currentItems)
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
                            {items.map((carpet, index) => {
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
                                    <td className="col-sm-8 col-md-6" >{carpet.name}</td>
                                    <td className="col-sm-1 col-md-1" style={{ textAlign: "center" }}>
                                        <input
                                            type="number"
                                            className="form-control text-center"
                                            defaultValue={1}
                                            min={1}
                                            onChange={value => increaseAmount(value, carpet.id)}
                                        />
                                    </td>
                                    <td className="col-sm-1 col-md-1">
                                        <button onClick={e => produceItem(e, carpet.id, carpet.qty)} type="button" className="btn btn-success">
                                            <span className="glyphicon glyphicon-remove" /> Produce
                                        </button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
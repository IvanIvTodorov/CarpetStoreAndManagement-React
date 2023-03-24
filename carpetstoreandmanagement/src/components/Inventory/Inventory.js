import { Fragment, useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

export const Inventory = () => {
    const [carpets, setCarpets] = useState([]);
    const [rawMaterials, setRawMaterials] = useState([]);

    useEffect(() => {
        const getCarpets = async () => {
            const invRef = collection(db, "inventory");
            const document = await getDocs(invRef);

            const rawRef = collection(db, "rawMaterials");
            const rawDoc = await getDocs(rawRef);

            setRawMaterials(rawDoc.docs.map((doc) => ({ ...doc.data(), type: doc.id })))
            setCarpets(document.docs.map((doc) => ({ ...doc.data() })));

        }

        getCarpets();
    }, [])

    return (
        <Fragment>
            <div className="container" style={{ minHeight: '332px' }}>
                <h1 style={{ textAlign: 'center' }}>Products</h1>

                <div className="row">
                    <div className="span5 d-flex justify-content-center">
                        <table className="table table-striped table-condensed" style={{width: '70%'}}>
                            <thead>
                                <tr>
                                    <th>Product name</th>
                                    <th>Type</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carpets.map((x, index) => {
                                    return <tr key={index}>
                                        <td>{x.name}</td>
                                        <td className="col-sm-5 col-md-5">{x.qty}</td>
                                        <td className="col-sm-1 col-md-1">{x.qty}</td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <h1 style={{ textAlign: 'center' }}>Raw materials</h1>
            <div className="container">
                <div className="row">
                <div className="span5 d-flex justify-content-center">
                        <table className="table table-striped table-condensed" style={{width: '70%'}}>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rawMaterials.map((x, index) => {
                                    return <tr key={index}>
                                        <td>{x.type}</td>
                                        <td className="col-sm-1 col-md-1">{x.qty}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};
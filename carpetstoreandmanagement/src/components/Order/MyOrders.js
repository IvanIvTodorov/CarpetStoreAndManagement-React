

export const MyOrders = () => {
    return (
        <div className="container" style={{ minHeight: '567px' }}>
            <div className="row">
                <div className="span5">
                    <table className="table table-striped table-condensed">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Total price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Donna R. Folse</td>
                                <td>2012/05/06</td>
                                <td>Editor</td>
                                <td>Editor</td>                   
                                <td>
                                    <span className="label label-success">Active</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
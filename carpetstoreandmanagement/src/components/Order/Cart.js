

export const Cart = () => {
    return (
        <div className="container" style={{ minHeight: '567px' }}>
            <div className="row d-flex justify-content-center">
                <div className="col-sm-12 col-md-10 col-md-offset-1">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th className="text-center">Price</th>
                                <th className="text-center">Total</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="col-sm-8 col-md-6">
                                    <div className="media">
                                        <a className="thumbnail pull-left" href="#">
                                            {" "}
                                            <img
                                                className="media-object"
                                                src="https://www.shutterstock.com/image-vector/persian-carpet-tribal-vector-texture-260nw-1187898280.jpg"
                                                style={{ width: 72, height: 72 }}
                                            />{" "}
                                        </a>
                                    </div>
                                </td>
                                <td className="col-sm-1 col-md-1" style={{ textAlign: "center" }}>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        defaultValue={3}
                                    />
                                </td>
                                <td className="col-sm-1 col-md-1 text-center">
                                    <strong>$4.87</strong>
                                </td>
                                <td className="col-sm-1 col-md-1 text-center">
                                    <strong>$14.61</strong>
                                </td>
                                <td className="col-sm-1 col-md-1">
                                    <button type="button" className="btn btn-danger">
                                        <span className="glyphicon glyphicon-remove" /> Remove
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="col-sm-8 col-md-6">
                                    <div className="media">
                                        <a className="thumbnail pull-left" href="#">
                                            {" "}
                                            <img
                                                className="media-object"
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgYSj-PO6fZ3tXUnpJc71-7JNiy7AZZ2tXLJEQV9OvWaPPWHcNkn6cmJARuzUgItKcu0M&usqp=CAU"
                                                style={{ width: 72, height: 72 }}
                                            />{" "}
                                        </a>
                                    </div>
                                </td>
                                <td className="col-sm-1 col-md-1" style={{ textAlign: "center" }}>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        defaultValue={3}
                                    />
                                </td>
                                <td className="col-sm-1 col-md-1 text-center">
                                    <strong>$4.87</strong>
                                </td>
                                <td className="col-sm-1 col-md-1 text-center">
                                    <strong>$14.61</strong>
                                </td>
                                <td className="col-sm-1 col-md-1">
                                    <button type="button" className="btn btn-danger">
                                        <span className="glyphicon glyphicon-remove" /> Remove
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td> &nbsp; </td>
                                <td> &nbsp; </td>
                                <td>
                                    <h3>Total:</h3>
                                </td>
                                <td className="text-right">
                                    <h3>
                                        <strong>$31.53</strong>
                                    </h3>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-success">
                                        Checkout <span className="glyphicon glyphicon-play" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
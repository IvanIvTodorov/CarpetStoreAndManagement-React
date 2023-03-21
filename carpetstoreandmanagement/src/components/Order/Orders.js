export const Orders = ({userProducts}) => {
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
                                {userProducts.map((carpet) => {
                                    return <tr key={carpet.id}>
                                        <td className="col-sm-1 col-md-1">
                                            <div className="media">
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
                                        <td className="col-sm-8 col-md-6"><span>{carpet.name}</span></td>
                                        <td className="col-sm-1 col-md-1" style={{ textAlign: "center" }}>
                                            <input
                                                type="number"
                                                className="form-control"
                                                defaultValue={carpet.qty}
                                            />
                                        </td>
                                        <td className="col-sm-1 col-md-1 text-center">
                                            <strong>${carpet.price}</strong>
                                        </td>
                                        <td className="col-sm-1 col-md-1 text-center">
                                            <strong>$12</strong>
                                        </td>
                                        <td className="col-sm-1 col-md-1">
                                            <button  type="button" className="btn btn-danger">
                                                <span className="glyphicon glyphicon-remove" /> Remove
                                            </button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    )
}
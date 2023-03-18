import style from './Inventory.Module.css'

export const Inventory = () => {
    return (
        <div className="container" style={{ minHeight: '567px' }}>
            <div className="container">
                <div className="row">
                    <div className="span12">
                        <form
                            id="custom-search-form"
                            className="form-search form-horizontal pull-right"
                        >
                            <div className="input-append span12">
                                <input type="text" className="search-query" placeholder="Search" />
                                <button type="submit" className="btn">
                                    <i className="icon-search" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="span5">
                    <table className="table table-striped table-condensed">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Type</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Donna R. Folse</td>
                                <td>2012/05/06</td>
                                <td>Editor</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
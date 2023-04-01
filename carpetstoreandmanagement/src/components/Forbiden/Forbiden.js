import { Fragment } from 'react'
import style from './Forbiden.Module.css'

export const Forbiden = () => {
    return (
        <div style={{ minHeight: '551px'}}>
            <title>Access Denied</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta charSet="UTF-8" />
            <link rel="stylesheet" href="style.css" />
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
            <div className="w3-display-middle">
                <h1 className="w3-jumbo w3-animate-top w3-center">
                    <code>Access Denied</code>
                </h1>
                <hr
                    className="w3-border-white w3-animate-left"
                    style={{ margin: "auto", width: "50%" }}
                />
                <h3 className="w3-center w3-animate-right">
                    You dont have permission to view this page.
                </h3>
                <h3 className="w3-center w3-animate-zoom">🚫🚫🚫🚫</h3>
            </div>
        </div>
    )
}
import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <div className="text-center h2">
            <Spinner animation="border" style={{ fontSize: "20px", marginTop: "300px" }} role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            <h3 style={{ marginTop: "30px" }}>Loading...</h3>
        </div>
    )
}

export default Loader

import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { url } from '../../GlobalUrl'


const ClientModal = ({ show, handleClose }) => {
    const [clientName, setClientName] = useState("")
console.log(clientName)

    const addClient = async () => {
        const { data } = await axios.post(`${url}/api/curd-project/`, {
            "project_name": clientName
        }, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        window.location.reload()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Change Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter Change  Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter change name"
                        value={clientName} onChange={(e) => setClientName(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={addClient}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ClientModal

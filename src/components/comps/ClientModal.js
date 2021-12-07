import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { url } from '../../GlobalUrl'
import CommonModal1 from "../CommonModal/CommanModel1"

const ClientModal = ({ show, handleClose, fetchClients,props }) => {
    const [clientName, setClientName] = useState('')
    const [msg, setMsg] = useState("")
    const [message,setMessage]=useState('')
    const [commonModal1, setCommonModal1] = useState(false)
    const commonToggle1 = () => setCommonModal1(!commonModal1)
    function sendData() {

        var err = false;
        if ( clientName == '') {
    
          setMessage("Please Enter Client  Name ")
          setCommonModal1(true)
          err=true
        } 
      if(!err) {
          addClient()
         // props.toggle()
        }
      }
    

    
    const addClient = async () => {
        const { data } = await axios.post(`${url}/api/curd-project/`, {
            "project_name": clientName
        }, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        handleClose()
        fetchClients()
        window.location.reload()
       ///  window.location.goBack()
    }

    return (
        <div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Client</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Client Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter client name"
                        value={clientName} onChange={(e) => setClientName(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={sendData}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
        <CommonModal1 modal={commonModal1} toggle={commonToggle1} message={message} />
        </div>
    )
}

export default ClientModal

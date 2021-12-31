import React from "react";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";

const CommonModal = (props) => {
    const check = (e)=>{
        console.log(e.key);
      }
    return (
        <Modal   isOpen={props.modal} toggle={props.toggle} backdrop={"static"}>
            
            <ModalBody>
                {props.msg}
            </ModalBody>
            {/* <ModalFooter style={{ padding: '4px 15px' }}> */}
                {/* <Button color="primary" onClick={() => props.toggle()}>
                    Ok
                </Button> */}
             <Button style={{display:'flex',justifyContent:'flex-end',width:'45px',marginLeft:'435px',marginTop:'20px',marginBottom:'10px'}} color="primary" onClick={() => props.toggle()}>
                    Ok
                </Button>
                {
                    props.additional &&
                    <Button  color="primary" onClick={() => props.additional()}>
                        Cancel
                    </Button>
                }
            {/* </ModalFooter> */}
            
        </Modal>)
}

export default CommonModal;
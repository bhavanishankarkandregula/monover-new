import { Component } from 'react';
import Backdrop from './Backdrop/Backdrop';
import Sidepanel from './Sidepanel';


class Modal extends Component{
    render(){
        return(
            <div>
                <Backdrop/>
                <Sidepanel/>
            </div>

        )
    }
}

export default Modal;
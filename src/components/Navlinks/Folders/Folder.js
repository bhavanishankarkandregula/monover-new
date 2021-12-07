import { Component } from "react";
import Top from "../../Top";
import classes from '../Projects.module.css';
import Add from '../../Add';
import ScreenTop from "../../mobileComp/ScreenTop";
//import FolderComponents from "./folderComponents";
// import Docs from "../../../docs/docs";

class Folders extends Component{
    render(){
        return(
            <div className = "main">
                <ScreenTop/>
                 <Top/>
                 <div>    
                    <div className = {classes.middle}>
                        <h3>Projects</h3>
                            <select className = {classes.dropdown}>
                                <option value = "0">This Week</option>
                            </select>
                    </div>
                        {/* <FolderComponents/> */}
                        <Add/>
                </div>
            </div>
        )
    }
}

export default Folders;
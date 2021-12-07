import {Component} from 'react';
import menu from '../images/Menu.png';
import classes from './Navlinks/Projects.module.css';
import Slider from './Slider/Slider';

class MenuIcon extends Component{
    state = {
        open: false
    }
    toggleDrawer = () =>{
        this.setState({open: false})
    }
    render(){
        // console.log(this.state.open);
        return(
            <div className = {classes.menuIcon} >
               <img src = {menu} alt = "menu" onClick = {() =>this.setState({open: !this.state.open})} style={{position:"relative", height: 'auto', width: 'auto'}} />
              <Slider open = {this.state.open} close = {this.toggleDrawer}/>
            </div>
        )
    }
}

export default MenuIcon;
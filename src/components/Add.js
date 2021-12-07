import { Component } from "react";
import classes from "./Navlinks/Projects.module.css";
import plus from "../images/plus.png";

class Add extends Component {
  state = {
    rotate: false,
  };

  

  render() {
    return (
      <>
        {/* <button
          className={classes.button}
          onClick={() => this.setState({ rotate: !this.state.rotate })}
        >
          <img
            src={plus}
            alt="plus"
            className={this.state.rotate ? classes.rotate : ""}
          />
        </button> */}

        <div
          className={classes.fabContainer}
          onClick={() => this.setState({ rotate: !this.state.rotate })}
        >
          <div className={classes.fab}>
            <div className={classes.fabIconHolder}>
              <i className="fa fa-plus"></i>
            </div>
          </div>
          <ul className={classes.fabOptions}>
            <li>
              <span className={classes.fabLabel}>Add Document</span>
              <div className={classes.fabIconHolder} onClick={this.props.docToggle}>
                <i className="fa fa-file"></i>
              </div>
            </li>
            <li>
              <span className={classes.fabLabel}>Add Sub Project</span>
              <div className={classes.fabIconHolder} onClick={this.props.subProjectToggle}>
                <i className="fa fa-folder-open"></i>
              </div>
            </li>
            <li>
              <span className={classes.fabLabel}>Add Project</span>
              <div className={classes.fabIconHolder} onClick={this.props.projectToggle}>
                <i className="fa fa-folder"></i>
              </div>
            </li>
          </ul>
        </div>

        {/* {this.state.rotate === false && 
        <div>

        <button
        className={classes.button2}
        // onClick={() => this.setState({ rotate: !this.state.rotate })}
        >
        <img
          src={plus}
          alt="plus"
          className={this.state.rotate ? classes.rotate : ""}
          />
      </button>
        <button
        className={classes.button3}
        // onClick={() => this.setState({ rotate: !this.state.rotate })}
        >
        <img
          src={plus}
          alt="plus"
          className={this.state.rotate ? classes.rotate : ""}
          />
      </button>
        <button
        className={classes.button4}
        // onClick={() => this.setState({ rotate: !this.state.rotate })}
        >
        <img
          src={plus}
          alt="plus"
          className={this.state.rotate ? classes.rotate : ""}
          />
      </button>
          </div>
        
      } */}
      </>
    );
  }
}

export default Add;

//onClick={() => this.setState({ rotate: !this.state.rotate })

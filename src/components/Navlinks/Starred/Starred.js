import { Component } from "react";
import Top from "../../Top";
import classes from '../Projects.module.css';
import Docs from '../../../docs/docs';
import Add from "../../Add";
import ScreenTop from "../../mobileComp/ScreenTop";
import axios from "axios";
import {url} from "../../../GlobalUrl"
import DocumentSlider from "../../CreateDocument/DocumentSlider";
import subProjectIcon from "../../../images/projects.png";
import { Row } from "reactstrap";

class Starred extends Component{

    state = {
        docs: [],
        subProjects: [],
        ActiveSubProjectId:'',
        subProjectId:'',
        subProjectName:'',
        subDoc:[],
        select: '',
    }

    componentDidMount(){
        const token = localStorage.getItem("token");
        if(localStorage.getItem('orgId')){
            const getStarred = async() =>{
                await axios.get(`${url}/api/starred/?organisation_id=${localStorage.getItem('orgId')}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                      },
                }) .then((res) =>{
                    console.log(res.data);
                    this.setState({docs: res.data.documents,subProjects: res.data.subprojects})
                })
                .catch((e)=>{
                    alert(e.message)
                })
             }
             getStarred()
        }else{
            alert('please select an organisation!')
        }
        
    }


    async  documentListApi(id) {
        //setLoading(true);
        const token = localStorage.getItem("token");
          await axios
            .get(url + `/api/subproject/${id}/document/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              this.setState({subDoc:res.data});
            //  setLoading(false);
            })
            .catch((err) => {
              console.log("DOC", err);
              //setLoading(false);
            });
      }


    render(){
        return(
            <div className = "main">
                <ScreenTop/>
                 <Top/>
                 <div>    
                    <div className = {classes.middle}>
                            <h3>Starred</h3>
                            {/* <select className = {classes.dropdown}>
                                <option value = "0">This Week</option>
                            </select> */}
                        </div>
                        <div className="container">
                            <>
                            <h5 style={{marginLeft:"-1rem"}}>Documents</h5>
                            {this.state.subProjects !== undefined && this.state.docs.length > 0 && <DocumentSlider documents = {this.state.docs}/>}
                            </>
                            <div  style = {{marginTop: '5rem',marginLeft:"-1rem"}}>
                                <h5>Sub-Projects</h5>
                                {/* <button>
                                <span>Remove</span>
                            </button> */}
                            <Row>
                                {
                                    this.state.subProjects !== undefined && this.state.subProjects.length > 0 && this.state.subProjects.map((subProject)=>(
                                        <div
                          className="col-sm-2 mx-3 my-2 add subproject-card"
                          key={subProject.id}
                          style={{
                            boxShadow:
                              this.state.ActiveSubProjectId === subProject.id
                                ? "1px 0px 18px -5px rgba(0,0,0,0.75)"
                                : "",
                            fontWeight: "500",
                            // border:
                            //   ActiveSubProjectId === subProject.id
                            //     ? "1px solid #b3b3b3"
                            //     : "",
                            // //border: "1px solid #cccccc",
                            // margin: "1%",
                            // marginBottom: "0%",
                            // cursor: "pointer",
                            // whiteSpace: "nowrap",
                            // borderRadius: "30px",
                            // height: "162px",
                            // width: "162px",
                            // overflow: "hidden",
                            // minWidth: "162px",
                            // maxWidth: "162px",
                            // minHeight: "162px",
                            // maxHeight: "162px",
                            // textOverflow: "ellipsis",
                            // textAlign: "center",
                            // padding: "1%",
                            // //color :  (ActiveSubProjectId === subProject.id) ? "#D6FFFF" : "#6C8B89",
                            // color: "#6C8B89",
                            // backgroundColor: "#E7F5F5",

                            // //backgroundColor: (ActiveSubProjectId === subProject.id) ? "#0080FF" : "#E7F5F5",
                          }}

                        //   onClick = {() =>{
                        //       this.setState({select: subProject.id})
                        //   }}
                          onClick={() => {
                            this.setState({subProjectId: subProject.id,
                                ActiveSubProjectId:subProject.id,
                                select: subProject.id,
                                subProjectName:subProject.sub_project_name,
                            });
                             this.documentListApi(subProject.id);   
                        }}
                        >
                          <br />
                          {/* <img
                            src={subProjectIcon}
                            alt="subproject"
                            style={{
                              opacity: "0.5",
                              height: "36.7px",
                              width: "36.7px",
                            }}
                          /> */}
                          <i className="fa fa-folder-open" style={{fontSize:"3rem"}}></i>
                          <p
                            style={{
                              fontSize: "1.2rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {subProject.sub_project_name}
                          </p>
                        </div>
                                    ))
                                }
                                </Row>
                            </div>
                        </div> 
                        <br />
                        <>
                        {this.state.subDoc.length > 0 && <h5> {this.state.subProjectName} Document's({this.state.subDoc.length}) </h5>}
                        {this.state.subProjects !== undefined && this.state.subDoc.length > 0 && <DocumentSlider documents = {this.state.subDoc}/>}   
                        </>
                        {/* <Docs/> */}
                        {/* <Add/> */}
                    </div>
            </div>
           
        )
    }
}

export default Starred;
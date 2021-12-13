import { Component } from "react"
import "../App.css"
import Projects from "./Navlinks/Projects/Projects"
import DragAndDrop from "./DragAndDrop/DragDropFunctionality"
import DisplayDocuments from "./DragAndDrop/DisplayDocuments"
//import docs from "../docs/docs";
import Sidepanel from "./Sidepanel"
import { Route, Switch, withRouter, Redirect } from "react-router-dom"
import Starred from "./Navlinks/Starred/Starred"
import Folders from "./Navlinks/Folders/Folder"
import Members from "./Navlinks/Members/Members"
import { connect } from "react-redux"
import * as actions from "../store/actions/active"
import Profile from "./Profile/Profile"
import ChangePassword from "./Profile/ChangePassword"
import SubFolder from "./Navlinks/Folders/SubFolder"
import RegistrationForm from "./Registration/RegistrationForm"
import ProductList from "./ProductList"
import LoginForm from "./Registration/LoginForm"
import ForgetPasswordOne from "./Registration/ForgetPasswordOne"
import ForgetPasswordTwo from "./Registration/ForgetPasswordTwo"
import ForgetPasswordThree from "./Registration/ForgetPaswordThree"
import SubProjects from "./CreateDocument/SubProjects"
import DocumentList from "./CreateDocument/DocumentList"
import DocumentDetails from "./CreateDocument/DocumentDetails"
import OrganisationPage from "./Organisation/OrganisationPage"
import LandingPage from "./LandingPage/LandingPage"
import EmailVerification from "./EmailVerification"
import EmailVerificationFailed from "./EmailVerificationFailed"
import Review from "./Review"
import Excel from "./Excel"
import Excel2 from "./Excel2"
import SharedWithMe from "./SharedWithMe"
import Products from "./Products/Products"
import AnnotateImage from "./CreateDocument/AnnotateImage"
import UseAsTemplateImage from "./CreateDocument/UseAsTemplateImage"
import UseAsTemplateImage2 from "./CreateDocument/UseAsTemplateImage"
import Catalogue from "./Catalogue"
import ReviewNew from './ReviewNew'
import Deals from './Deals'
import AllDeals from "./AllDeals"
import AllDealsTwo from "./AllDealsTwo"
class Home extends Component {
  state = {
    clicked: false,
    orgName: localStorage["orgName"]
  }
  // orgName = 'sdd';
  setOrg = () => {
    console.log("changing")
    // this.state.orgName = localStorage["orgName"];
    this.setState({ orgName: localStorage["orgName"] })
    console.log(this.orgName)
  }
  handleClick = () => {
    this.setState((prev) => {
      return {
        clicked: !prev.clicked
      }
    })
  }

  render() {
    // alert("Org Name :"+localStorage["orgName"])
    const pathname = this.props.history.location.pathname
    const lastRoute = pathname.split("/").reverse()[0]
    if (pathname.includes('document-details')) {
      document.title = `Monover | ` + 'Document details | ' + lastRoute
    } else {
      document.title = `Monover | ` + lastRoute
    }
    this.props.active(this.props.history.location.pathname)
    let routes = (
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/starred" component={Starred} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/folders" component={Folders} />
        <Route exact path="/members" component={Members} />
        <Route exact path="/sub-projects" component={SubProjects} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/change-password" component={ChangePassword} />
        <Route exact path="/SubFolder" component={SubFolder} />
        <Route exact path="/review" component={Review} />
        <Route path='/deals/:id' component={Deals} />
        <Route path='/alldealstwo/:projectId' component={AllDealsTwo} />
        <Route exact path="/catalogue" component={Catalogue} />

        <Route exact path="/login-form" component={LoginForm} />

        {/* <Route exact path="/registration-form" component={RegistrationForm} /> */}
        <Route exact path="/emailverification" component={EmailVerification} />
        <Route
          exact
          path="/emailverificationfailed"
          component={EmailVerificationFailed}
        />
        <Route exact path="/forget-password" component={ForgetPasswordOne} />
        <Route exact path="/otp" component={ForgetPasswordTwo} />
        <Route exact path="/new-password" component={ForgetPasswordThree} />
        <Route exact path="/document-list" component={DocumentList} />
        <Route path='/annotate-doc/:id' component={AnnotateImage} />
        <Route path='/useastemplate-doc/:id' component={UseAsTemplateImage} />
        <Route exact path="/useastemplateimage2/:id"component={UseAsTemplateImage2}/>
        <Route path='/alldeals/:id' component={AllDeals} />
        <Route
          exact
          path="/document-details/:document_id/(shared)?/:shared?"
          component={DocumentDetails}
        />

<Route path='/productlist/:id' component={ProductList} />



        <Route
          exact
          path="/Organisation"
          title
          component={() => <OrganisationPage setOrg={this.setOrg} />}
        />
        <Route exact path="/home" component={LandingPage} default />
        <Route exact path="/DragAndDrop" component={DragAndDrop} />
        <Route exact path="/DisplayDocuments" component={DisplayDocuments} />
        <Route path='/SharedWithMe' component={SharedWithMe} />
        <Route path='/Products' component={Products} />
        <Route path='/new-review' component={ReviewNew} />
        <Route path='/registration-form' component={RegistrationForm} />
        <Route
          exact
          path="/folder/:sub_project_id/:sub_project_name"
          component={Excel}
        />
        <Route
          exact
          path="/subproject/:sub_project_id/:sub_project_name/excel"
          component={Excel2}
        />
        {console.log("LOOOOOOOOOOOOOOOOOCAL STORAGEee: ",this.state.orgName)}
        {this.state.orgName ? (
          <Redirect to="/review" /> 
        ) : (
          <Route exact path="/home" component={LandingPage} />
        )}

        {/* {localStorage["orgName"] ? (
          <Redirect to="/review" />
        ) : (
          <Route exact path="/home" component={LandingPage} />
        )} */}

        <Redirect to="/" />
      </Switch>
    )

    if(localStorage["orgName"]){
      routes = (
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/starred" component={Starred} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/folders" component={Folders} />
          <Route exact path="/members" component={Members} />
          <Route exact path="/sub-projects" component={SubProjects} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/change-password" component={ChangePassword} />
          <Route exact path="/SubFolder" component={SubFolder} />
          <Route exact path="/review" component={Review} />
          <Route path='/deals/:id' component={Deals} />
          <Route path='/alldealstwo/:projectId' component={AllDealsTwo} />
          <Route exact path="/catalogue" component={Catalogue} />
  
          {/* <Route exact path="/login-form" component={LoginForm} /> */}
  
          {/* <Route exact path="/registration-form" component={RegistrationForm} /> */}
          <Route exact path="/emailverification" component={EmailVerification} />
          <Route
            exact
            path="/emailverificationfailed"
            component={EmailVerificationFailed}
          />
          <Route exact path="/forget-password" component={ForgetPasswordOne} />
          <Route exact path="/otp" component={ForgetPasswordTwo} />
          <Route exact path="/new-password" component={ForgetPasswordThree} />
          <Route exact path="/document-list" component={DocumentList} />
          <Route path='/annotate-doc/:id' component={AnnotateImage} />
          <Route path='/useastemplate-doc/:id' component={UseAsTemplateImage} />
          <Route exact path="/useastemplateimage2/:id"component={UseAsTemplateImage2}/>
          <Route path='/alldeals/:id' component={AllDeals} />
          <Route
            exact
            path="/document-details/:document_id/(shared)?/:shared?"
            component={DocumentDetails}
          />
  
  <Route path='/productlist/:id' component={ProductList} />
  
  
  
          <Route
            exact
            path="/Organisation"
            title
            component={() => <OrganisationPage setOrg={this.setOrg} />}
          />
          {/* <Route exact path="/home" component={LandingPage} default /> */}
          <Route exact path="/DragAndDrop" component={DragAndDrop} />
          <Route exact path="/DisplayDocuments" component={DisplayDocuments} />
          <Route path='/SharedWithMe' component={SharedWithMe} />
          <Route path='/Products' component={Products} />
          <Route path='/new-review' component={ReviewNew} />
          {/* <Route path='/registration-form' component={RegistrationForm} /> */}
          <Route
            exact
            path="/folder/:sub_project_id/:sub_project_name"
            component={Excel}
          />
          <Route
            exact
            path="/subproject/:sub_project_id/:sub_project_name/excel"
            component={Excel2}
          />
          
            <Redirect to="/review" /> 
         
          {/* {localStorage["orgName"] ? (
            <Redirect to="/review" />
          ) : (
            <Route exact path="/home" component={LandingPage} />
          )} */}
  
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div className="home">
        {/* <Sidepanel
          clicked={this.state.clicked}
          orgName={this.state.orgName}
          organizationName={this.props.organizationName}
        /> */}
        {routes}
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    active: (link) => dispatch(actions.setActive(link))
  }
}
export default withRouter(connect(null, mapDispatchToProps)(Home))

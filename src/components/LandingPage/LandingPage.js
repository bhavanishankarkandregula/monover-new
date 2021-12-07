import React from "react";
import "./LandingPag.css";
import works from "../../images/landing/works.png";
import dot from "../../images/landing/dot.jpg";
import image1 from "../../images/landing/image 1.png";
import image2 from "../../images/landing/image 2.png";
import image3 from "../../images/landing/image 3.png";
import image4 from "../../images/landing/image 4.png";
import image5 from "../../images/landing/image 5.png";
import rect17 from "../../images/landing/rect17.png";
import rect19 from "../../images/landing/rect19.png";
import ready from "../../images/landing/ready.jpg";
import mainImg from "../../images/landing/mainImg.png";
import { useHistory } from "react-router-dom";

const LandingPage = () => {
  var history = useHistory();
  return (
    <div className="page">
      <div className="part1">
        <div className="rect1">
          <div style={{ display: "flex" }}>
            <div className="monover">monover</div>
          </div>
        </div>
        <div className="rect2">
          <div className="inner2">
            <div className="logIn">
              <button
                style={{
                  marginRight: "15px",
                  cursor: "pointer",
                }}
                onClick={() => history.push("/login-form")}
              >
                Log In
              </button>
              <button onClick={() => history.push("/registration-form")}>
                Sign up
              </button>
            </div>
            <div className="mainText">
              <span className="heading">
              With Presto, task automation is as easy as making your coffee.
                <p>

Step back and let the monkeys work for you. </p>
                <div>
                  <button
                    className="startButton"
                    style={{ marginRight: "15px" }}
                    onClick={() => history.push("/registration-form")}
                  >
                    Get Started
                  </button>
                  <button className="contactUsButton">Learn more</button>
                </div>
              </span>
              <img src={mainImg} alt="main" />
            </div>
          </div>
        </div>
        <div className="companies">
          <h1>
            

Whether it’s hundreds of medical appointment forms, accounting sheets or application forms,
          </h1>
          <p>
          You no longer have to waste all of your time and money on such a simple task.
          </p>
          <p>Turn your physical forms into useful information. Automatically.</p>
          <p>Save your time for when it matters.</p>
        </div>
      </div>
      <div className="part2">
        <div className="works">
          <div className="textWorks">
            <h1>How it Works</h1>
            <p>
              <br></br>
              Step 1: Upload your documents
              <br></br>
              <br></br>
              <span style={{ marginTop: "10px" }}>
                Step 2: Access your data
              </span>
              <br></br>
              <span>It’s that easy </span>
              <br></br>
              <br></br>
              {/* <span>Let Presto eliminate the mundane from your life.</span>
              <br></br>
              <span>Return to the bigger picture? Automate today!</span>
              <br></br>
              <span>Automate the mindless aspects of your work.</span>
              <br></br>
              <span>Turn(ing) your sheets/pages/forms/papers into data.</span> */}
            </p>
            <br></br>
            <h2>
              <span>Let Presto eliminate the mundane from your life.</span>
            </h2>
            <p>
              <br></br>
              <span style={{ marginTop: "20px" }}>Return to the bigger picture.</span>
              <br></br>
              <br></br>
              <span style={{ marginTop: "20px" }}>
              Automate the mindless.
              </span>
              <br></br>
              {/* <br></br>
              <span style={{ marginTop: "20px" }}>
                Turn(ing) your sheets/pages/forms/papers into data.
              </span> */}
            </p>
            <button>
              <span>Explore our platform</span>
            </button>
          </div>
          <div>
            <img src={works} alt="works" />
          </div>
        </div>
      </div>
      <div className="part3">
        <div className="pricing">
          <h1>Pricing</h1>
          <div className="priceClass">
            <div className="priceBox1">
              <h1>Essential</h1>
              <div className="para" style={{ backgroundColor: "white" }}>
                <span>
                  <span className="free">Free</span>/10files
                </span>
                <div style={{ marginTop: "30px", marginBottom: "30px" }}>
                  <p>
                    <img src={dot} alt="dot" />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <p>
                    <img src={dot} alt="dot" />
                    Lorem , consectetur adipiscing elit.
                  </p>
                  <p>
                    <img src={dot} alt="dot" />
                    Lorem ipsum dolor sit amet, consectetur .
                  </p>
                  <p>
                    <img src={dot} alt="dot" />
                    Lorem ipsum dolor sit amet.
                  </p>
                </div>
                <button>
                  <span>Create Account</span>
                </button>
              </div>
            </div>
            <div className="priceBox2">
              <h1>Essential</h1>
              <div className="para">
                {/* <span><span className='free'>Free</span>/10files</span> */}
                <div style={{ marginTop: "30px", marginBottom: "30px" }}>
                  <p style={{ display: "flex" }}>
                    <div className="dot" />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <p style={{ display: "flex" }}>
                    <div className="dot" />
                    Lorem , consectetur adipiscing elit.
                  </p>
                  <p style={{ display: "flex" }}>
                    <div className="dot" />
                    Lorem ipsum dolor sit amet, consectetur .
                  </p>
                  <p style={{ display: "flex" }}>
                    <div className="dot" />
                    Lorem ipsum dolor sit amet.
                  </p>
                </div>
                <button>
                  <span>Contact Sales</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="part4">
        <p>Join the companies that use our platform</p>
        <div className="imageBox">
          <img src={image1} alt="IBM" />
          <img src={image2} alt="walmart" />
          <img src={image3} alt="nasa" />
          <img src={image4} alt="generale" />
          <img src={image5} alt="hero" />
        </div>
      </div>
      <img src={ready} alt="rect" className="ready" />
      <div className="imagetext">
        <h1>Ready to get started?</h1>
        <h1>Get in touch or create an account</h1>

        <div>
          <button className="startButton" style={{ marginRight: "15px" }}>
            Get Started
          </button>
          <button className="contactUsButton">Contact Us</button>
        </div>
      </div>
      <img src={rect17} alt="rect" className="rectimg" />
      {/* <img src = {rect19} alt = 'rect' className='rect19'/> */}
      <footer>
        <hr />
      </footer>
    </div>
    // <div>
    //   <div className="rectangle1">
    //     <div className="rectangle2">

    //     </div>
    //   </div>
    // </div>
  );
};

export default LandingPage;

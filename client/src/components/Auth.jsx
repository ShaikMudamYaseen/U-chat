import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import FormData from 'form-data'


import signinImage from "../assets/social.png";
// import * as React from 'react';
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const cookies = new Cookies();

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
  email: "",
};
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

const Auth = ({signup}) => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(signup);
  const [open, setOpen] = React.useState(false);
  const [resmessage, setResmessage] = useState();
  const [resStatus, setResStatus] = useState();
  // var resmessage;
  const [image, setImage] = useState();

  const formData=new FormData()
  const loginData=new FormData()
  const [userName,setUserName]=useState()
  console.log(userName);
  // var resmessage;

  formData.append("userName",form.username)
    formData.append("password",form.password)
    formData.append("fullName",form.fullName )
    formData.append("mobileNo",form.phoneNumber )
    formData.append("email",form.email )
    formData.append("profile",image)

// console.log(formData);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFileChange=(e)=>{
    // console.log(e.target.files[0]);
    setImage(e.target.files[0])
    


  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const { userName, password, mobileNo, avatarURL, email } = form;
    console.log(formData);
    const URL = "http://localhost:4000";

    const {
      data: { message, status, token, streamToken },
    } = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, isSignup?
    // {
    //   userName: form.username,
    //   password: form.password,
    //   fullName: form.fullName,
    //   mobileNo: form.phoneNumber,
    //   avatarURL: form.avatarURL,
    //   email: form.email,
    // }
    formData:{
      userName:form.username,
      password:form.password

    },isSignup?{
      headers:
      {"Content-Type":'multipart/form-data'}
    }:{
      headers:
      {"Content-Type":'application/json'}
    }
    );
    // const {data:{Smessage,Suser}}=await axios.get(`${URL}/test`)

    // console.log(`${message} ${status} ${token} ${streamToken} data`);
    // cookies.set("message",message)
    // cookies.set("status",status)
    // cookies.set("user",Suser)
    // resmessage=message
    console.log(message);
    setResmessage(message);
    setResStatus(status)
    cookies.set("jwt", token);
    cookies.set("streamToken", streamToken);

    // cookies.set("streamtoken",streamtoken)
    setOpen(true);

    if (status !== "failed") {
      window.location.reload();
    }
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setResmessage();
    setResStatus()
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields ">
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            {resStatus !=="success"?
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {resmessage}
            </Alert>:<Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {resmessage}
            </Alert>
}
          </Snackbar>
          {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert> */}
          {/* <Alert severity="success">This is a success message!</Alert> */}
        </Stack>
        <div className="auth__form-container_fields-content hvr-border-fade">
          <p>{isSignup ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>

            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  name="phoneNumber"
                  type="number"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Profile Pic</label>
                {/* <input  accept="image/*" type="file" /> */}
                <input
                  name="avatarURL"
                  accept="image/*"
                  type="file"
                  onChange={handleFileChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
              <button class="button-79">
                {isSignup ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <span onClick={switchMode}>
                {isSignup ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
      
        <img src={signinImage} alt="sign in" />
      </div>

    </div>
  );
};

export default Auth;

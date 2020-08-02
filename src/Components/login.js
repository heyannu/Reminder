import React, { Component } from "react";
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import { BrowserRouter as Redirect } from "react-router-dom";
import firebase from "firebase"
import "./Assets/login.css"
import {useSelector} from "react-redux"

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: false
    }
  }
  email(e) {
    this.setState({ email: e.target.value })
    console.log(e.target.value)
  }
  password(e) {
    this.setState({ password: e.target.value })
    console.log(e.target.value)
  }
  submit(e) {
    e.preventDefault();
    if(this.state.password==""||this.state.email==''){
      alert("Fields cannot be empty")
    }
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
      this.setState({
        redirect: true
      })
      console.log(user)
    }).catch((err) => {
      console.log(err)
      alert(err.message)
    })
  }
  render() {
    if (this.state.redirect === true) {
      return <Redirect to={{
        pathname: '/addEvent',
        state: {
          message: 'Login Successful!'
        }
      }} />
    }
    else {
      return (
        <div className="login">
          <div>
            <Container class="layer">
              <div className="title"><center><h1>LOGIN</h1></center></div>
              {/* <p>counter</p> */}

              <Container>
                <div className="pos">
                  {/* <center> */}
                  <TextField
                    id="Email"
                    placeholder="Email"
                    variant="outlined"
                    required
                    onChange={this.email.bind(this)}
                    className="text"
                  />
                
                </div>

                <div className="pos">
                  <TextField
                    id="Password"
                    placeholder="Password"
                    variant="outlined"
                    required
                    onChange={this.password.bind(this)}
                    className="text" />
                 
                </div>
                <div >
                  <center>
                    <Button class="button1" variant="contained" color="primary" className="button" onClick={this.submit.bind(this)}>Login</Button>
                  </center>
                </div>
                <div className="link">
                  <center><p>New User? <a href="/register"> Create an Account</a></p></center>
                </div>
              </Container>
            </Container>
          </div>
        </div>
      );
    }
  }
}

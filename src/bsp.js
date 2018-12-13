import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import {loginPage} from './stylings/loginPage.css';
import * as serviceWorker from './serviceWorker';

class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: 'ciustudents',
            password:'Pass123$',
            clientId:'backoffice',
            clientSecret:'backoffice@lug',
        }

        this.login=this.login.bind(this);
        this.onChange=this.onChange.bind(this); 
    }

    login(){
       console.log("Login function");
        fetch('https://emata-authservice-test.laboremus.no/users/login',{
           headers: {
                'Access-Control-Allow-Origin':'https://emata-authservice-test.laboremus.no/users/login',
                'Transfer-Encoding': 'chunked',
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Content-Encoding': 'gzip',
                'Vary':'Accept-Encoding',
                'X-Content-Type-Options':'nosniff',
            },
            method:'POST',
            mode: 'no-cors',
            body:{
                    "username": "ciustudents",
                    "password": "Pass123$",
                    "clientId": "backoffice",
                    "clientSecret": "backoffice@lug"
            }
        })
        .then(response=>response.json())
        .then(res=>{console.log(res);})
        /*
        PostData('login',this.state).then ((result) =>{
            let responseJSON = result;
            console.log(responseJSON);
        });//*/
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state);
    }
    render(){
        return(
            <div class="container">
            <h1 class="form-heading">login Form</h1>
            <div class="login-form">
            <div class="main-div">
                <div class="panel">
               <h2>Admin Login</h2>
               <p>Please enter your email and password</p>
               </div>
                <form id="Login">

                    <div class="form-group">


                        <input type="email" class="form-control" id="inputEmail" placeholder="Email Address">

                    </div>

                    <div class="form-group">

                        <input type="password" class="form-control" id="inputPassword" placeholder="Password">

                    </div>
                    <div class="forgot">
                    <a href="reset.html">Forgot password?</a>
            </div>
                    <button type="submit" class="btn btn-primary">Login</button>

                </form>
                </div>
            <p class="botto-text"> Designed by Sunil Rajput</p>
            </div></div></div>

        );
    } 
}

ReactDOM.render(<Login />, document.getElementById('just'));
serviceWorker.unregister();
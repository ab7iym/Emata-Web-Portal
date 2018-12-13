import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import {loginPage} from './stylings/loginPage.css';
import * as serviceWorker from './serviceWorker';
//import {PostData} from './PostData.js'

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
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state);
    }
    render(){
        return(
            <div className="parentDiv">
                <div className="mainDiv">
                    <img className="loginLogo" src={require("./images/emata-logo.png")} alt={"logo"}/>
                    <form onSubmit={this.login}> 
                      <div className="form-group-ab7">
                        <div className="inputBackground">
                            <img className="loginIconUsername" src={require("./icons/userIcon.png")} alt={"userIcon"}/>
                            <input type="text" className="inputBoxUsername" id="Username" placeholder="username"/> 
                        </div>
                      </div>
                      <div className="form-group-ab7"> 
                        <div className="inputBackground">
                        <img className="loginIconPassword" src={require("./icons/keyIcon.png")} alt={"userIcon"}/>
                          <input type="password" className="inputBoxPassword" id="inputPassword" placeholder="password"/> 
                        </div>
                      </div> 
                      <div className="form-group-ab7"> 
                        <input type="submit" className="loginButton" value="sign in"/>
                      </div>
                    </form>  
                </div>
            </div>
        );
    } 
}

ReactDOM.render(<Login />, document.getElementById('just'));
serviceWorker.unregister();



    /*
    PostData('login',this.state).then ((result) =>{
        let responseJSON = result;
        console.log(responseJSON);
    });//*/
    /*
    posting(userData){
        fetch('https://emata-authservice-test.laboremus.no/users/login',{
            //*
            headers: {
                'Authorization': '*',//'Authorization': 'bearer ${token}',
                'Content-Type': 'application/json;charset=UTF-8',
            },//
            method: 'POST',
            //mode: 'no-cors',
            body: {
                    "username": "ciustudents",
                    "password": "Pass123$",
                    "clientId": "backoffice",
                    "clientSecret": "backoffice@lug"
            }
        })
        .then((response)=>console.log(response))
        .then((responseJson)=>{
            console.log(responseJson);
        })
        .catch((error)=>{
            return(error);//reject(error);
        });
        //console.log(JSON.stringify(this.userData));
    }
    }//*/
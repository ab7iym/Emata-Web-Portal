import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import * as serviceWorker from './serviceWorker';
import {PostData} from './PostData.js'

class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: 'ciustudents',
            password:'Pass123$',
            clientId:'backoffice',
            clientSecret:'backoffice@lug'
        }

        this.login=this.login.bind(this);
        this.onChange=this.onChange.bind(this); 
    }

    login(){
        console.log("Login function");
        this.posting(this.state);
        console.log(JSON.stringify(this.state));
        /*
        PostData('login',this.state).then ((result) =>{
            let responseJSON = result;
            console.log(responseJSON);
        });//*/
    }

    posting(userData){
        fetch('https://emata-authservice-test.laboremus.no/users/login',{
            headers: {
                'Authorization': '*/*',//'Authorization': 'bearer ${token}',
                'Transfer-Encoding': 'chunked',
                'Content-Type': 'application/json;charset=UTF-8',
                'Content-Encoding': 'gzip',
                'Vary':'Accept-Encoding',
                'X-Content-Type-Options':'nosniff',
            },
            credentials: 'include',
            method: 'POST',
            //mode: 'no-cors',
            body: JSON.stringify(userData)
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            console.log(responseJson);
        })
        .catch((error)=>{
            return(error);//reject(error);
        });
        //console.log(JSON.stringify(this.userData));
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state);
    }//onChange={this.onChange}
    render(){
        return(
            <div>
                <div>
                    <h2>Login Page</h2>
                    <label>Username</label>
                    <input type="text" name="Username" value="ciustudents" placeholder="Username" onChange={this.onChange}/>
                    <label>password</label>
                    <input type="password" name="password" value="Pass123$" placeholder="password" onChange={this.onChange}/>
                    <input type="submit" value="login" className="button" onClick={this.login}/>
                </div>
            </div>
        );
    } 
}

ReactDOM.render(<Login />, document.getElementById('just'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

























    /*
    posting(userData){
        fetch('https://emata-authservice-test.laboremus.no/users/login',{
            headers: {
                'Accept': '*//*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(userData)
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            console.log(responseJson);
        })
        .catch((error)=>{
            console.error(error);//reject(error);
        });
    }//*/
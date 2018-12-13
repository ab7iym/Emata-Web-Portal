import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import * as serviceWorker from './serviceWorker';

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
        fetch('https://emata-crmservice-test.laboremus.no/api/contact',{
            Authorization: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM0OTMwOGU0ZjQwMGEzMDU1ZGNkYmVhNTYyMGVmNTk2IiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NDQ0MjgyODYsImV4cCI6MTU0NDUxNDY4NiwiaXNzIjoiaHR0cHM6Ly9lbWF0YS1hdXRoc2VydmljZS10ZXN0LmxhYm9yZW11cy5ubyIsImF1ZCI6WyJodHRwczovL2VtYXRhLWF1dGhzZXJ2aWNlLXRlc3QubGFib3JlbXVzLm5vL3Jlc291cmNlcyIsImNybSIsImxlZGdlciIsInBheW1lbnQiLCJzbXMiXSwiY2xpZW50X2lkIjoiYmFja29mZmljZSIsInN1YiI6IjFmMjY1NGFkLWUwOGQtNDdlMi1kYTlmLTA4ZDYzYjI4NzExOSIsImF1dGhfdGltZSI6MTU0NDQyODI4NiwiaWRwIjoibG9jYWwiLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiY3JtIiwibGVkZ2VyIiwicGF5bWVudCIsInNtcyIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwd2QiXX0.rbiB0JViVkZZQp-oHqw9zXGX47AYC4uVQZzfvxZN-2Rd20zAB5dvOloDqZe5A4Yi5qQunShyoHa-4_j_2TqX7xnzWGFdLdA8XUQJKCv67AJLtefGIsPe1Tkmu35C2ck2Gkfk451Qld9Z5wWYS8SjJABL2Al2T_2L2i_VAPN7X9fExsmVHiyg7la4W4HmEbqBRB_05sKaCg2o_IbVvAx_3ngPf51ZXP1cckHZklBCaaxYqnOiI486xIagcwulqhpPp-jB9gQ__SXiRTihRi3r-NbPSG3WktU7d8j6z641IrpGSds2o2B1XMYiRu_VhRxzIjDig0wS6LZIacdLml8OGA',
            method: 'GET'
            //mode: 'no-cors',
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
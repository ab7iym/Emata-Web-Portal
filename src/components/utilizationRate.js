import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import * as serviceWorker from './serviceWorker';

var names="justSomeRandomGuy";
var length=6.0;
class Nigga extends Component{
    render(){
        //var height=6.0;
        return(
            <div>
                <p align="Center"><b>THAT'S THE NIGGA!!!!!!!!!!!!!!!!!!</b></p>
                <p align="Center"><b>NIGGA's name is {this.props.Name}</b></p>
                <p align="Center"><b>NIGGA {this.props.height}cm short</b></p>
                <p align="Center"><b>NIGGA said 1 + 1 is {2+2}.....????</b></p>
                <div align="Center">
                    <button className="btn btn-danger">yah..him</button>
                    
                </div>
            </div>
        );
    }
}
ReactDOM.render(<Nigga height= {length} Name={names}/>, document.getElementById('just'));
serviceWorker.unregister();

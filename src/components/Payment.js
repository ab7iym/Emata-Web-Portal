import React, { Component } from 'react';
import 'react-dom';
import './stylings/payments.css';
import Highcharts from 'highcharts';
import {HighchartsChart, Chart, withHighcharts, XAxis, YAxis, ColumnSeries} from 'react-jsx-highcharts';

class Payment extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      data: [0,0,0],
	      Gduration: 1500,
	      paymentList: []
	    };
	    this.paymentMethod=this.paymentMethod.bind(this);
  	}
  	componentDidMount() {
		this.paymentMethod(this.props.passCoopData);
  		let newState = this.state;
	    newState.paymentList = this.props.passCoopData;
	    this.setState(newState);
	}
	static getDerivedStateFromProps(newProp=this.props.passCoopData, state=this.state){
		let newState = state;
		newState.paymentList = newProp.passCoopData;
		return newState;
	}
	shouldComponentUpdate(){
		return true
	}
	paymentMethod(res){//this function populates the payment method list in the payment graph
	    let contact = res;
        let len = contact.length;
        let Cash = 0;
        let Bank= 0;
        let MobileMoney = 0;

        for(let i = 0; i < len; i++){
          if(contact[i].paymentMethod===2){
            Cash = Cash +1; 
          }
          else if(contact[i].paymentMethod===1){
            Bank = Bank +1;
          }
          else if(contact[i].paymentMethod===3){
            MobileMoney = MobileMoney +1;
          }
          else {return null}
        }
        let newState= this.state;
        newState.data[0] = Bank;
        newState.data[1] = Cash;
        newState.data[2] = MobileMoney;
   		newState.Gduration = newState.Gduration+0.0001;
   		return newState;
    }
 	render(){
 		let res=this.paymentMethod(this.state.paymentList);
 		const categories= ['Bank', 'Cash', 'MobileMoney'];
  		const labels= {style: {fontSize:'40px'}}
	 	const plotOptions = {
    		series: {
    			animation:{duration: this.state.Gduration},
    		}
  		};
  		var tooltip = {valueSuffix: 'farmers'}
	    return(
	    	<div className="topDiv">
	    		
		        <HighchartsChart  
		        	className="paymentGraph"
					plotOptions={plotOptions} 
			        tooltip={tooltip}
			    >
			    <Chart />
		          <XAxis categories={categories} lable = {labels}>
		          	<XAxis.Title >Payment Channels</XAxis.Title>
		          </XAxis>
		          <YAxis>
		          	<YAxis.Title >No. of farmers</YAxis.Title>
		            <ColumnSeries id="graph" name="Farmers" data={this.state.data}/>
		          </YAxis>
		        </HighchartsChart>
	        </div>
	    );
    } 
}

export default withHighcharts(Payment, Highcharts);

/*
	<button className="deliveryButtons" onClick={(e)=>{e.preventDefault();this.refresh()}}>refresh</button>
*/
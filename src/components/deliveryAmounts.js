import React, { Component } from 'react';
import 'react-dom';
import './stylings/deliveryAmount.css';
import NoOfDeliveries from './deliveryAmounts-noOfDeliveries'
import AveDeliverySize from './deliveryAmounts-aveDeliverySize'
import AmtMilkDeliveries from './deliveryAmounts-amtMilkDeliveries'
import Highcharts from 'highcharts';
import {HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, ColumnSeries, SplineSeries} from 'react-jsx-highcharts';

class DeliveryCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      tabs:{
        tab1: true,
        tab2: false,
        tab3: false
      }
    }
    this.showGraph=this.showGraph.bind(this);
    this.updateTheState=this.updateTheState.bind(this);
  }
  updateTheState(number){//this function is called to update the state name of loginDetails object
      var abc = this.state.tabs;
      abc.tab1 = false; abc.tab2 = false; abc.tab3 = false;
      if(number===1){abc.tab1=true;}
      else if(number===2){abc.tab2=true;}
      else if(number===3){abc.tab3=true;}
      this.setState({tabs: abc});
      console.log(this.state.tabs);
  }
  showGraph(){
    console.log("showGraph Started");
    if(this.state.tabs.tab1){console.log("Tab1 is selected");return <NoOfDeliveries/>}
    else if(this.state.tabs.tab2){console.log("Tab2 is selected");return <AveDeliverySize/>}
    else{console.log("Tab3 is selected");return <AmtMilkDeliveries/>}
  }
  render(){
    return(
      <div>
        <div className="buttonsRow">
            <button className="deliveryButtons" onClick={(e)=>{e.preventDefault();this.updateTheState(1)}}>No. of deliveries</button>
            <button className="deliveryButtons" onClick={(e)=>{e.preventDefault();this.updateTheState(2)}}>Ave. delivery size</button>
            <button className="deliveryButtons" onClick={(e)=>{e.preventDefault();this.updateTheState(3)}}>Amt. of milk deliveries</button>
        </div>
        {this.showGraph()}
      </div>
    );
  } 
}
//(e)=>{e.preventDefault(); is used to prevent the onClick function from running by default/when the page loads/reloads
export default withHighcharts(DeliveryCard, Highcharts);


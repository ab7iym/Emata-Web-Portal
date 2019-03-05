import React, { Component } from 'react';
import 'react-dom';
import './stylings/deliveryAmount.css';
import NoOfDeliveries from './deliveryAmounts-noOfDeliveries'
import AveDeliverySize from './deliveryAmounts-aveDeliverySize'
import AmtMilkDeliveries from './deliveryAmounts-amtMilkDeliveries'
import Highcharts from 'highcharts';
import {HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, SplineSeries} from 'react-jsx-highcharts';

class DeliveryCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      tabs:{
        tab1: true,
        tab2: false,
        tab3: false,
        actTab1: 'activeDeliveryButtons',
        actTab2: 'inactiveDeliveryButtons',
        actTab3: 'inactiveDeliveryButtons'
      },
      dateRangeEntries: ''
    }
    this.showGraph=this.showGraph.bind(this);
    this.updateTheState=this.updateTheState.bind(this);
    this.checkStateChange=this.checkStateChange.bind(this);
  }

  updateTheState(number){//this function is called to update the state name of loginDetails object
      var abc = this.state.tabs;
      abc.tab1 = false; abc.tab2 = false; abc.tab3 = false;
      abc.actTab1 = 'inactiveDeliveryButtons'; abc.actTab2 = 'inactiveDeliveryButtons'; abc.actTab3 = 'inactiveDeliveryButtons'
      if(number===1){abc.tab1=true; abc.actTab1='activeDeliveryButtons'}
      else if(number===2){abc.tab2=true; abc.actTab2='activeDeliveryButtons'}
      else if(number===3){abc.tab3=true; abc.actTab3='activeDeliveryButtons'}
      this.setState({tabs: abc});
      console.log(this.state.tabs);
  }
  checkStateChange(){//this function is called to update the state name of loginDetails object
    console.log("checkIdChange function has been called");
    console.log("DVApassed startdate:", this.props.passCoopData);
    if(this.state.dateRangeEntries===this.props.passCoopData){
      return this.showGraph();
    }
    else{
      console.log("--------------DVA condition different-Data-----------");
      let newState = this.state;
      newState.dateRangeEntries = this.props.passCoopData;
      this.setState(newState);
    }
  }
  showGraph(){
    console.log("showGraph Started");
    if(this.state.tabs.tab1){
      console.log("Tab1 is selected");
      return <NoOfDeliveries passCoopData={this.state.dateRangeEntries}/>
    }
    else if(this.state.tabs.tab2){
      console.log("Tab2 is selected");
      return <AveDeliverySize passCoopData={this.state.dateRangeEntries}/>
    }
    else{console.log("Tab3 is selected");
      return <AmtMilkDeliveries passCoopData={this.state.dateRangeEntries}/>
    }
  }
  render(){
    let className1=this.state.actTab1;
    return(
      <div>
        <div className="buttonsRow">
            <button className='activeDeliveryButtons' onClick={(e)=>{e.preventDefault();this.updateTheState(1)}}>No. of deliveries</button>
            <button className='inactiveDeliveryButtons' onClick={(e)=>{e.preventDefault();this.updateTheState(2)}}>Ave. delivery size</button>
            <button className='inactiveDeliveryButtons' onClick={(e)=>{e.preventDefault();this.updateTheState(3)}}>Amt. of milk deliveries</button>
        </div>
        {this.checkStateChange()}
      </div>
    );
  } 
}
//(e)=>{e.preventDefault(); is used to prevent the onClick function from running by default/when the page loads/reloads
export default withHighcharts(DeliveryCard, Highcharts);


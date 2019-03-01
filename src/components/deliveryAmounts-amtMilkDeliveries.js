import React, { Component } from 'react';
import 'react-dom';
import './stylings/deliveryAmounts-noOfDeliveries.css';
import Highcharts from 'highcharts';
import {HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, ColumnSeries, SplineSeries} from 'react-jsx-highcharts';

class NoOfDeliveriesDeliveryCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      entries: [],
      dates: [],
      Gduration: 1500
    }
    this.getCoopsData=this.getCoopsData.bind(this);
    this.calcDate=this.calcDate.bind(this);
  }

  componentDidMount(){
    {this.calcDate(localStorage.getItem('startDt-sl'), localStorage.getItem('endDt-sl'))}
  }

  calcDate(startDate,endDate){
    var start = new Date(startDate);
    var end = new Date(endDate);
    let noOfDays = (parseInt((end - start) / (24 * 3600 * 1000)))+1;//this gets the number of days between the dates
    console.log("No. of Days: "+noOfDays);
    var loopDate  = new Date(startDate); //Month is 0-11 in JavaScript
    let milkDeliveries = [];
    let newState= this.state;

    for(let i=1; i<=noOfDays; i++){
      console.log("Loop Date: "+loopDate.toDateString()); 
      let sendDate = loopDate.getFullYear()+"-"+(loopDate.getMonth()+1)+"-"+loopDate.getDate();
      console.log("sendDate: "+sendDate); 
      milkDeliveries[milkDeliveries.length] = this.getCoopsData(localStorage.getItem('cp-sl-id'),sendDate,endDate);
      loopDate.setDate(loopDate.getDate()+1);
    }
    console.log("milkDeliveries: ",milkDeliveries); 
    console.log("Loop months: "+loopDate.getMonth()); 
    console.log("Loop Date: "+loopDate.toDateString()); //displays date
  }
  getCoopsData(id,startDate,endDate){//this function populates the coops list in the search bar
    //this.calcDate(startDate,endDate);
    console.log("getCoopsData function has been called");
    const r = fetch('https://emata-ledgerservice-test.laboremus.no/api/ledger/ledger-summary?organisationId='+id+'&date='+startDate,{
        headers: {
          'Authorization':'Bearer '+localStorage.getItem('Token'),
          'Transfer-Encoding': 'chunked',
          'Content-Type': 'application/json;charset=UTF-8',
          'Content-Encoding': 'gzip',
          'Vary':'Accept-Encoding',
          'X-Content-Type-Options':'nosniff',
        },
        method: 'GET'
    })
    .then(response=>response.json())
    .then(res=>{
      console.log(res);
      console.log("the deliveries: "+res.totalMilkDelivered);

      //*
      let newState= this.state;
      let sortedDateArray=[];
      newState.entries[newState.entries.length] = res.totalMilkDelivered;
      let entryDate=new Date(res.dateFrom)
      console.log("entry dates: "+entryDate.getDate()+"-"+(entryDate.getMonth()+1)+"-"+entryDate.getFullYear());
      newState.dates[newState.dates.length] = entryDate.getDate()+"-"+(entryDate.getMonth()+1)+"-"+entryDate.getFullYear();//res.dateFrom;
      
      sortedDateArray=newState.dates;
      sortedDateArray.sort(function(a,b){return new Date(b.date) - new Date(a.date);});
      newState.dates=sortedDateArray;
      newState.Gduration = newState.Gduration+0.0001;
      
      this.setState(newState);
      console.log("state: ", this.state);//*/

      return res.totalMilkDelivered;
    })
    .catch((error)=>{
        return(error);//reject(error);
    });
  }
  render(){
    const labels= {style: {fontSize:'40px'}}
    const plotOptions = { series: {animation:{duration: this.state.Gduration}}};
    var tooltip = {valueSuffix: 'ltrs'}
    return(
        <HighchartsChart  
          className="noOfDeliveriesdeliveryGraph"
          plotOptions={plotOptions} 
          tooltip={tooltip} 
          height={325}
        >
          <Chart />

          <Title></Title>

          <XAxis categories={this.state.dates} lable = {labels}>
            <XAxis.Title>date</XAxis.Title>
          </XAxis>
          <YAxis>
            <YAxis.Title>Quantity (ltrs)</YAxis.Title>
            <SplineSeries name="deliveries" data= {this.state.entries}  />
          </YAxis>
        </HighchartsChart>
    );
  } 
}

export default withHighcharts(NoOfDeliveriesDeliveryCard, Highcharts);


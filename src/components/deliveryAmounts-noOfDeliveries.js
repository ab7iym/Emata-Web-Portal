import React, { Component } from 'react';
import 'react-dom';
import './stylings/deliveryAmounts-noOfDeliveries.css';
import Highcharts from 'highcharts';
import {HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, SplineSeries} from 'react-jsx-highcharts';

class NoOfDeliveriesDeliveryCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      dateRangeEntries: [],
      entries: [],
      Gduration: 1500,
      dateTimeLabelFormats: {
        second: '%Y-%m-%d<br/>%H:%M:%S',
        minute: '%Y-%m-%d<br/>%H:%M',
        hour: '%Y-%m-%d<br/>%H:%M',
        day: '%Y<br/>%m-%d',
      }
    }
    this.getCoopsData=this.getCoopsData.bind(this);
    //this.calcDate=this.calcDate.bind(this);
  }

  componentDidMount(){
    let newState = this.state;
    newState.dateRangeEntries = this.props.passCoopData;
    this.setState(newState);
    this.getCoopsData(this.props.passCoopData);
  }

  getCoopsData(res){//this function populates the coops list in the search bar
    let newState= this.state;
    let sortedDateArray = res;//this stores the dates from the API-endpoint to the state dates array(in date fomart)
    for(let i=0; i<sortedDateArray.length; i++){//sorting the entries by date so as to get total deliveries in one day
      let entryDate = new Date(sortedDateArray[i].entryDateTime);//getting a new date from the array;
      let prevEntryDate = '';
      
      if(newState.entries.length>0){//check if the previous date entry already exists
        prevEntryDate=newState.entries[newState.entries.length-1].entryDateTime;
      }
      
      if(newState.entries.length===0){//check if the array has no value and add a value in the first position
        newState.entries[newState.entries.length] = {'entryDateTime': entryDate , 'noOfEntries': 1};
      }
      //Adding Entries of the same date
      else if((prevEntryDate.getDate()===entryDate.getDate()) && (prevEntryDate.getMonth()===entryDate.getMonth()) && (prevEntryDate.getFullYear()===entryDate.getFullYear())){
        newState.entries[(newState.entries.length)-1] = {'entryDateTime': entryDate , 'noOfEntries': (newState.entries[newState.entries.length-1].noOfEntries)+1};
      }
      else{//add a new entry to array
        newState.entries[newState.entries.length] = {'entryDateTime': entryDate , 'noOfEntries': 1};
      }
    }

    if(sortedDateArray.length){//this condition is used to get data for the days when the delivery is 0(zero)
      let firstDateOfEntry = new Date(newState.entries[0].entryDateTime);//this holds the date of the first entry made in the period selected
      let lastDateOfEntry = new Date(newState.entries[newState.entries.length-1].entryDateTime);//this holds the date of the last entry made in the period selected
      let noOfDays = (parseInt((lastDateOfEntry - firstDateOfEntry) / (24 * 3600 * 1000)))+2;//this gets the number of days between the dates
      let allDatesInRange = [];
      for(let i=0; i<noOfDays; i++){
        let date = ''
        if(i===0){date = new Date(firstDateOfEntry.setDate(firstDateOfEntry.getDate()));}
        else {date = new Date(firstDateOfEntry.setDate(firstDateOfEntry.getDate()+1));} 
        allDatesInRange.push({'entryDateTime': date , 'noOfEntries': 0});
      }
      for(let i=0; i<allDatesInRange.length; i++){
        for(let r=0; r<newState.entries.length; r++){
          if(allDatesInRange[i].entryDateTime.getDate()===newState.entries[r].entryDateTime.getDate() && allDatesInRange[i].entryDateTime.getMonth()===newState.entries[r].entryDateTime.getMonth() && allDatesInRange[i].entryDateTime.getFullYear()===newState.entries[r].entryDateTime.getFullYear() ){
            allDatesInRange[i] = newState.entries[r];
          }
        }
      }
      newState.entries=allDatesInRange;
    }
    for(let i=0; i<newState.entries.length; i++){//loop to convert the entries array date to date.UTC
      let entryDate = new Date(newState.entries[i].entryDateTime);//getting a new date from the array;
      newState.entries[i] = [Date.UTC(entryDate.getFullYear(), entryDate.getMonth(), entryDate.getDate()) , newState.entries[i].noOfEntries]
    }
    newState.Gduration = newState.Gduration+0.0001;
    this.setState(newState);
  };

  render(){
    const plotOptions = { series: {animation:{duration: this.state.Gduration}}};
    var tooltip = {valueSuffix: ''}

    return(
        <HighchartsChart  
          className="noOfDeliveriesdeliveryGraph"
          plotOptions={plotOptions} 
          tooltip={tooltip} 
          height={325}
        >
          <Chart />
          <Title></Title>
          <XAxis type = 'datetime' dateTimeLabelFormats={this.state.dateTimeLabelFormats}>
            <XAxis.Title>Date</XAxis.Title>
            <SplineSeries name="deliveries" data= {this.state.entries} />
          </XAxis>
          <YAxis>
            <YAxis.Title>No. of Deliveries</YAxis.Title>
          </YAxis>
        </HighchartsChart>
    );
  } 
}

export default withHighcharts(NoOfDeliveriesDeliveryCard, Highcharts);
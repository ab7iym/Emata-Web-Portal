import React, { Component } from 'react';
import 'react-dom';
import './stylings/farmers.css';
import Highcharts from 'highcharts';
import {HighchartsChart, Chart, withHighcharts, XAxis, YAxis, SplineSeries} from 'react-jsx-highcharts';

class FarmersCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      contacts: [],
      activeFarmers: '',
      activeFarmersList: [],
      inactiveFarmers: '',
      object:[],
      obj:[],
      dateTimeLabelFormats: {
        second: '%Y-%m-%d<br/>%H:%M:%S',
        minute: '%Y-%m-%d<br/>%H:%M',
        hour: '%Y-%m-%d<br/>%H:%M',
        day: '%Y<br/>%m-%d',
      },
      Gduration: 1500
    };
  }

  //calcaulating the number of days within the range
  mydiff = (date1,date2,interval) =>{
    var second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7;
    date1 = new Date(date1);
    date2 = new Date(date2);
    var timediff = date2 - date1;
    if (isNaN(timediff)) return NaN;
    switch (interval) {
      case "years": return date2.getFullYear() - date1.getFullYear();
      case "months": return (
        ( date2.getFullYear() * 12 + date2.getMonth() )
        -
        ( date1.getFullYear() * 12 + date1.getMonth() )
      );
      case "weeks"  : return Math.ceil(timediff / week);
      case "days"   : return Math.floor(timediff / day); 
      case "hours"  : return Math.floor(timediff / hour); 
      case "minutes": return Math.floor(timediff / minute);
      case "seconds": return Math.floor(timediff / second);
      default: return undefined;
    }
  }

	static getDerivedStateFromProps(newProp=this.props.passCoopData, state=this.state){
		let newState = state;
    newState.contacts = newProp.passCoopData.contacts;
		newState.object = newProp;
    return newState;
	}

  setgraphData = (object,activeFarmersList) =>{
    let entries = object.passCoopData.entries;
    let graphData = [];

    for(let i=0; i<entries.length; i++){//sorting the entries by date so as to get total deliveries in one day
      let entryDate = new Date(entries[i].entryDateTime);//getting a new date from the array;
      let farmerId = entries[i].farmerId;//getting a new date from the array;
      let prevEntryDate = '';
      function checkFarmerId() {
        let present= false;
        for(let z=0; z<activeFarmersList.length; z++){
          if(farmerId===activeFarmersList[z]){
            present=true;
            break;
          }
        }
        return present;
      }
      if(checkFarmerId()){
        if(graphData.length>0){//check if the previous date entry already exists
          prevEntryDate=graphData[graphData.length-1].entryDateTime;
        }
        if(graphData.length===0){//check if the array has no value and add a value in the first position
          graphData[graphData.length] = {'entryDateTime': entryDate , 'noOfEntries': 1};
        }
        //Adding Entries of the same date
        else if((prevEntryDate.getDate()===entryDate.getDate()) && (prevEntryDate.getMonth()===entryDate.getMonth()) && (prevEntryDate.getFullYear()===entryDate.getFullYear())){
          graphData[(graphData.length)-1] = {'entryDateTime': entryDate , 'noOfEntries': (graphData[graphData.length-1].noOfEntries)+1};
        }
        else{//add a new entry to array
          graphData[graphData.length] = {'entryDateTime': entryDate , 'noOfEntries': 1};
        }
      }
    }
    if(entries.length && graphData.length){//this condition is used to get data for the days when the delivery is 0(zero)
      let firstDateOfEntry = new Date(graphData[0].entryDateTime);//this holds the date of the first entry made in the period selected
      let lastDateOfEntry = new Date(graphData[graphData.length-1].entryDateTime);//this holds the date of the last entry made in the period selected
      let noOfDays = (parseInt((lastDateOfEntry - firstDateOfEntry) / (24 * 3600 * 1000)))+2;//this gets the number of days between the dates
      let allDatesInRange = [];
      for(let i=0; i<noOfDays; i++){
        let date = ''
        if(i===0){date = new Date(firstDateOfEntry.setDate(firstDateOfEntry.getDate()));}
        else {date = new Date(firstDateOfEntry.setDate(firstDateOfEntry.getDate()+1));} 
        allDatesInRange.push({'entryDateTime': date , 'noOfEntries': 0});
      }
      for(let i=0; i<allDatesInRange.length; i++){
        for(let r=0; r<graphData.length; r++){
          if(allDatesInRange[i].entryDateTime.getDate()===graphData[r].entryDateTime.getDate() && allDatesInRange[i].entryDateTime.getMonth()===graphData[r].entryDateTime.getMonth() && allDatesInRange[i].entryDateTime.getFullYear()===graphData[r].entryDateTime.getFullYear()){
            allDatesInRange[i] = graphData[r];
          }
        }
      }//*/
      graphData=allDatesInRange;
    }

    for(let i=0; i<graphData.length; i++){//loop to convert the entries array date to date.UTC
      let entryDate = new Date(graphData[i].entryDateTime);//getting a new date from the array;
      graphData[i] = [Date.UTC(entryDate.getFullYear(), entryDate.getMonth(), entryDate.getDate()) , graphData[i].noOfEntries]
    }
    let newState = this.state;
    newState.entries = graphData;
    newState.Gduration = newState.Gduration+0.0001;
    return newState;
  };

  handleFarmersGraph = (object)=>{
    let startDate = "";
    let endDate = "";
    let weeks = "";
    let activeFarmers = '';
    let activeFarmersList = [];
    let inactiveFarmers = this.state.contacts.length;

    //changing the start and end date into days, weeks//
    if(object.passCoopData.startDate){
      startDate = object.passCoopData.startDate;
      endDate = object.passCoopData.endDate;
      weeks = this.mydiff(startDate,endDate,"weeks");
    }

    //passing the coopdates and coopdata from the API to populate the farmers Id//
    if(object.passCoopData){
      let i=0;
      let j=0;
      let p=0;
      let obj = object.passCoopData.entries;
      let flag = 0;
      let contacts = [];
      activeFarmers = 0;

      for(i=0;i<obj.length;i++){//checking if the contact is equal to farmerId
        let id = obj[i].farmerId;
        // contacts.push(id);
        for(let j=0;j<=obj.length;j++){
          if(contacts[j] === id){
            flag = 1;
            break;        
          }  
        }
        if(flag === 0){//if the flag is 0 push the id into the contact array
          contacts.push(id);
        }
        else{
          flag = 0;
        }
      }

      if(contacts.length !== 0){//check if the contact array is not equal to zero
        function addDays(date, days) {
          var result = new Date(date);
          result.setDate(result.getDate() + days);
          return result;
        }
        for(i=0;i<contacts.length;i++){//loop though the array to get contacts Id
          let contact = contacts[i];
          let contactActiveCounter = 0;
          let weekDelivery = 0;
          let activeness = 0;
          inactiveFarmers = this.state.contacts;

          let tempStartDate = new Date(startDate);
          let tempEndDate = addDays(tempStartDate,7);

          for(j=0;j<=obj.length;j++,tempStartDate = addDays(tempEndDate,1)){//loop though the inner loop get set the temporary date and add 7 days 
            tempEndDate = addDays(tempStartDate,7);
            let lastWeekFlag = 1;
            for(p=0;p<obj.length;p++){// loop the array to get the length of entry date time
              let entryDateTime = new Date(obj[p].entryDateTime);
              if(contact && contact === obj[p].farmerId && entryDateTime >= tempStartDate && entryDateTime <= tempEndDate){//checking if the contact is equal to farmerId and entry date time is greater or equal to temporary start and end date
                if(lastWeekFlag === 1 || weekDelivery === 1){//checking for last week and this week delivery if is equal to 1, 0
                  contactActiveCounter++;
                  lastWeekFlag = 1;
                  break;
                }
                else{
                  lastWeekFlag = 0;
                }
                weekDelivery = 1
              }
              else{
                weekDelivery = 0;
              }
            }

          }

          activeness = (contactActiveCounter/weeks)*100 //calculating the activeness of a farmer
          activeness = Math.round(activeness); //rounding the whole number 
          if (activeness <60) activeFarmers = activeFarmers
          else{activeFarmers = activeFarmers + 1; activeFarmersList.push(contact)};//checking if the farmer deliver is over 60%
          inactiveFarmers = (this.state.contacts.length) - (activeFarmers);//calculating the inactive farmer 
        }     
      }
    }
    let newState = this.state;
    newState.activeFarmersList = activeFarmersList;
    newState.activeFarmers = activeFarmers;
    newState.inactiveFarmers = inactiveFarmers;
    this.setgraphData(object,activeFarmersList);

    return newState;
  };

  render(){
    let farmerData=this.handleFarmersGraph(this.state.object);
    const plotOptions = {
      series: { animation: { duration: this.state.Gduration } }
    };
    var tooltip = { valueSuffix: "entries" };
    return (
      <div>
        <div className="textRow">
          <div className="textCards">
            <label className="contentNumber1">{this.state.contacts.length}</label>
            <label className="content">farmers</label>
          </div>
          <div className="textCards">
            <label className="contentNumber2">{this.state.activeFarmers}</label>
            <label className="content">active farmers</label>
          </div>
          <div className="textCards">
            <label className="contentNumber3">{this.state.inactiveFarmers}</label>
            <label className="content">inactive farmers</label>
          </div>
        </div>
        <HighchartsChart
          className="farmersGraph"
          plotOptions={plotOptions}
          tooltip={tooltip}
          height={3215}
        >
          <Chart />
          <XAxis type = 'datetime' dateTimeLabelFormats={this.state.dateTimeLabelFormats}>
            <XAxis.Title>Date</XAxis.Title>
            <SplineSeries name="Active Farmers" data= {this.state.entries} color="#1AB394"/> 
          </XAxis>
          <YAxis>
            <YAxis.Title>No. of Deliveries</YAxis.Title>
          </YAxis>
        </HighchartsChart>
      </div>
    );
  }
}

export default withHighcharts(FarmersCard, Highcharts);
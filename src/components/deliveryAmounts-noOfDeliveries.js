import React, { Component } from 'react';
import 'react-dom';
import './stylings/deliveryAmounts-noOfDeliveries.css';
import Highcharts from 'highcharts';
import {HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, ColumnSeries, SplineSeries} from 'react-jsx-highcharts';

class NoOfDeliveriesDeliveryCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      coopId: '',
      actualEntries: [],
      entries: [],
      dates: [],
      Gduration: 1500,
      startDate: '',
      endDate: ''
    }
    this.getCoopsData=this.getCoopsData.bind(this);
    this.calcDate=this.calcDate.bind(this);
  }

  componentDidMount(){
    //{this.calcDate(localStorage.getItem('startDt-sl'), localStorage.getItem('endDt-sl'))}
    let newState = this.state;
    newState.coopId = this.props.passCoopId;
    newState.startDate = this.props.passStartDate;
    newState.endDate = this.props.passEndDate;
    this.setState(newState);
    this.calcDate(this.props.passStartDate, this.props.passEndDate)
  }

  calcDate(startDate,endDate){
    var start = new Date(startDate);
    var end = new Date(endDate);
    let noOfDays = (parseInt((end - start) / (24 * 3600 * 1000)))+1;//this gets the number of days between the dates
    console.log("startDate: "+startDate+"    endDate: "+endDate);
    console.log("Date Difference: "+parseInt(start - end));
    console.log("No. of Days: "+noOfDays);
    var loopDate  = new Date(startDate);
    let milkDeliveries = [];
    let newState= this.state;

    for(let i=1; i<=noOfDays; i++){
      console.log("--------------------------------------------------------------------------------------------------------------------------------"); 
      console.log("Loop Date: "+loopDate.toDateString()); 
      //console.log("Loop Date: "+(loopDate.toDateString()).substring(3,7)); 
      let sendDate = loopDate.getFullYear()+"-"+(loopDate.getMonth()+1)+"-"+loopDate.getDate();
      console.log("sendDate: "+sendDate); 
      milkDeliveries[milkDeliveries.length] = this.getCoopsData(localStorage.getItem('cp-sl-id'),sendDate,endDate,noOfDays);
      //milkDeliveries[milkDeliveries.length] = this.getCoopsData(this.props.passCoopId,sendDate,endDate,noOfDays);
      loopDate.setDate(loopDate.getDate()+1);
    }
    console.log("milkDeliveries: ",milkDeliveries); 
  }

  // getCoopsData(localStorage.getItem('cp-sl-id'),sendDate,endDate)
 getCoopsData(id,startDate,endDate,noOfDays){//this function populates the coops list in the search bar
    console.log("getCoopsData function has been called");
    fetch('https://emata-ledgerservice-test.laboremus.no/api/ledger/ledger-summary?organisationId='+id+'&date='+startDate,{
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
      console.log("--------------------------------------------------------------------------------------------------------------------------------");
      console.log(res);
      console.log("the deliveries: "+res.noOfEntries);
      
      let newState= this.state;
      let sortedDateArray=[];
      newState.actualEntries[newState.actualEntries.length] = {entries: res.noOfEntries, date: new Date(res.dateFrom)};//this stores the dates from the API-endpoint to the state dates array(in date fomart)
      sortedDateArray=newState.actualEntries;
      sortedDateArray.sort(function(a,b){return a.date - b.date});
      console.log("sorted-Object-Array: ",sortedDateArray);
      
      //check if the last date/data has been received
      let compare1 = new Date(sortedDateArray[sortedDateArray.length-1].date);//new Date(res.dateFrom);
      let compare2 = new Date(this.state.endDate);
      if((compare1.getDate() === compare2.getDate()) &&(compare1.getMonth() === compare2.getMonth()) &&(compare1.getFullYear() === compare2.getFullYear())){
        newState.Gduration = newState.Gduration+0.0001;
        
        if(noOfDays<=21){//checking if the number of days is less that 3 weeks
          for(let i=0; i<sortedDateArray.length; i++){
            newState.entries[newState.entries.length]= sortedDateArray[i].entries;
            let entryDate = new Date(sortedDateArray[i].date);
            newState.dates[i] = entryDate.getDate()+"-"+(entryDate.getMonth()+1)+"-"+entryDate.getFullYear();//res.dateFrom;
          }
        }
        //sort in weeks
        else if(noOfDays>21 && noOfDays<=92){
          console.log("------------------------------inside week loop-----------------------------------");
          let holdFirstWeekDay = new Date();
          for(let i=0; i<sortedDateArray.length; i++){
            let entryDate = new Date(sortedDateArray[i].date);//console.log("GetWeek: "+entryDate.getWeek());
            let prevEntryDate = '';
            if(i>0){prevEntryDate=new Date(sortedDateArray[i-1].date)};//console.log("Prev GetWeek: "+prevEntryDate);
            console.log("-------------------entryDate: ",entryDate,"prevEntryDate: ",prevEntryDate);
            if(newState.entries.length===0){
              console.log("First entry: "+entryDate.getWeek());
              newState.entries[newState.entries.length] = newState.actualEntries[i].entries;
              console.log("Entry list: ",newState.entries);
              newState.dates[i] = entryDate.getDate()+"-"+(entryDate.getMonth()+1)+"-"+entryDate.getFullYear();//res.dateFrom;
              holdFirstWeekDay=entryDate;
              console.log("Start holdFirstWeekDay: ",holdFirstWeekDay);
            }
            else if(entryDate.getWeek()===prevEntryDate.getWeek()){//this checks if the dates fall in the same week number
              console.log("Same week: "+entryDate.getWeek());
              console.log("Middle holdFirstWeekDay: ",holdFirstWeekDay);
              newState.entries[newState.entries.length-1] = newState.entries[newState.entries.length-1] + newState.actualEntries[i].entries;//get the previous stored value and add the new entry value to it
              newState.dates[newState.dates.length-1] = holdFirstWeekDay.getDate() +" to "+ entryDate.getDate();//will print 12-15 where 12 is previous date and 15 being the last entry date
            }
            else {
              console.log("New week: "+entryDate.getWeek());
              holdFirstWeekDay=entryDate;
              console.log("End holdFirstWeekDay: ",holdFirstWeekDay);
              newState.entries[newState.entries.length] = newState.actualEntries[i].entries//
              newState.dates[newState.dates.length] = holdFirstWeekDay.getDate()+" to "+entryDate.getDate();
            }
          }
        }
        //sort in months
        else if(noOfDays>92 && 366){
          console.log("------------------------------inside month loop-----------------------------------");
          let holdMonth = new Date();
          for(let i=0; i<sortedDateArray.length; i++){
            let entryDate = new Date(sortedDateArray[i].date);//console.log("GetWeek: "+entryDate.getWeek());
            let prevEntryDate = '';
            if(i>0){prevEntryDate=new Date(sortedDateArray[i-1].date)};//console.log("Prev GetWeek: "+prevEntryDate);
            if(newState.entries.length===0){
              console.log("First entry: "+(entryDate.getMonth()+1));
              newState.entries[newState.entries.length] = newState.actualEntries[i].entries;
              newState.dates[i] = (entryDate.toDateString()).substring(3,7)+"-"+entryDate.getFullYear();
              console.log("Entry list: ",newState.entries);
            }
            else if(entryDate.getMonth()===prevEntryDate.getMonth()){//this checks if the dates fall in the same month
              console.log("Same week: "+entryDate.getMonth());
              newState.entries[newState.entries.length-1] = newState.entries[newState.entries.length-1] + newState.actualEntries[i].entries;//get the previous stored value and add the new entry value to it
              newState.dates[newState.entries.length-1] = (entryDate.toDateString()).substring(3,7)+"-"+entryDate.getFullYear();//will print Jan-2019 where Jan is the month and 2019 being the entry year
            }
            else {
              console.log("New Month: "+entryDate.getMonth());
              newState.entries[newState.entries.length] = newState.actualEntries[i].entries//
              newState.dates[newState.entries.length] = (entryDate.toDateString()).substring(3,7)+"-"+entryDate.getFullYear();
            }
          }
        }
      }
      this.setState(newState);
      console.log("state: ", this.state);//*/
    })
    .catch((error)=>{
        return(error);//reject(error);
    });
  };

  render(){
     //{this.getCoopsData(localStorage.getItem('cp-sl'),"2019-02-11","2019-02-11")}
    const labels= {style: {fontSize:'40px'}}
    const plotOptions = { series: {animation:{duration: this.state.Gduration}}};
    var tooltip = {valueSuffix: ''}

    //adding .getWeek functionality to date
    Date.prototype.getWeek = function() {
      var date = new Date(this.getTime());
      date.setHours(0, 0, 0, 0);
      // Thursday in current week decides the year.
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      // January 4 is always in week 1.
      var week1 = new Date(date.getFullYear(), 0, 4);
      // Adjust to Thursday in week 1 and count number of weeks from date to week1.
      return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                            - 3 + (week1.getDay() + 6) % 7) / 7);
    }
    // Returns the four-digit year corresponding to the ISO week of the date.
    Date.prototype.getWeekYear = function() {
      var date = new Date(this.getTime());
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      return date.getFullYear();
    }
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
            <YAxis.Title>No. of Deliveries</YAxis.Title>
            <SplineSeries name="deliveries" data= {this.state.entries} />
          </YAxis>
        </HighchartsChart>
    );
  } 
}

export default withHighcharts(NoOfDeliveriesDeliveryCard, Highcharts);


import React, { Component } from 'react';
import 'react-dom';
import './stylings/deliveryAmounts-amtMilkDeliveries.css';
import Highcharts from 'highcharts';
import {HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, SplineSeries} from 'react-jsx-highcharts';

class AmtMilkDeliveriesDeliveryCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      coopId: '',
      actualEntries: [],
      entries: [],
      Gduration: 1500,
      startDate: '',
      endDate: '',
      dateTimeLabelFormats: {
        second: '%Y-%m-%d<br/>%H:%M:%S',
        minute: '%Y-%m-%d<br/>%H:%M',
        hour: '%Y-%m-%d<br/>%H:%M',
        day: '%Y<br/>%m-%d',
      }
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
    console.log("---------------------------------------------------------Calculate Date Start----------------------------------------------------------------------"); 
    var start = new Date(startDate);
    var end = new Date(endDate);
    let noOfDays = (parseInt((end - start) / (24 * 3600 * 1000)))+1;//this gets the number of days between the dates
    console.log("startDate: "+startDate+"    endDate: "+endDate);
    console.log("Date Difference: "+parseInt(end - start));
    console.log("No. of Days: "+noOfDays);
    var loopDate  = new Date(startDate);
    let newState= this.state;
    this.getCoopsData(localStorage.getItem('cp-sl-id'),startDate,endDate,noOfDays);
    console.log("----------------------------------------------------------Calculate Date End---------------------------------------------------------------------"); 

    //for(let i=1; i<=noOfDays; i++){
      //console.log("Loop Date: "+loopDate.toDateString()); 
      //console.log("Loop Date: "+(loopDate.toDateString()).substring(3,7)); 
      //console.log("sendDate: "+sendDate);
      //this.getCoopsData(localStorage.getItem('cp-sl-id'),sendDate,endDate,noOfDays);
      //milkDeliveries[milkDeliveries.length] = this.getCoopsData(this.props.passCoopId,sendDate,endDate,noOfDays);
      //loopDate.setDate(loopDate.getDate()+1);
    //}
  }

  // getCoopsData(localStorage.getItem('cp-sl-id'),sendDate,endDate)
  getCoopsData(id,startDate,endDate,noOfDays){//this function populates the coops list in the search bar
    console.log("getCoopsData function has been called");
    fetch('https://emata-ledgerservice-test.laboremus.no/api/ledger/ledger-entries-in-period?organisationId='+id+'&entryType=1'+'&startDate='+startDate+'&endDate='+endDate,{
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
      //console.log("the deliveries: "+res.noOfEntries);
      
      let newState= this.state;
      let sortedDateArray=[];
      sortedDateArray = res.farmerLedgerEntries;//this stores the dates from the API-endpoint to the state dates array(in date fomart)
      sortedDateArray.sort(function(a,b){return new Date(a.entryDateTime) - new Date(b.entryDateTime)});
      console.log("sorted-Object-Array: ",sortedDateArray);
      for(let i=0; i<sortedDateArray.length; i++){//sorting the entries by date so as to get total deliveries in one day
        let entryDate = new Date(sortedDateArray[i].entryDateTime);//getting a new date from the array;
        let amountOfMilk = sortedDateArray[i].milkDelivered.quantity;
        let prevEntryDate = '';
        console.log("--------------------------------------------------------------------------------------------------------------------------------");
        console.log('sortarray length: '+sortedDateArray.length);
        console.log('forloop interation: '+i);
        if(newState.entries.length>0){prevEntryDate=newState.entries[newState.entries.length-1].entryDateTime;
          console.log('prev-new: '+prevEntryDate.getMonth()+'-'+entryDate.getMonth()+' '+prevEntryDate.getMonth()+'-'+entryDate.getMonth()+' '+prevEntryDate.getFullYear()+' '+entryDate.getFullYear());
        }//check if the previous date entry already exists
        
        if(newState.entries.length===0){
          console.log('array start');
          newState.entries[newState.entries.length] = {'entryDateTime': entryDate , 'noOfEntries': 1, 'amountOfMilk': amountOfMilk};
          console.log("Entries: ",newState.entries);
        }
        //Adding Entries of the same date
        else if((prevEntryDate.getDate()===entryDate.getDate()) && (prevEntryDate.getMonth()===entryDate.getMonth()) && (prevEntryDate.getFullYear()===entryDate.getFullYear())){
          console.log('array adding');
          newState.entries[(newState.entries.length)-1] = {'entryDateTime': entryDate , 'noOfEntries': (newState.entries[newState.entries.length-1].noOfEntries)+1, 'amountOfMilk': (newState.entries[newState.entries.length-1].amountOfMilk)+amountOfMilk};
          console.log("Adding Entries: ",newState.entries);
        }
        else{//add a new entry to array
          console.log('array new');
          newState.entries[newState.entries.length] = {'entryDateTime': entryDate , 'noOfEntries': 1, 'amountOfMilk': amountOfMilk};
          console.log("New Entries: ",newState.entries);
        }
      }
      for(let i=0; i<newState.entries.length; i++){//loop to convert the entries array date to date.UTC
        let entryDate = new Date(newState.entries[i].entryDateTime);//getting a new date from the array;
        newState.entries[i] = [Date.UTC(entryDate.getFullYear(), entryDate.getMonth(), entryDate.getDate()) , newState.entries[i].amountOfMilk]
        //{'entryDateTime': entryDate , 'noOfEntries': 1};
      }
      console.log('newState.entries: ',newState.entries);
      newState.Gduration = newState.Gduration+0.0001;
      this.setState(newState);
      console.log("state: ", this.state);
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
    return(
        <HighchartsChart  
          className="aveDeliverySizeDeliveryGraph"
          plotOptions={plotOptions} 
          tooltip={tooltip} 
          height={325}
        >
          <Chart />
          <Title></Title>
          <XAxis type = 'datetime' dateTimeLabelFormats={this.state.dateTimeLabelFormats}>
            <XAxis.Title>Date</XAxis.Title>
            <SplineSeries name="amount Of Milk (ltr)" data= {this.state.entries} />
          </XAxis>
          <YAxis>
            <YAxis.Title>amount Of Milk (ltr)</YAxis.Title>
          </YAxis>
        </HighchartsChart>
    );
  } 
}

export default withHighcharts(AmtMilkDeliveriesDeliveryCard, Highcharts);
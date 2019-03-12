import React, { Component } from 'react';
import 'react-dom';
import './stylings/farmers.css';
import Highcharts from 'highcharts';
import {HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, SplineSeries} from 'react-jsx-highcharts';

class FarmersCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      contacts: [],
      object:[],
      obj:[],
      daysWeek:[],
      dateTimeLabelFormats: {
        second: '%Y-%m-%d<br/>%H:%M:%S',
        minute: '%Y-%m-%d<br/>%H:%M',
        hour: '%Y-%m-%d<br/>%H:%M',
        day: '%Y<br/>%m-%d',
      }
    };
    //  this.getContactsData = this.getContactsData.bind(this);
    //  this.getLedgerData = this.getLedgerData.bind(this);
    //  this.handleFarmersGraph = this.handleFarmersGraph.bind(this);
    //  this.setFarmersGraphData= this.setFarmersGraphData.bind(this);
  }
 
  
// calcaulating the number of days within the range
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



	static getDerivedStateFromProps(newProp=this.props, state=this.state){
		console.log("------------Milk Collection received props-------------");
		let newState = state;
		newState.object = newProp;
    return newState;
	}

  // componentDidUpdate(){
  //   this.handleFarmersGraph(this.props);
  // }

componentDidUpdate(){
  this.setgraphData(this.props);
  this.handleFarmersGraph(this.props);
  }

  getContactsData(id){
    console.log("famers function has been called");
   try{
    fetch(
      `https://emata-crmservice-test.laboremus.no/api/contact/role?OrganisationId=${id}&types=1`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
          "Transfer-Encoding": "chunked",
          "Content-Type": "application/json;charset=UTF-8",
          "Content-Encoding": "gzip",
          Vary: "Accept-Encoding",
          "X-Content-Type-Options": "nosniff",
          "types": 1
        },
        method: "GET"
      })
    .then(response=>response.json())
    .then(res=>{
      let st = this.state;
      st.contacts = res;
      this.setState(st);
      console.log(this.state.contacts);
      return res;
    })
   }catch(e){console.log(e);}
  }

//   getLedgerData(id){
//     console.log("Ledger function has been called");
//     fetch(
//       `https://emata-ledgerservice-test.laboremus.no/api/ledger/ledger-entries-in-period?organisationId=e4c4ffd3-a540-46f1-b279-08d5bca66d34&entryType=1&startDate=2018%2F05%2F21&endDate=2018%2F12%2F311`,
//       {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("Token"),
//           "Transfer-Encoding": "chunked",
//           "Content-Type": "application/json;charset=UTF-8",
//           "Content-Encoding": "gzip",
//           Vary: "Accept-Encoding",
//           "X-Content-Type-Options": "nosniff",
//         },
//         method: "GET"
//       })
//     .then(response=>response.json())
//     .then(res=>{
//       this.handleFarmersGraph(res);      
//     });
//   }

//   setFarmersGraphData(id){
//     this.getContactsData(id);
//     this.getLedgerData(id);
//   }
setgraphData = (object) =>{
  console.log("OBJECT RECIEVED",object);
  let obj = object.passCoopData;
  let graphData = [];
  let getstartDate = object.passCoopDates.start;
  let getendDate =  object.passCoopDates.end;
  let temporaryDate;
  let counter;

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }  
for(temporaryDate = new Date(getstartDate); temporaryDate <=getendDate; temporaryDate = addDays(temporaryDate,1)){
  counter = 0;
  let year1 = temporaryDate.getFullYear();
  let month1 = temporaryDate.getMonth();
  let day1 = temporaryDate.getDay();

  for(let i = 0; i < obj.length; i++){
    let deliveries = obj[i].entryDateTime;
    let year2 = deliveries.getFullYear();
    let month2 = deliveries.getMonth();
    let day2 = deliveries.getDay();

    if(year1 === year2 && month1 === month2 && day1 === day2){
      counter++;
    }
  }
  graphData.push({'date': temporaryDate,'data' : counter});
  
}
console.log(graphData);
};

  
  handleFarmersGraph = (object)=>{
    this.getContactsData();
   

    let startDate = "";
    let endDate = "";
    let weeks;

    let graphData = [];
    let temperyDate = new Date();
  
//changing the start and end date into days, weeeks//
if(object.passCoopDates){
    let formateDate; 
    let dateRange;
    
    startDate = object.passCoopDates.start;
    endDate = object.passCoopDates.end;

    dateRange = this.mydiff(startDate,endDate,"days");
    weeks = this.mydiff(startDate,endDate,"weeks");
    console.log(weeks," weeks");
    }

    //passing the coopdates and coopdata form the API to populate the farmers Id//
    if(object.passCoopDates && object.passCoopData){
      let i = 0;
      let j = 0;
      let days = [];
      let found = 0;
      let obj = object.passCoopData;
      let dt= "";
      let flag = 0;
      let contacts = [];
      let activeFarmers = 0;
  
      for(i=0;i<obj.length;i++){//checking if the contact is equal to farmerId
        let id = obj[i].farmerId;
        // contacts.push(id);
        for(j=0;j<=obj.length;j++){
          if(contacts[j] === id){
            flag = 1;
            break;        
          }  
        }
        if(flag === 0){//if the flage is o push the id into the contact array
          contacts.push(id);
        }
        else{
          flag = 0;
        }

        }

        if(contacts.length !== 0){//check if the contact array is not eual to zero
        function addDays(date, days) {
          var result = new Date(date);
          result.setDate(result.getDate() + days);
          return result;
        }
        for(i=0;i<contacts.length;i++){//loop though the array to get contacts Id
          let contact = contacts[i];
          let contactActive = false;
          let contactActiveCounter = 0;
          let weekDelivery = 0;
          let activeness = 0;
          let inactiveFarmer = this.state.contacts;

          let tempStartDate = new Date(startDate);
          let tempEndDate = addDays(tempStartDate,7);

          for(j=0;j<=obj.length;j++,tempStartDate = addDays(tempEndDate,1)){//loop though the inner loop get set the temporary date and add 7 days 
            tempEndDate = addDays(tempStartDate,7);
            let lastWeekFlag = 1;
            // console.log(tempStartDate, "----", tempEndDate);


            
            for(let p=0;p<obj.length;p++){// loop the array to get the length of entry date time
              let entryDateTime = new Date(obj[p].entryDateTime);
              if(contact && contact === obj[p].farmerId && entryDateTime >= tempStartDate && entryDateTime <= tempEndDate){//checking if the contact is equal to farmerId and entry date time is greater or equal to temporary start and end date
                if(lastWeekFlag === 1 || weekDelivery === 1){//checking for last week and this week delivery if is equal to 1, 0
                  contactActiveCounter++;
                  lastWeekFlag = 1;
                  break;
  
                }else{
                  lastWeekFlag = 0;
                }
                weekDelivery = 1
              }else{
                weekDelivery = 0;
              }
            }
            
        }


        activeness = (contactActiveCounter/weeks)*100 //calculating the activeness of a farmer
        activeness = Math.round(activeness); //rounding the whole number 
        (activeness <60) ? activeFarmers = activeFarmers + 1 : activeFarmers = activeFarmers + 1;//checking if the farmer deliver over 60% of milk
        inactiveFarmer = (this.state.contacts.length) - (activeFarmers);//calculating the inactive farmer 
        //console.log("CONTACTS",this.state.contacts);


        console.log("Farmer id = ",contact,"consistence detection = ",contactActiveCounter,"Consistence = ",activeness,"%");
        console.log(activeFarmers,"Active farmers");  
        console.log(inactiveFarmer,"Inactive farmer")    
      }     
      }
      // console.log(contacts); 
      

  
    }
  
  };


  render(){
    const categories = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const labels = { style: { fontSize: "40px" } };
    const plotOptions = {
      series: { animation: { duration: 2000 } }
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
            <label className="contentNumber2">30 </label>
            <label className="content">active farmers</label>
          </div>
          <div className="textCards">
            <label className="contentNumber3">71 </label>
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

//data={[3.9,4.2, 5.7,8.5,11.9,15.2,17.0,16.6,14.2,10.3,6.6,4.8]}
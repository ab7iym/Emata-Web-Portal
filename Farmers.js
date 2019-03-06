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
 
  
  // componentWillMount(){
  //   this.setFarmersGraphData(localStorage.getItem('cp-sl-id'));
   
  // }
  // componentDidMount() {
  //   this.test();
  //   this.subtract();
  // }

  

	static getDerivedStateFromProps(newProp=this.props, state=this.state){
		console.log("------------Milk Collection received props-------------");
		let newState = state;
		newState.entries = newProp.passCoopData;
    return newState;
    // this.handleFarmersGraph(this.props);
	}

//   getContactsData(id){
//     console.log("famers function has been called");
//    try{
//     fetch(
//       `https://emata-crmservice-test.laboremus.no/api/contact/role?OrganisationId=${id}&types=1`,
//       {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("Token"),
//           "Transfer-Encoding": "chunked",
//           "Content-Type": "application/json;charset=UTF-8",
//           "Content-Encoding": "gzip",
//           Vary: "Accept-Encoding",
//           "X-Content-Type-Options": "nosniff",
//           "types": 1
//         },
//         method: "GET"
//       })
//     .then(response=>response.json())
//     .then(res=>{
//       let st = this.state;
//       st.contacts = res;
//       this.setState(st);
//       console.log(this.state.contacts);
//       return res;
//     })
//    }catch(e){console.log(e);}
//   }

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

//   test = ()=>{
//     if(this.state.entries.length !== 0 && this.state.contacts.length !== 0){
//     console.log(this.state.contacts.length);
//     console.log(this.state.entries);
//     alert()
//     this.handleFarmersGraph();
//   };

 
//   };  

//   setFarmersGraphData(id){
//     this.getContactsData(id);
//     this.getLedgerData(id);
//   }
  
  handleFarmersGraph = (object)=>{
    console.log(object);

    if(object.passCoopDates){
      let startDate = object.passCoopDates.start;
      let endDate = object.passCoopDates.end;
    }
    if(object.passCoopDates){
    // let i = 0;
    // let j = 0;
    // let days = [];
    // let found = 0;
    // let obj = object.farmerLedgerEntries;
    // let dt= "";   
    
    // console.warn(obj[0].entryDateTime);


    // for(i=0;i<obj.length;i++){
    //   let yr = new Date(obj[i].entryDateTime).getFullYear();
    //   let mt = new Date(obj[i].entryDateTime).getMonth();
    //   let dy = new Date(obj[i].entryDateTime).getDate();
    //   dt = yr+"-"+mt+"-"+dy;


    //   for(j=0;j<=obj.length;j++){
    //     if(days[j] === dt){
    //       found = 1;
    //       break;        
    //     }  
    //   }
    //   if(found === 0){
    //     days.push(dt);
    //   }else{found = 0;
    //   }

    //   }
  

    //  console.log(days); 
  }

  };

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
      case "weeks"  : return Math.floor(timediff / week);
      case "days"   : return Math.floor(timediff / day); 
      case "hours"  : return Math.floor(timediff / hour); 
      case "minutes": return Math.floor(timediff / minute);
      case "seconds": return Math.floor(timediff / second);
      default: return undefined;
  }
}
subtract(){
    let startDate = new Date(2018,5,21);
    let endDate = new Date(2018,12,31);
    let formateDate; 
    let dateRange;
    let weeks;

    dateRange = this.mydiff(startDate,endDate,"days");
    weeks = this.mydiff(startDate,endDate,"weeks");
    console.log(weeks);
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
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
      dateTimeLabelFormats: {
        second: '%Y-%m-%d<br/>%H:%M:%S',
        minute: '%Y-%m-%d<br/>%H:%M',
        hour: '%Y-%m-%d<br/>%H:%M',
        day: '%Y<br/>%m-%d',
      }
    };
     this.getContactsData = this.getContactsData.bind(this);
     this.getLedgerData = this.getLedgerData.bind(this);
     this.handleFarmersGraph = this.handleFarmersGraph.bind(this);
     this.setFarmersGraphData= this.setFarmersGraphData.bind(this);
  }
  
  componentWillMount(){
    this.setFarmersGraphData(localStorage.getItem('cp-sl-id'));
  }
  componentDidMount() {
    this.test();
    // this.handleFarmersGraph('e4c4ffd3-a540-46f1-b279-08d5bca66d34')
  }

  getContactsData(id){
    //this function populates the payment method list in the payment graph
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

  getLedgerData(id){
    //this function populates the payment method list in the payment graph
    console.log("Ledger function has been called");
    fetch(
      `https://emata-ledgerservice-test.laboremus.no/api/ledger/entries-for-organisation?organisationId=${id}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
          "Transfer-Encoding": "chunked",
          "Content-Type": "application/json;charset=UTF-8",
          "Content-Encoding": "gzip",
          Vary: "Accept-Encoding",
          "X-Content-Type-Options": "nosniff",
        },
        method: "GET"
      })
    .then(response=>response.json())
    .then(res=>{
      let st = this.state;
      st.entries = res;
      this.setState(st);
      console.log(this.state.entries);
    });
  }

  test = ()=>{
    if(this.state.entries.length !== 0 && this.state.contacts.length !== 0){
    console.log(this.state.contacts.length);
    console.log(this.state.entries);
    alert()
    this.handleFarmersGraph();
  };

 
  };  

  setFarmersGraphData(id){
    this.getContactsData(id);
    this.getLedgerData(id);
  }
  
  handleFarmersGraph(){
    // let contacts =this.state.contacts;
    // let len = contacts.len;
    // console.log(contacts)
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
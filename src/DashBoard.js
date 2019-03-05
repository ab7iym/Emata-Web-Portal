import React from "react";
import {Redirect} from 'react-router-dom';
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Loader from './components/loadingDashBoard';
import NavbarV2 from "./components/NavbarV2";
import MonthlyOverview from './components/monthlyOverview';
import DeliveryAmounts from './components/deliveryAmounts';
import Payment from './components/Payment';
import Farmers from './components/Farmers';
import UtilizationRate from './components/utilizationRate';
import './stylings/dashboard.css';

class FullWidthGrid extends React.Component{
    constructor(props){
      super(props);
      this.state={
        coopId: "",
        coopName: '',//localStorage.getItem('cp-sl-nm'),
        startDate: '',
        endDate: '',
        entries: '',
        dateRangeEntries: [],
        renewTokenDetails: '',
        paymentMethodData: [],
        showLoader: false
      }
      this.renewToken= this.renewToken.bind(this);
      this.verification=this.verification.bind(this);
      this.getCoopsData=this.getCoopsData.bind(this);
      this.getDataByDateRange=this.getDataByDateRange.bind(this);
      this.paymentMethod=this.paymentMethod.bind(this);
    }
    handleCoopSignal=(id,name)=>{
      let newState=this.state;
      newState.coopId=id;
      newState.coopName= name;
      newState.showLoader=true;
      this.setState(newState);
      //get the whole time range of the data needed from the 1st of the previous year to the current date
      var end = new Date();
      var start = new Date();
      start.setDate(1);
      start.setMonth(0);
      start.setFullYear(end.getFullYear()-1);

      //console.log("startDate: "+start+" endDate: "+end);
      console.log("ID Passed: ", this.state.coopId,"Name Passed: ", this.state.coopName);
      console.log("Start-Date Passed: ", this.state.startDate);
      console.log("End-Date Passed: ", this.state.endDate);
      this.paymentMethod(this.state.coopId);
      this.getCoopsData(this.state.coopId,start,end,this.state.startDate,this.state.endDate);
    };
    handleDateSignal=(startDate,endDate)=>{
      if(this.state.startDate!==startDate || this.state.endDate!==endDate){
        let newState=this.state;
        newState.startDate=startDate;
        newState.endDate=endDate;
        let dataRange=this.getDataByDateRange(newState.entries,startDate,endDate);
        newState.dateRangeEntries = dataRange;
        //newState.showLoader=true;
        this.setState(newState);
        console.log("Start-Date Passed: ", this.state.startDate);
        console.log("End-Date Passed: ", this.state.endDate);
      }
    };
    showLoader(){
      console.log("showLoader Started");
      if(this.state.showLoader){return <Loader/>}
    }

    /*componentDidMount(){
      this.timer = setInterval(this.renewToken, 80000);
      //console.log("---------------------renewTokenDetails b4 save: ", localStorage.getItem('cred'));
      //let newState=this.state;
      //newState.renewTokenDetails=localStorage.getItem('cred');
      //this.setState(newState);
      //localStorage.removeItem('cred');
      console.log("---------------------renewTokenDetails: ", this.state.renewTokenDetails.username);
    }*/

    //componentWillUnmount(){clearInterval(this.timer);}

    renewToken(){
      console.log("-------Renewing token------");
      fetch('https://emata-authservice-test.laboremus.no/users/login',{
         headers: {
            'Access-Control-Allow-Origin':'http://localhost:3000/',
            'Accept':'application/json',
            'Content-Type':'application/json',//'application/x-www-form-urlencoded',//'application/json;charset=UTF-8',
            'Content-Encoding':'gzip',
            'Access-Control-Allow-Headers':'Origin, Authorization, X-Requested-With, Content-Type, Accept, Cache-Control',
            'Access-Control-Allow-Credentials':'true',
            'Access-Control-Allow-Methods':'POST',
            'Transfer-Encoding': 'chunked',
            'Vary':'Accept-Encoding',
            'X-Content-Type-Options':'nosniff',
          },
          method:'POST',
          body: JSON.stringify(this.state.renewTokenDetails)
      })
      .then(response=>response.json())
      .then(res=>{this.verification(res);})
    }
    verification(serverResponse){
      console.log("This is the feedback: "+this.verification.serverResponse);
      console.log("---------------------------------------");
      console.log("Status: "+serverResponse.code);
      if(serverResponse.code===400){//please try again later alert needed

      }
      else if(serverResponse.code===500){
          console.log("---------------------------------------");
          console.log("StatusMessage: "+serverResponse.message);
      }
      else{
          console.log("---------------------------------------");
          localStorage.setItem('Token',serverResponse.accessToken);//saving the token to local storage in the browser
          console.log("Access Token: "+serverResponse.accessToken);
      }
    }

    getCoopsData(id,startDate,endDate,startDateRange,endDateRange){//this function populates the coops list in the search bar
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
      
      let newState= this.state;
      let sortedDateArray=[];
      let dataRange='';
      sortedDateArray = res.farmerLedgerEntries;//this stores the data of only the farmers' entries
      sortedDateArray.sort(function(a,b){return new Date(a.entryDateTime) - new Date(b.entryDateTime)});
      console.log("sorted-Object-Array: ",sortedDateArray);
      dataRange=this.getDataByDateRange(sortedDateArray,startDateRange,endDateRange);//sorting by the date range and assigning it to dateRange
      newState.Gduration = newState.Gduration+0.0001;
      newState.showLoader = false;//turning off the loader component
      newState.entries = sortedDateArray;
      newState.dateRangeEntries = dataRange;
      localStorage.setItem('dateRangeEntries', newState.dateRangeEntries);
      this.setState(newState);
      console.log("state: ", this.state);//*/
    })
    .catch((error)=>{
        return(error);//reject(error);
    });
  };
  getDataByDateRange(sortedDateArray,startDate,endDate){
    let start=new Date(startDate);
    let end=new Date(endDate);
    let dataRange=[];
    for(let i=0; i<sortedDateArray.length; i++){
      if((new Date(sortedDateArray[i].entryDateTime))>=start && (new Date(sortedDateArray[i].entryDateTime))<=end){
        dataRange[dataRange.length]=sortedDateArray[i];
      }
    }
    return dataRange;
  }

  paymentMethod(id){//this function populates the payment method list in the payment graph
    console.log("---------------------paymentMethod function has been called------------------------");
    fetch(" https://emata-crmservice-test.laboremus.no/api/payment/method?organisationId="+id,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
        "Transfer-Encoding": "chunked",
        "Content-Type": "application/json;charset=UTF-8",
        "Content-Encoding": "gzip",
        Vary: "Accept-Encoding",
        "X-Content-Type-Options": "nosniff"
      },
      method: "GET"
    })
    .then(response => response.json())
    .then(res=>{
      console.log("paymentMethod Res dashboard",res);
      let newState= this.state;
      newState.paymentMethodData = res;
      this.setState(newState);
    })
    .catch(error => {return error;}); //reject(error);
  }

  render(){
    let classes = this.props;
    if(!localStorage.getItem("Token")){
      return (<Redirect exact to={'/'}/>)
    }
    else{
      return <div>
        <div className="dashboardNavDiv">
          <NavbarV2 
            passCoopSignal={(id,name)=>this.handleCoopSignal(id,name)} 
            passDateSignal={(startDate,endDate)=>this.handleDateSignal(startDate,endDate)}
          />
          {this.showLoader()}
        </div>
        <div className="dashboardGraphContainer">
          <div className={classes.root}>
            <Grid container spacing={24}>
              <Grid item xs={1} sm={12}>
                <Paper className="titleCard">
                  <p className="title">{this.state.coopName}</p>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className="monthlyOVCard">
                  <p className="cardNames">Annual Milk Collections</p>
                  <MonthlyOverview passCoopData={this.state.entries}/>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className="deliveryDetailsCard">
                  <p className="cardNames">Deliveries</p>
                  <DeliveryAmounts passCoopData={this.state.dateRangeEntries}/>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className="farmersCard">
                  <p className="cardNames">Farmers Demographics</p>
                  <Farmers 
                    passCoopData={this.state.dateRangeEntries}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={3} lg={2}>
                <Paper className="utilizationCard">
                  <p className="utilizationcardName">Utilization Rate</p>
                  <UtilizationRate passCoopData={this.state.dateRangeEntries}/>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper className="paymentCard">
                  <p className="cardNames">Payments</p>
                  <Payment passCoopData={this.state.paymentMethodData}/>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    }
  }
}

FullWidthGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default FullWidthGrid;

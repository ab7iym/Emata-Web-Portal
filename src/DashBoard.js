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
        coopName : localStorage.getItem('cp-sl-nm'),
        startDate : '',
        endDate : '',
        renewTokenDetails: '',
        showLoader: false
      }
      this.renewToken= this.renewToken.bind(this);
      this.verification=this.verification.bind(this);
    }
    handleCoopSignal=(id,name)=>{
      //alert(id+" "+name);
      let newState=this.state;
      newState.coopId=id;
      newState.coopName= name;
      newState.showLoader=true;
      this.setState(newState);
      console.log("ID Passed: ", this.state.coopId,"Name Passed: ", this.state.coopName);
    };
    handleDateSignal=(startDate,endDate)=>{
      if(this.state.startDate!==startDate || this.state.endDate!==endDate){
        let newState=this.state;
        newState.startDate=startDate;
        newState.endDate=endDate;
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

    componentDidMount(){
      this.timer = setInterval(this.renewToken, 80000);
      //console.log("---------------------renewTokenDetails b4 save: ", localStorage.getItem('cred'));
      //let newState=this.state;
      //newState.renewTokenDetails=localStorage.getItem('cred');
      //this.setState(newState);
      //localStorage.removeItem('cred');
      console.log("---------------------renewTokenDetails: ", this.state.renewTokenDetails.username);
    }

    componentWillUnmount(){clearInterval(this.timer);}

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
                    <p className="cardNames">Milk collections</p>
                    <MonthlyOverview/>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className="deliveryDetailsCard">
                    <p className="cardNames">Deliveries</p>
                    <DeliveryAmounts 
                      passCoopId={this.state.coopId}
                      passStartDate={this.state.startDate} 
                      passEndDate={this.state.endDate}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className="farmersCard">
                    <p className="cardNames">Farmers</p>
                    <Farmers 
                      passCoopId={this.state.coopId}
                      passStartDate={this.state.startDate} 
                      passEndDate={this.state.endDate}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={3} lg={2}>
                  <Paper className="utilizationCard">
                    <p className="utilizationcardName">Utilization Rate</p>
                    <UtilizationRate 
                      passCoopId={this.state.coopId}
                      passStartDate={this.state.startDate} 
                      passEndDate={this.state.endDate}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper className="paymentCard">
                    <p className="cardNames">Payments</p>
                    <Payment passCoopId={this.state.coopId}/>
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



/*
//Linear buffer code to indicate loading
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class LinearBuffer extends React.Component {
  state = {
    completed: 0,
    buffer: 10,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    if (completed > 100) {
      this.setState({ completed: 0, buffer: 10 });
    } else {
      const diff = Math.random() * 10;
      const diff2 = Math.random() * 10;
      this.setState({ completed: completed + diff, buffer: completed + diff + diff2 });
    }
  };

  render() {
    const { classes } = this.props;
    const { completed, buffer } = this.state;
    return (
      <div className={classes.root}>
        <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} />
        <br />
        <LinearProgress color="secondary" variant="buffer" value={completed} valueBuffer={buffer} />
      </div>
    );
  }
}

LinearBuffer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearBuffer);

*/
import React from "react";
import {Redirect} from 'react-router-dom';
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LinearProgress from '@material-ui/core/LinearProgress';
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
        completed: 0,
        buffer: 10,
      }
    }
    handleCoopSignal=(id,name)=>{
      alert(id+" "+name);
      this.setState({coopId : id});
      this.setState({coopName : name});
    };

    componentDidMount(){this.timer = setInterval(this.progress, 500);}

    componentWillUnmount(){clearInterval(this.timer);}

    progress = () => {
      const { completed } = this.state;
      if (completed > 100) {
        this.setState({ completed: 0, buffer: 10 });
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        //this.setState({ completed: completed + diff, buffer: completed + diff + diff2 });
      }
    };

    render(){
      let classes = this.props;
      if(!localStorage.getItem("Token")){
        return (<Redirect exact to={'/'}/>)
      }
      else{
        return <div>
          <NavbarV2 passCoopSignal={(id,name)=>this.handleCoopSignal(id,name)}/>
          <LinearProgress color="secondary" variant="buffer" value={this.state.completed} valueBuffer={this.state.buffer} />
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
                    <DeliveryAmounts/>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className="farmersCard">
                    <p className="cardNames">Farmers</p>
                    <Farmers/>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={3} lg={2}>
                  <Paper className="utilizationCard">
                    <p className="utilizationcardName">Utilization Rate</p>
                    <UtilizationRate/>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper className="paymentCard">
                    <p className="cardNames">Payments</p>
                    <Payment />
                  </Paper>
                </Grid>
              </Grid>
            </div>;
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
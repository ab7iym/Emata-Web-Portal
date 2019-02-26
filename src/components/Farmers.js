import React, { Component } from 'react';
import 'react-dom';
import './stylings/farmers.css';
import Highcharts from 'highcharts';
import {HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, SplineSeries} from 'react-jsx-highcharts';

class FarmersCard extends Component {
  render(){
    const categories= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const labels= {style: {fontSize:'40px'}}
    const plotOptions = {
      series: {animation:{duration: 2000}}
    };
    var tooltip = {valueSuffix: 'entries'}
    return(
      <div>
        <div className="textRow">
          <div className="textCards">
            <label className="contentNumber1">101 </label>
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
          <Title></Title>
          <XAxis categories={categories} lable = {labels}>
            <XAxis.Title>Months</XAxis.Title>
          </XAxis>
          <YAxis>
            <YAxis.Title>No. of deliveries</YAxis.Title>
            <SplineSeries name="Active Farmers" color="#1AB394" data= {[3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]} />
           </YAxis>
        </HighchartsChart>
        </div>
    );
  } 
}

export default withHighcharts(FarmersCard, Highcharts);


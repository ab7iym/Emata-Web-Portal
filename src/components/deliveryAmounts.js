import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './stylings/deliveryAmount.css';
import Highcharts from 'highcharts';
import {HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, ColumnSeries, SplineSeries, PieSeries} from 'react-jsx-highcharts';

class DeliveryCard extends Component {
  render(){
    const categories= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const labels= {style: {fontSize:'40px'}}
    const plotOptions = {
        series: {animation:{duration: 2000}}
      };
      var tooltip = {valueSuffix: 'ltrs'}
      return(
        <div>
          <div className="buttonsRow">
              <button className="deliveryButtons" onclick="openCity('3')">No. of deliveries</button>
              <button className="deliveryButtons" onclick="openCity('2')">Ave. delivery size</button>
              <button className="deliveryButtons" onclick="openCity('1')">Amt. of milk deliveries</button>
          </div>
          <HighchartsChart  
            className="deliveryGraph"
            plotOptions={plotOptions} 
            tooltip={tooltip} 
            height={325}
          >
            <Chart />

            <Title></Title>

            <XAxis categories={categories} lable = {labels}>
              <XAxis.Title>Months</XAxis.Title>
            </XAxis>
            <YAxis>
              <YAxis.Title>Quantity (ltrs)</YAxis.Title>
              <SplineSeries name="Average" data= {[3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]} />
            </YAxis>
          </HighchartsChart>
          </div>
      );
    } 
}

export default withHighcharts(DeliveryCard, Highcharts);


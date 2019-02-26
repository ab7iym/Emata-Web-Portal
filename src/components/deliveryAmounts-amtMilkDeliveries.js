import React, { Component } from 'react';
import 'react-dom';
import './stylings/deliveryAmounts-noOfDeliveries.css';
import Highcharts from 'highcharts';
import {HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, ColumnSeries, SplineSeries} from 'react-jsx-highcharts';

class NoOfDeliveriesDeliveryCard extends Component {
  render(){
    const categories= ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const labels= {style: {fontSize:'40px'}}
    const plotOptions = { series: {animation:{duration: 2000}}};
    var tooltip = {valueSuffix: 'ltrs'}
    return(
        <HighchartsChart  
          className="noOfDeliveriesdeliveryGraph"
          plotOptions={plotOptions} 
          tooltip={tooltip} 
          height={325}
        >
          <Chart />

          <Title></Title>

          <XAxis categories={categories} lable = {labels}>
            <XAxis.Title>Days</XAxis.Title>
          </XAxis>
          <YAxis>
            <YAxis.Title>Quantity (ltrs)</YAxis.Title>
            <SplineSeries name="deliveries" data= {[0, 4.9, 5.2, 5.7, 8.5, 9.9, 5.2]} />
          </YAxis>
        </HighchartsChart>
    );
  } 
}

export default withHighcharts(NoOfDeliveriesDeliveryCard, Highcharts);


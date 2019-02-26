import React, { Component } from 'react';
import 'react-dom';
import './stylings/deliveryAmounts-aveDeliverySize.css';
import Highcharts from 'highcharts';
import {HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, ColumnSeries, SplineSeries} from 'react-jsx-highcharts';

class AveDeliverySizeDeliveryCard extends Component {
  render(){
    const categories= ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const labels= {style: {fontSize:'40px'}}
    const plotOptions = { series: {animation:{duration: 2000}}};
    var tooltip = {valueSuffix: 'ltrs'}
    return(
        <HighchartsChart  
          className="aveDeliverySizeDeliveryGraph"
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
            <YAxis.Title>Quantity</YAxis.Title>
            <SplineSeries name="deliveries" data= {[0, 3.9, 5.2, 8.7, 15.5, 20.9, 15.2]} />
          </YAxis>
        </HighchartsChart>
    );
  } 
}

export default withHighcharts(AveDeliverySizeDeliveryCard, Highcharts);


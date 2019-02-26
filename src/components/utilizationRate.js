import React, { Component } from 'react';
import 'react-dom';
import './stylings/utilization.css';
import Highcharts from 'highcharts';
import {HighchartsChart, Chart, withHighcharts, Title, Legend, PieSeries} from 'react-jsx-highcharts';

class UtilizationCard extends Component {
  render(){
    const pieData = [
      {name: 'utilized',y: 36.1,  color: "#1AB394"},
      {name: 'not utilized',y: 63.9, color: "#e05757"}
    ];
    const plotOptions = {
      series: {animation:{duration: 1500}}
    };
    var tooltip = {valueSuffix: '%'}
    return(
      <div>
        <HighchartsChart  
          className="utilizationGraph"
          plotOptions={plotOptions} 
          tooltip={tooltip} 
          height={325}
        >
          <Chart />
          <Title></Title>
          <Legend/>
          <PieSeries name="utilization" data={pieData} size={120} showInLegend={false} />
          
        </HighchartsChart>
        <div>
          <div className="textUtilizationCards">
            <label className="contentUtilizationNumber1">3744</label>
            <label className="contentUtilization">, records</label>
          </div>
          <div className="textUtilizationCards">
            <label className="contentUtilizationNumber2">36.1</label>
            <label className="contentUtilization">% utilization</label>
          </div>
        </div>
        </div>
    );
  } 
}
export default withHighcharts(UtilizationCard, Highcharts);


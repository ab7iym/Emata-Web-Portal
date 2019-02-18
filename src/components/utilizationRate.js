import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './stylings/utilization.css';
import Highcharts from 'highcharts';
import {HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, ColumnSeries, SplineSeries, PieSeries} from 'react-jsx-highcharts';

class UtilizationCard extends Component {
  render(){
    const pieData = [
      {name: 'utilized',y: 36.1, color: "rgba(116,191,252,1.0)"},
      {name: 'not utilized',y: 63.9, color: "#e05757"}
    ];
    const categories= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const labels= {style: {fontSize:'40px'}}
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


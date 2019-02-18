import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './stylings/monthlyOverview.css';
import Highcharts from 'highcharts';
import {HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, ColumnSeries, SplineSeries, PieSeries} from 'react-jsx-highcharts';

class MonthlyOverview extends Component {
 	render(){
 		const categories= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  		const labels= {style: {fontSize:'40px'}}
	 	const plotOptions = {
    		series: {animation:{duration: 1500}}
  		};
  		var tooltip = {valueSuffix: 'ltrs'}
	    return(
	        <HighchartsChart  
	        	className="graph"
				plotOptions={plotOptions} 
		        tooltip={tooltip} 
		    >
	          <Chart />

	          <Title></Title>

	          <Legend />
	          <XAxis categories={categories} lable = {labels}>
	          	<XAxis.Title >Months</XAxis.Title>
	          </XAxis>
	          <YAxis>
	          	<YAxis.Title >Quantity (ltrs)</YAxis.Title>
	            <ColumnSeries name="2018" data={[9,2,1,3,4,7,9,6,1,11,17,15]} />
	            <ColumnSeries name="2017" data={[7,3,5,7,6,9,5,3,4,8,10,9]} />
	            <SplineSeries name="Average" data={[8,2.5,3,5,5,8,7,4.5,2.5,9.5,13.5,12]} />
	          </YAxis>
	        </HighchartsChart>
	    );
    } 
}

export default withHighcharts(MonthlyOverview, Highcharts);


				            //<PieSeries name="Total consumption" data={pieData} center={[100, 80]} size={100} showInLegend={false} />
				        //<ExampleCode name="Combo">{code}</ExampleCode>
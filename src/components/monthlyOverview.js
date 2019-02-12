import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './stylings/monthlyOverview.css';
import Highcharts from 'highcharts';
import {HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, ColumnSeries, SplineSeries, PieSeries} from 'react-jsx-highcharts';

class MonthlyOverview extends Component {
 	render(){
	 	const pieData = [
	 		{name: 'Dwaniro',y: 13},
	 		{name: 'Hannas',y: 23}, 
	 		{name: 'Kasese',y: 19}
	 	];
	    return(
	        <HighchartsChart  className="graph">
	          <Chart />

	          <Title></Title>

	          <Legend />

	          <XAxis categories={['Jan', 'Feb', 'March', 'April', 'May','June','July','Aug','Sept','Oct','Nov','Dec']} />

	          <YAxis>
	            <ColumnSeries name="2018" data={[9,2,1,3,4,7,9,6,1,11,17,15]} />
	            <ColumnSeries name="2017" data={[7,3,5,7,6,9,5,3,4,8,10,9]} />
	            <SplineSeries name="Average" data={[3, 2.67, 3, 6.33, 3.33,3, 2.67, 3, 6.33, 3.33, 10.33, 9.33]} />
	          </YAxis>
	        </HighchartsChart>
	    );
    } 
}

export default withHighcharts(MonthlyOverview, Highcharts);


				            //<PieSeries name="Total consumption" data={pieData} center={[100, 80]} size={100} showInLegend={false} />
				        //<ExampleCode name="Combo">{code}</ExampleCode>
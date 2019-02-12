import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './stylings/deliveryAmount.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import drilldown from 'highcharts-drilldown';

//const Highcharts = Highcharts;

class DeliveryAmount extends Component {
 	constructor() {
	    super();
	    this.state = {
	     	chartData: {
		        "name": "Statistics",
		        "data": [
		          {
		            "name": "mytesting",
		            "y": 25.7,
		            "drilldown": "mytesting",
		            "color": "#6bdad9"
		          },
		          {
		            "name": "June",
		            "y": 25.7,
		            "drilldown": "June",
		            "color": "#6bdad9"
		          },
		          {
		            "name": "July",
		            "y": 28.8,
		            "drilldown": "July",
		            "color": "#a79de7"
		          },
		          {
		            "name": "August",
		            "y": 49.5,
		            "drilldown": "August",
		            "color": "#ad805a"
		          }
		        ],
		        "drilldownData": [
		          {
		            "name": "August",
		            "id": "August",
		            "data": [
		              ["Week 1",26.7],
		              ["Week 2",22.8]
		            ]
		          },
		          {
		            "name": "July",
		            "id": "July",
		            "data": [
		              ["Week 1",2.3],
		              ["Week 2",24.4],
		              ["Week 4",2.1]
		            ]
		          },
		          {
		            "name": "June",
		            "id": "June",
		            "data": [
		              ["Week 4",4],
		              ["Week 5",21.7]
		            ]
		          },
		          {
		            "name": "mytesting",
		            "id": "mytesting",
		            "data": [
		              ["Week 7",17],
		              ["Week 8",21.7]
		            ]
		          }
		        ]
	    	}
    	}
  	}
  
  	componentDidMount() {
    	this.createChart();
  	}

  	render() {
	    return (
	      <div id="column_chart" className="main"></div>
	    );
  	}

  	createChart = () => {
       Highcharts.chart('column_chart', {
            chart: {type: 'column'}, 
            title: { text: 'Payments' },
            subtitle: { text: '' },
            xAxis: {type: 'category'},
            yAxis: {title: { text: '' }},
            legend: {enabled: false},
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}%'
                    }
                }
            },
            series: [
                {
                    name: this.state.chartData.name,
                    colorByPoint: true,
                    data: this.state.chartData.data
                }
            ],
            drilldown: {
                series: this.state.chartData.drilldownData
            }, 
            responsive: {
                rules: [{
                    condition: { maxWidth: 450 },
                }]
            },
            credits: {
                enabled: false
            },
        });
    }

}

export default DeliveryAmount;
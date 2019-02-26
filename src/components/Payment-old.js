import React, { Component } from 'react';
import 'react-dom';
import './stylings/payments.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import drilldown from 'highcharts-drilldown';

//const Highcharts = Highcharts;

class Payment extends Component {
  constructor() {
      super();
      this.state = {
        chartData: {
            "name": "Statistics",
            "data": [
              {
                "name": "Bank",
                "y": 25.7,
                "drilldown": "Bank",
                "color": "#6bdad9"
              },
              {
                "name": "Cash",
                "y": 28.8,
                "drilldown": "Cash",
                "color": "#a79de7"
              },
              {
                "name": "Mobile Money",
                "y": 49.5,
                "drilldown": "Mobile Money",
                "color": "#ad805a"
              }
            ],
            "drilldownData": [
              {
                "name": "Mobile Money",
                "id": "Mobile Money",
                "data": [
                  ["Week 1",26.7],
                  ["Week 2",22.8]
                ]
              },
              {
                "name": "Cash",
                "id": "Cash",
                "data": [
                  ["Week 1",2.3],
                  ["Week 2",24.4],
                  ["Week 4",2.1]
                ]
              },
              {
                "name": "Bank",
                "id": "Bank",
                "data": [
                  ["Week 7",17],
                  ["Week 8",21.7]
                ]
              }
            ]
        }
      }
    }
  
    componentDidMount(){this.createChart();}

    render() {
      return (
        <div className="topDiv">
          <div id="column_chart" className="paymentGraph"></div>
        </div>
      );
    }

    createChart = () => {
       Highcharts.chart('column_chart', {
            chart: {type: 'column',backgroundColor: '#F2F2F2'}, 
            title: { text: '' },
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

export default Payment;
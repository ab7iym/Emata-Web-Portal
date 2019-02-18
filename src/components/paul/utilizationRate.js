import React, { Component } from "react";
import ReactDOM from "react-dom";
//import "./stylings/payments.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts-drilldown";

//const Highcharts = Highcharts;

class Payment extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {
        name: "Statistics",
        data: [
          {
            name: "Daily deliverable",
            y: 28.8,
            drilldown: "Bank",
            color: "#6bdad9"
          },
          {
            name: "Number of farmers",
            y: 49.5,
            drilldown: "Cash",
            color: "#a79de7"
          }
        ],
        drilldownData: [
          {
            name: "Daily deliverable",
            id: "Mobile Money",
            data: [["Week 1", 26.7], ["Week 2", 22.8]]
          },
          {
            name: "Number of farmers",
            id: "Cash",
            data: [["Week 1", 2.3], ["Week 2", 24.4], ["Week 4", 2.1]]
          }
        ]
      }
    };
  }

  componentDidMount() {
    this.createChart();
  }

  render() {
    return (
      <div className="topDiv">
        <div id="column_chart" className="paymentGraph" />
      </div>
    );
  }

  createChart = () => {
    Highcharts.chart("column_chart", {
      chart: { type: "pie", backgroundColor: "#F2F2F2" },
      title: { text: "" },
      subtitle: { text: "" },
      xAxis: { type: "category" },
      yAxis: { title: { text: "" } },
      legend: { enabled: false },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: "{point.y:.1f}%"
          }
        }
      },

      series: [
        {
          name: this.state.chartData.name,
          colorByPoint: true,
          data: this.state.chartData.data,
          step: "left"
        }
      ],
      drilldown: {
        series: this.state.chartData.drilldownData
      },
      responsive: {
        rules: [
          {
            condition: { maxWidth: 450 }
          }
        ]
      },
      credits: {
        enabled: false
      }
    });
  };
}

export default Payment;

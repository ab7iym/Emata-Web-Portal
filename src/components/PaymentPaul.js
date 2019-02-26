import React, { Component } from 'react';
import 'react-dom';
import './stylings/payments.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import drilldown from 'highcharts-drilldown';

const highcharts = Highcharts;

class Payment extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {
        name: "Statistics",
        data: [
          {
            name: "Bank",
            y: 25.7,
            drilldown: "Bank",
            color: "#6bdad9"
          },
          {
            name: "Cash",
            y: 28.8,
            drilldown: "Cash",
            color: "#a79de7"
          },
          {
            name: "Mobile Money",
            y: 49.5,
            drilldown: "Mobile Money",
            color: "#ad805a"
          }
        ],
        drilldownData: [
          {
            name: "Mobile Money",
            id: "Mobile Money",
            data: [["Week 1", 26.7], ["Week 2", 22.8]]
          },
          {
            name: "Cash",
            id: "Cash",
            data: [["Week 1", 2.3], ["Week 2", 24.4], ["Week 4", 2.1]]
          },
          {
            name: "Bank",
            id: "Bank",
            data: [["Week 7", 17], ["Week 8", 21.7]]
          }
        ]
      }
    };
    this.refresh=this.refresh.bind(this);
  }

  componentDidMount() {
   //this.paymentMethod();//*/
    //*
    console.log("Component mounted");
    let newState= this.state;
    newState.chartData.data[0].y = 90;
    newState.chartData.data[1].y = 30;
    newState.chartData.data[2].y = 120;
    this.setState(newState);//*/
   this.createChart();
  }
  refresh(){
    console.log("refreshed");
     let newState= this.state;
     newState.chartData.data[0].y = 20;
     newState.chartData.data[1].y = 150;
     newState.chartData.data[2].y = 10;
     this.setState(newState);//*/
  }

  paymentMethod(){
    //this function populates the payment method list in the payment graph
    console.log("paymentMethod function has been called");
    fetch(" https://emata-crmservice-test.laboremus.no/api/payment/method?organisationId=e4c4ffd3-a540-46f1-b279-08d5bca66d34",{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
        "Transfer-Encoding": "chunked",
        "Content-Type": "application/json;charset=UTF-8",
        "Content-Encoding": "gzip",
        Vary: "Accept-Encoding",
        "X-Content-Type-Options": "nosniff"
      },
      method: "GET"
    })
      .then(response => response.json())
      .then(res=>{
        let contact = res;
        let len = contact.length;
        let Cash = 0;
        let Bank= 0;
        let MobileMoney = 0;

        for(let i = 0; i < len; i++){
          if(contact[i].paymentMethod===2){
            Cash = Cash +1; 
          }
          else if(contact[i].paymentMethod===1){
            Bank = Bank +1;
          }
          else if(contact[i].paymentMethod===3){
            MobileMoney = MobileMoney +1;
          }
          else {return null}
        }
        console.log(Cash, Bank, MobileMoney);

        let newState= this.state;
        newState.chartData.data[0].y = Bank;
        newState.chartData.data[1].y = Cash;
        newState.chartData.data[2].y = MobileMoney;
        this.setState(newState);
        console.log("state: ", this.state);
      })
      .catch(error => {
        //console.log("state: ", this.state);
        return error; //reject(error);
      });
  }

  render() {
    console.log("render");
    //this.paymentMethod();
    return (
      <div className="topDiv">
      {console.log("render return Started")}
        <button className="deliveryButtons" onClick={(e)=>{e.preventDefault();this.refresh()}}>refresh</button>
        <div id="column_chart" className="paymentGraph" />
      </div>
    );
  }

  createChart = () => {
    Highcharts.chart("column_chart", {
      chart: { type: "column", backgroundColor: "#F2F2F2" },
      title: { text: "" },
      subtitle: { text: "" },
      xAxis: { type: "category" },
      yAxis: { title: { text: "" } },
      legend: { enabled: false },
      tooltip: {
        headerFormat:
          '<span style="font-size:11px">{series.name}</span><br>',
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
          data: [
            this.state.chartData.data[0].y,
            this.state.chartData.data[1].y,
            this.state.chartData.data[2].y
          ]
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
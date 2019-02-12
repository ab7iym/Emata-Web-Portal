import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Highcharts from 'highcharts';
import './stylings/deliveryAmount.css';
import {HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, SplineSeries} from 'react-jsx-highcharts';

  const plotOptions = {
    series: {  
      animation:{duration: 4000}
    }
  };
  const categories= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const labels= {style: {fontSize:'40px'}}
  const marker= { symbol: 'circle',}

var tooltip = {valueSuffix: '\xB0C'}

function openCity(evt, cityName) {//this function is used to change the content of the divs/graphs to be shown
    var i, x, tablinks;
    x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " w3-red";
}

const App = () => (
  <div>
    <div className="buttonsRow">
      <button className="deliveryButtons" onclick="openCity('London')">No. of deliveries</button>
      <button className="deliveryButtons" onclick="openCity('Paris')">Ave. delivery size</button>
      <button className="deliveryButtons" onclick="openCity('Tokyo')">Amt. of milk deliveries</button>
    </div> 
    <div className="blockOne">
        <HighchartsChart 
          className="deliveryGraph"
          plotOptions={plotOptions} 
          tooltip={tooltip} 
          marginLeft={0}
        >
        <Chart className="chat" height={305}/>

        <Title></Title>
        <Subtitle></Subtitle>
        <XAxis categories={categories} lable = {labels}>
          <XAxis.Title >Months</XAxis.Title>
        </XAxis>

        <Legend 
          layout="horizontal" 
          align="right" 
          verticalAlign='top' 
          borderWidth={0}
          symbolRadius={0} 
          symbolWidth={5}
        />

        <YAxis>
          <YAxis.Title >{'Quantity (shs)'}</YAxis.Title>
          <SplineSeries 
            name= 'curve1'
            data= {[-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]}
            marker= {marker}
          />
          <SplineSeries 
            name= 'curve 2'
            data= {[3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]}
            marker= {marker}
          />
        </YAxis>
      </HighchartsChart>
      <HighchartsChart 
          className="deliveryGraphs"
          plotOptions={plotOptions} 
          tooltip={tooltip} 
          marginLeft={0}
        >
        <Chart className="chat" height={305}/>

        <Title></Title>
        <Subtitle></Subtitle>
        <XAxis categories={categories} lable = {labels}>
          <XAxis.Title >Months</XAxis.Title>
        </XAxis>

        <Legend 
          layout="horizontal" 
          align="right" 
          verticalAlign='top' 
          borderWidth={0}
          symbolRadius={0} 
          symbolWidth={5}
        />

        <YAxis>
          <YAxis.Title >{'Quantity (shs)'}</YAxis.Title>
          <SplineSeries 
            name= 'curve1'
            data= {[-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]}
            marker= {marker}
          />
          <SplineSeries 
            name= 'curve 2'
            data= {[3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]}
            marker= {marker}
          />
        </YAxis>
      </HighchartsChart>
    </div>

  </div>
);

export default withHighcharts(App, Highcharts);

/*
  <div className="buttonRow">
      <input type="button" className="deliveryButtons" onClick={console.log("you clicked it")}value="No. of deliveries"/>
      <input type="submit" className="deliveryButtons" onClick={console.log("you clicked it")}value="Ave. delivery size"/>
      <input type="submit" className="deliveryButtons" onClick={console.log("you clicked it")}value="Amt. of milk deliveries"/>
    </div>
*/
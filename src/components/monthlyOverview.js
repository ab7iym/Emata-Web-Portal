import React, { Component } from 'react';
import 'react-dom';
import './stylings/monthlyOverview.css';
import Highcharts from 'highcharts';
import {HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, ColumnSeries, SplineSeries} from 'react-jsx-highcharts';

class MonthlyOverview extends Component {
	constructor(props){
	    super(props)
	    this.state = {
	      coopId: '',
	      actualEntries: [],
	      entries: [],
	      prevYearEntries: [],
	      currYearEntries: [],
	      Gduration: 1500,
	    }
	    this.getCoopsData=this.getCoopsData.bind(this);
	    this.calcDate=this.calcDate.bind(this);
	}
	componentDidMount(){
		//{this.calcDate(localStorage.getItem('startDt-sl'), localStorage.getItem('endDt-sl'))}
		let newState = this.state;
		newState.coopId = this.props.passCoopId;
		this.setState(newState);
		this.calcDate()
	}
	calcDate(){
		console.log("---------------------------------------------------------Calculate Date Start----------------------------------------------------------------------"); 
		var end = new Date();
		var start = new Date();
		start.setDate(1);
		start.setMonth(0);
		start.setFullYear(end.getFullYear()-1);
		console.log("startDate: "+start+" endDate: "+end);
		this.getCoopsData(localStorage.getItem('cp-sl-id'),start,end);
		console.log("----------------------------------------------------------Calculate Date End---------------------------------------------------------------------"); 
	}

	// getCoopsData(localStorage.getItem('cp-sl-id'),sendDate,endDate)
	getCoopsData(id,startDate,endDate){//this function populates the coops list in the search bar
		console.log("getCoopsData function has been called");
		fetch('https://emata-ledgerservice-test.laboremus.no/api/ledger/ledger-entries-in-period?organisationId='+id+'&entryType=1'+'&startDate='+startDate+'&endDate='+endDate,{
		  headers: {
		    'Authorization':'Bearer '+localStorage.getItem('Token'),
		    'Transfer-Encoding': 'chunked',
		    'Content-Type': 'application/json;charset=UTF-8',
		    'Content-Encoding': 'gzip',
		    'Vary':'Accept-Encoding',
		    'X-Content-Type-Options':'nosniff',
		  },
		  method: 'GET'
		})
		.then(response=>response.json())
		.then(res=>{
		  console.log("--------------------------------------------------------------------------------------------------------------------------------");
		  console.log(res);
		  //console.log("the deliveries: "+res.noOfEntries);
		  
		  let newState= this.state;
		  let sortedDateArray=[];
		  sortedDateArray = res.farmerLedgerEntries;//this stores the dates from the API-endpoint to the state dates array(in date fomart)
		  sortedDateArray.sort(function(a,b){return new Date(a.entryDateTime) - new Date(b.entryDateTime)});
		  console.log("sorted-Object-Array: ",sortedDateArray);
		  for(let i=0; i<sortedDateArray.length; i++){//sorting the entries of the previous year by month so as to get total Milk collections/deliveries in one day (in ltr)
		    let entryDate = new Date(sortedDateArray[i].entryDateTime);//getting a new date from the array;
        	let amountOfMilk = sortedDateArray[i].milkDelivered.quantity;
		    let prevEntryDate = '';
			if(entryDate.getFullYear()===startDate.getFullYear()){
		    	console.log("--------------------------------------------------------------------------------------------------------------------------------");
		    	console.log('Prev sortarray length: '+sortedDateArray.length);
			    if(newState.prevYearEntries.length>0){prevEntryDate=newState.prevYearEntries[newState.prevYearEntries.length-1].entryDateTime;}//check if the previous date entry already exists
			    
			    if(newState.prevYearEntries.length===0){
			      newState.prevYearEntries[newState.prevYearEntries.length] = {'entryDateTime': entryDate , 'amountOfMilk': amountOfMilk};
			      console.log("Prev Entries: ",newState.prevYearEntries);
			    }
			    //Adding Entries of the same date
			    else if(prevEntryDate.getMonth()===entryDate.getMonth()){
			      newState.prevYearEntries[(newState.prevYearEntries.length)-1] = {'entryDateTime': entryDate , 'amountOfMilk': (newState.prevYearEntries[newState.prevYearEntries.length-1].amountOfMilk)+amountOfMilk};
			      console.log("Prev Adding Entries: ",newState.prevYearEntries);
			    }
			    else{//add a new entry to array
			      console.log('array new');
			      newState.prevYearEntries[newState.prevYearEntries.length] = {'entryDateTime': entryDate , 'amountOfMilk': amountOfMilk};
			      console.log("Prev New Entries: ",newState.prevYearEntries);
			    }
			}
		  }

		  for(let i=0; i<sortedDateArray.length; i++){//sorting the entries of the previous year by month so as to get total Milk collections/deliveries in one day (in ltr)
		    let entryDate = new Date(sortedDateArray[i].entryDateTime);//getting a new date from the array;
        	let amountOfMilk = sortedDateArray[i].milkDelivered.quantity;
		    let prevEntryDate = '';
		    console.log('Curr year: '+endDate.getFullYear(), 'curr year entryDate year: '+entryDate.getFullYear());
		    if(entryDate.getFullYear()===endDate.getFullYear()){
		    	console.log("--------------------------------------------------------------------------------------------------------------------------------");
		    	console.log('Curr sortarray length: '+sortedDateArray.length);
			    if(newState.currYearEntries.length>0){
			    	prevEntryDate=newState.currYearEntries[newState.currYearEntries.length-1].entryDateTime;
			    }//check if the previous date entry already exists
			    
			    if(newState.currYearEntries.length===0){
			      newState.currYearEntries[newState.currYearEntries.length] = {'entryDateTime': entryDate , 'amountOfMilk': amountOfMilk};
			      console.log("Curr Entries: ",newState.currYearEntries);
			    }
			    //Adding Entries of the same date
			    else if(prevEntryDate.getMonth()===entryDate.getMonth()){
			      newState.currYearEntries[(newState.currYearEntries.length)-1] = {'entryDateTime': entryDate , 'amountOfMilk': (newState.currYearEntries[newState.currYearEntries.length-1].amountOfMilk)+amountOfMilk};
			      console.log("Curr Adding Entries: ",newState.currYearEntries);
			    }
			    else{//add a new entry to array
			      console.log('array new');
			      newState.currYearEntries[newState.currYearEntries.length] = {'entryDateTime': entryDate , 'amountOfMilk': amountOfMilk};
			      console.log("Curr New Entries: ",newState.currYearEntries);
			    }
			}
		  }
		  for(let i=0; i<newState.prevYearEntries.length; i++){//loop to populate the entries array data to only milk amounts
		    newState.prevYearEntries[i] = newState.prevYearEntries[i].amountOfMilk;
		  }
		  for(let i=0; i<newState.currYearEntries.length; i++){//loop to populate the entries array data to only milk amounts
		    newState.currYearEntries[i] = newState.currYearEntries[i].amountOfMilk;
		  }
		  console.log('newState.prevYearEntries: ',newState.prevYearEntries);
		  console.log('newState.currYearEntries: ',newState.currYearEntries);
		  newState.Gduration = newState.Gduration+0.0001;
		  this.setState(newState);
		  console.log("state: ", this.state);
		})
		.catch((error)=>{
		    return(error);//reject(error);
		});
	};
 	render(){
 		const categories= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  		const labels= {style: {fontSize:'40px'}}
	 	const plotOptions = {series: {animation:{duration: this.state.Gduration}}};
  		var tooltip = {valueSuffix: 'ltrs'}
	    return(
	        <HighchartsChart  
	        	className="graph"
				plotOptions={plotOptions} 
		        tooltip={tooltip} 
		    >
	          <Chart />
	          <Legend />
	          <XAxis categories={categories} lable = {labels}>
	          	<XAxis.Title >Months</XAxis.Title>
	          </XAxis>
	          <YAxis>
	          	<YAxis.Title >Quantity (ltrs)</YAxis.Title>
	            <ColumnSeries name="2018" data={this.state.currYearEntries} />
	            <ColumnSeries name="2017" data={this.state.prevYearEntries} />
	            <SplineSeries name="Average" data={[8,2.5,3,5,5,8,7,4.5,2.5,9.5,13.5,12]} />
	          </YAxis>
	        </HighchartsChart>
	    );
    } 
}

export default withHighcharts(MonthlyOverview, Highcharts);

	//<ColumnSeries name="2018" data={[9,2,1,3,4,7,9,6,1,11,17,15]} />
	//<ColumnSeries name="2017" data={[7,3,5,7,6,9,5,3,4,8,10,9]} />
	//<SplineSeries name="Average" data={[8,2.5,3,5,5,8,7,4.5,2.5,9.5,13.5,12]} />
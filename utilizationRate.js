import React, { Component } from 'react';
import 'react-dom';
import './stylings/utilization.css';
import Highcharts from 'highcharts';
import {HighchartsChart, Chart, withHighcharts, Title, Legend, PieSeries} from 'react-jsx-highcharts';

class UtilizationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      activeFarmers: '',
      activeFarmersList: [],
      object:[],
      obj:[]
    };
    this.handleFarmersGraph = this.handleFarmersGraph.bind(this);
    this.utilizationRate = this.utilizationRate.bind(this);

  }

  static getDerivedStateFromProps(newProp=this.props.passCoopData, state=this.state){
		console.log("------------Utilization Rate received props-------------");
		let newState = state;
    //newState.entries = newProp.passCoopData.entries;
		newState.object = newProp;
    return newState;
  }

  componentDidMount(){
    //this.setgraphData(this.props);
    this.handleFarmersGraph(this.props);
    this.utilizationRate(this.props);
  }

  //calcaulating the number of days within the range
  mydiff = (date1,date2,interval) =>{
    var second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7;
    date1 = new Date(date1);
    date2 = new Date(date2);
    var timediff = date2 - date1;
    if (isNaN(timediff)) return NaN;
    switch (interval) {
      case "years": return date2.getFullYear() - date1.getFullYear();
      case "months": return (
        ( date2.getFullYear() * 12 + date2.getMonth() )
        -
        ( date1.getFullYear() * 12 + date1.getMonth() )
      );
      case "weeks"  : return Math.ceil(timediff / week);
      case "days"   : return Math.floor(timediff / day); 
      case "hours"  : return Math.floor(timediff / hour); 
      case "minutes": return Math.floor(timediff / minute);
      case "seconds": return Math.floor(timediff / second);
      default: return undefined;
    }
  }

  
  utilizationRate = (object,activeFarmersList) =>{
    console.log("OBJECT RECEIVED: ",object);
     let entries = object.passCoopData.entries;
    // let graphData = [];
    // let getstartDate = new Date(object.passCoopData.startDate);
    // let getendDate =  new Date(object.passCoopData.endDate);
    // let temporaryDate;
    let utilizationRate;
    let counter=0;
    console.log("entries-Farmer entries: ",entries);
    console.log("entries.length: ",entries.length);
    // function addDays(date, days) {
    //   var result = new Date(date);
    //   result.setDate(result.getDate() + days);
    //   return result;
    // } 

    // let endDateYear = getendDate.getFullYear();
    // let endDateMonth = getendDate.getMonth();
    // let endDateDate = getendDate.getDate();

    for(let i=0; i<entries.length; i++){//sorting the entries by date so as to get total deliveries in one day
     // let entryDate = new Date(entries[i].entryDateTime);//getting a new date from the array;
      let farmerId = entries[i].farmerId;//getting a new date from the array;
     // let prevEntryDate = '';
      console.log("farmerId: ",farmerId)
      console.log("activeFarmersList-Check: ",activeFarmersList[0])
      function checkFarmerId() {
        let present= false;
        for(let z=0; z<activeFarmersList.length; z++){
          if(farmerId===activeFarmersList[z]){
            present=true;
            break;
          }
        }
        counter++
        return present;
      }

     utilizationRate = (counter/entries.length)*100
     utilizationRate = Math.round( utilizationRate);
      console.log("utilizationRate: ",utilizationRate);
    //   if(checkFarmerId()){
    //     if(graphData.length>0){//check if the previous date entry already exists
    //       prevEntryDate=graphData[graphData.length-1].entryDateTime;
    //       //console.log('prev-new: '+prevEntryDate.getMonth()+'-'+entryDate.getMonth()+' '+prevEntryDate.getMonth()+'-'+entryDate.getMonth()+' '+prevEntryDate.getFullYear()+' '+entryDate.getFullYear());
    //     }
        
    //     if(graphData.length===0){//check if the array has no value and add a value in the first position
    //       //console.log('array start');
    //       graphData[graphData.length] = {'entryDateTime': entryDate , 'noOfEntries': 1};
    //       //console.log("Entries: ",newState.entries);
    //     }
    //     //Adding Entries of the same date
    //     else if((prevEntryDate.getDate()===entryDate.getDate()) && (prevEntryDate.getMonth()===entryDate.getMonth()) && (prevEntryDate.getFullYear()===entryDate.getFullYear())){
    //       //console.log('array adding');
    //       graphData[(graphData.length)-1] = {'entryDateTime': entryDate , 'noOfEntries': (graphData[graphData.length-1].noOfEntries)+1};
    //       //console.log("Adding Entries: ",newState.entries);
    //     }
    //     else{//add a new entry to array
    //       //console.log('array new');
    //       graphData[graphData.length] = {'entryDateTime': entryDate , 'noOfEntries': 1};
    //       //console.log("New Entries: ",newState.entries);
    //     }
    //   }
    // }
    // if(entries.length && graphData.length){//this condition is used to get data for the days when the delivery is 0(zero)
    //   let firstDateOfEntry = new Date(graphData[0].entryDateTime);//this holds the date of the first entry made in the period selected
    //   let lastDateOfEntry = new Date(graphData[graphData.length-1].entryDateTime);//this holds the date of the last entry made in the period selected
    //   let noOfDays = (parseInt((lastDateOfEntry - firstDateOfEntry) / (24 * 3600 * 1000)))+2;//this gets the number of days between the dates
    //   let allDatesInRange = [];
    //   //console.log("firstDateOfEntry: ",firstDateOfEntry);console.log("lastDateOfEntry: ",lastDateOfEntry);
    //   //console.log("noOfDays: ",noOfDays);
    //   for(let i=0; i<noOfDays; i++){
    //     let date = ''
    //     if(i===0){date = new Date(firstDateOfEntry.setDate(firstDateOfEntry.getDate()));}
    //     else {date = new Date(firstDateOfEntry.setDate(firstDateOfEntry.getDate()+1));} 
    //     allDatesInRange.push({'entryDateTime': date , 'noOfEntries': 0});
    //     //console.log("allDatesInRange-curr: ",allDatesInRange[i]);
    //   }
    //   //console.log("allDatesInRange-in-loop: ",allDatesInRange);
    //   //*
    //   for(let i=0; i<allDatesInRange.length; i++){
    //     for(let r=0; r<graphData.length; r++){
    //       if(allDatesInRange[i].entryDateTime.getDate()===graphData[r].entryDateTime.getDate() && allDatesInRange[i].entryDateTime.getMonth()===graphData[r].entryDateTime.getMonth() && allDatesInRange[i].entryDateTime.getFullYear()===graphData[r].entryDateTime.getFullYear()){
    //         allDatesInRange[i] = graphData[r];
    //       }
    //     }
    //   }//*/
    //   console.log("allDatesInRange: ",allDatesInRange);
    //   graphData=allDatesInRange;
    }
  }

  handleFarmersGraph = (object)=>{
    //this.getContactsData();
    let startDate = "";
    let endDate = "";
    let weeks = "";
    let graphData = [];
    let temperyDate = new Date();
    let activeFarmers = '';
    let activeFarmersList = [];
    //let inactiveFarmers = this.state.contacts.length;

    //changing the start and end date into days, weeks//
    if(object.passCoopData.startDate){
      let formateDate; 
      let dateRange;
      startDate = object.passCoopData.startDate;
      endDate = object.passCoopData.endDate;
      dateRange = this.mydiff(startDate,endDate,"days");
      weeks = this.mydiff(startDate,endDate,"weeks");
      console.log(weeks," weeks");
    }

    //passing the coopdates and coopdata from the API to populate the farmers Id//
    if(object.passCoopData){
      let i=0;
      let j=0;
      let p=0;
      let days = [];
      let found = 0;
      let obj = object.passCoopData.entries;
      let dt= "";
      let flag = 0;
      let contacts = [];
      activeFarmers = 0;

      for(i=0;i<obj.length;i++){//checking if the contact is equal to farmerId
        let id = obj[i].farmerId;
        // contacts.push(id);
        for(let j=0;j<=obj.length;j++){
          if(contacts[j] === id){
            flag = 1;
            break;        
          }  
        }
        if(flag === 0){//if the flag is 0 push the id into the contact array
          contacts.push(id);
        }
        else{
          flag = 0;
        }
      }

      if(contacts.length !== 0){//check if the contact array is not equal to zero
        function addDays(date, days) {
          var result = new Date(date);
          result.setDate(result.getDate() + days);
          return result;
        }
        for(i=0;i<contacts.length;i++){//loop though the array to get contacts Id
          let contact = contacts[i];
          let contactActive = false;
          let contactActiveCounter = 0;
          let weekDelivery = 0;
          let activeness = 0;
          //inactiveFarmers = this.state.contacts;

          let tempStartDate = new Date(startDate);
          let tempEndDate = addDays(tempStartDate,7);

          for(j=0;j<=obj.length;j++,tempStartDate = addDays(tempEndDate,1)){//loop though the inner loop get set the temporary date and add 7 days 
            tempEndDate = addDays(tempStartDate,7);
            let lastWeekFlag = 1;
            // console.log(tempStartDate, "----", tempEndDate);
            for(p=0;p<obj.length;p++){// loop the array to get the length of entry date time
              let entryDateTime = new Date(obj[p].entryDateTime);
              if(contact && contact === obj[p].farmerId && entryDateTime >= tempStartDate && entryDateTime <= tempEndDate){//checking if the contact is equal to farmerId and entry date time is greater or equal to temporary start and end date
                if(lastWeekFlag === 1 || weekDelivery === 1){//checking for last week and this week delivery if is equal to 1, 0
                  contactActiveCounter++;
                  lastWeekFlag = 1;
                  break;
                }
                else{
                  lastWeekFlag = 0;
                }
                weekDelivery = 1
              }
              else{
                weekDelivery = 0;
              }
            }

          }

          activeness = (contactActiveCounter/weeks)*100 //calculating the activeness of a farmer
          activeness = Math.round(activeness); //rounding the whole number 
          if (activeness <60) activeFarmers = activeFarmers
          else{activeFarmers = activeFarmers + 1; activeFarmersList.push(contact)};//checking if the farmer deliver is over 60%
          //inactiveFarmers = (this.state.contacts.length) - (activeFarmers);//calculating the inactive farmer 
          //console.log("CONTACTS",this.state.contacts);
          console.log("activeFarmersList: ", activeFarmersList)
          console.log("Farmer id = ",contact,"consistence detection = ",contactActiveCounter,"Consistence = ",activeness,"%");
          console.log(activeFarmers,"Active farmers");  
          //console.log(inactiveFarmers,"Inactive farmer") 
        }     
      }
      //console.log(contacts); 
    }
    let newState = this.state;
    newState.activeFarmersList = activeFarmersList;
    newState.activeFarmers = activeFarmers;
    //newState.inactiveFarmers = inactiveFarmers;
    this.utilizationRate(object,activeFarmersList);

    return newState;
  };
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


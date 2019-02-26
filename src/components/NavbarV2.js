import React, { Component } from 'react';
import 'react-dom';
import {Redirect} from 'react-router-dom';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './stylings/navBarV2.css';

class NavBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      coopsId: [],//["paul","john"]
      coops: [],
      coopSelected: '',
      startDate: '',
      endDate: ''
      //use this.state.coops.length to get the number of coops
    }
    this.logout=this.logout.bind(this);
    this.getCoopsList=this.getCoopsList.bind(this);
    this.maxDate=this.maxDate.bind(this);
    this.date_1_DefaultDate=this.date_1_DefaultDate.bind(this);
    this.date_2_DefaultDate=this.date_2_DefaultDate.bind(this);
    this.date_2_minDate=this.date_2_minDate.bind(this);
    this.onSelectCoop=this.onSelectCoop.bind(this);
    this.handleStartDateChange=this.handleStartDateChange.bind(this);
    this.handleEndDateChange=this.handleEndDateChange.bind(this);
  }

  logout(){//this is the logout fuction
    localStorage.clear();//clearing the localstorage data
    if(!localStorage.getItem("Token")){//checking if the token was cleared
      console.log("I was logged out");
      return (//returning to the login page
        console.log("I was redirected"),
        <Redirect exact to={'/'}/>,//redirecting to the login page
        window.location.reload()//this is used to refresh the page
      )
    }
  }
  handleChange = (event) => {this.setState({ value: event.target.value })}
  /*handleDateChange = (newDate) => {
    this.setState({startDate: newDate});
    console.log("startDate "+ this.state.startDate);
  }*/
  handleStartDateChange(e){
    console.log(e.target.value);
    localStorage.setItem('startDt-sl',e.target.value);
    this.setState({startDate: String(e.target.value)});
    console.log("startDate Change: "+ this.state.startDate);
    //this.setState({startDate: document.getElementById("myDate").value});
    //console.log("startDate Change: "+ this.state.startDate);
  }
  handleEndDateChange(e){
    console.log(e.target.value);
    localStorage.setItem('endDt-sl',e.target.value);
    this.setState({startDate: String(e.target.value)});
    console.log("EndDate Change: "+ this.state.endDate);
  }

  getCoopsList(){//this function populates the coops list in the search bar
    console.log("getCoopsList function has been called");
    fetch('https://emata-crmservice-test.laboremus.no/api/organisation',{
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
      console.log(res);
      for (let i=0; i<res.length; i++) {
        if(res[i].isMainBranch){//checking if the coop is the main branch
          //this.state.coopsName.push(res[i].name);//this.state.coopsId.push(res[i].id);
          this.state.coops.push({'name':res[i].name,'id':res[i].id});
          //console.log(res[i].name);
        }
      }
      localStorage.setItem('cps',this.state.coops);
    })
    .catch((error)=>{
        return(error);//reject(error);
    });
  }
  date_1_DefaultDate(){
    var curr = new Date();
    curr.setDate(curr.getDate()-3);
    var date = curr.toISOString().substr(0,10);
    //console.log("Start date: "+date);
    return date
  }
  date_2_DefaultDate(){
    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substr(0,10);
    console.log("End date: "+date);
    return date
  }
  date_2_minDate(){
    console.log("startDate: "+this.state.startDate);
    console.log("endDate: "+this.state.endDate);
  }
  maxDate(){
    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substr(0,10);
    return date;
  }
  onSelectCoop( obj ) {//this function gets the selected coop and saves it to local storage
    console.log('onSelectCoop.call ', obj);
    console.log('onSelectCoop.name ', obj[0].name);
    console.log('onSelectCoop.id ', obj[0].id);
    this.setState({coopSelected: obj[0].name});
    localStorage.setItem('cp-sl-id',obj[0].id);//saving the selected coop id to the localStorage
    localStorage.setItem('cp-sl-nm',obj[0].name);//saving the selected coop name to the localStorage
    console.log( 'coopSelected '+this.state.coopSelected);
    this.props.passCoopSignal(obj[0].id,obj[0].name);
  }

  render(){
    return (
      <div className="navBarStyle2">
            {this.getCoopsList()}
            <img className="navLogo2" src={require("./images/emata-logo.png")} alt={"logo"}/>
            <div className="pageName2">Dashboard</div>
            <Typeahead 
              bsSize="small"
              className="navBarSearch2"
              labelKey="name"
              onChange={this.onSelectCoop}
              options={this.state.coops}
              placeholder="search coops..."
              emptyLabel="no match found"
              selectHintOnEnter={true}
            />
            <div className="dateBackground2">
              <input 
                  id="myDate" 
                  type="date" 
                  className="dateBox2" 
                  name="" 
                  onChange={(e) => this.handleStartDateChange(e)}
                  defaultValue={this.date_1_DefaultDate()} 
                  min="2018-06-1" 
                  max={this.maxDate()}
              /> 
            </div>
            <label className="to2"> to </label>
            <div className="dateBackground2">
              <input 
                  type="date" 
                  className="dateBox2" 
                  name="" 
                  onChange={(e) => this.handleEndDateChange(e)} 
                  defaultValue={this.maxDate()} 
                  min="" 
                  max={this.maxDate()}
              /> 
            </div>
            <img className="navBarUsernameIcon" src={require("./icons/userIcon3.png")} alt={"userIcon"}/>
            <div className="usernameLabel2">{localStorage.getItem("FirstName")}</div>
            <button className="navBarSignOutButton2" onClick={this.logout}>
              <div>
                <div className="usernameLabel2">Sign out</div>            
                <img className="navBarLogoutIcon" src={require("./icons/logoutIcon2.png")} alt={"userIcon"}/>
              </div>
            </button>
      </div>
    );
  }
}

export default NavBar;

/*(event) => {this.setState({startDate: event.target.value})
                console.log(event.target) 
                console.log("startDate Change: "+ this.state.startDate)}*/
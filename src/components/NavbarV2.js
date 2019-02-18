import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import './stylings/navBarV2.css';

class NavBar extends Component {

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
  render(){
    return (
      <div className="navBarStyle2">
            <img className="navLogo2" src={require("./images/emata-logo.png")} alt={"logo"}/>
            <div className="pageName2">Dashboard</div>
            <div className="navBarSearch2">
              <InputBase placeholder="Search…" classes={{root: "",input: ""}}/>
            </div>
            <div className="dateBackground2">
              <input type="date" className="dateBox2" name=""/> 
            </div>
            <label className="to2"> to </label>
            <div className="dateBackground2">
              <input type="date" className="dateBox2" name="" onChange={this.updateInputPass}/> 
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


/*
return (
      <div className="navToolBarStyle">
          <Toolbar  className="navBarStyle">
              <img className="navLogo" src={require("./images/emata-logo.png")} alt={"logo"}/>
              <div className="pageName">Dashboard</div>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            <div className="dateBackground">
              <input type="date" className="dateBox" name="" placeholder="password" onChange={this.updateInputPass}/> 
            </div>
             <h10 className="to"> to </h10>
            <div className="dateBackground">
              <input type="date" className="dateBox" name="" placeholder="password" onChange={this.updateInputPass}/> 
            </div>
            <div className={classes.grow} />

            <div>
              <label className="usernameLabel">{localStorage.getItem("FirstName")}</label>
            </div>

            <div className={classes.sectionDesktop}>
              <IconButton
                aria-owns={isMenuOpen ? "material-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>

            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
*/
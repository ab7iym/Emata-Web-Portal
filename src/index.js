import React, { Component,Fragment } from 'react';
import ReactDOM from 'react-dom';
import {Switch,Router,Route, BrowserRouter} from 'react-router-dom';
import DashBoard from "./DashBoard";
import LoginPage from "./loginPage";
import Default from "./components/Default";
import * as serviceWorker from './serviceWorker';


class Login extends Component {
    render() {
    return <div>
        <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/dashboard" component={DashBoard} />
          <Route component={Default} />
        </Switch>
        </BrowserRouter>
      </div>;
  }
}

ReactDOM.render(<Login />, document.getElementById('root'));
serviceWorker.unregister();
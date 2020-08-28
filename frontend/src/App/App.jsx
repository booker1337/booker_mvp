import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import authService from '../utils/authService';
import "./App.css";

import NavBar from './NavBar/NavBar';
import Hamburger from './Hamburger/Hamburger';

import SignupPage from './SignupPage/SignupPage';
import LoginPage from './LoginPage/LoginPage';
import ProfilePage from './ProfilePage/ProfilePage';
import NotFoundPage from './NotFoundPage/NotFoundPage';

const PrivateRoute = ({ privateRender, ...routeProps }) => (
  <Route
    {...routeProps}
    render={routerProps => {
      let component = privateRender(routerProps);
      if(!!component.props.user) return component;
      else return <Redirect to="/signup" />;
    }}
  />
);

function App() {
  const [user, setUser] = useState(authService.getUser() || undefined);
  const [HamburgerOpen, setHamburgerOpen] = useState(false);

  const HamburgerToggleClickHandler = () => setHamburgerOpen(!HamburgerOpen);

  return (
    <div className="App" style={{height: '100%'}}>
      <NavBar HamburgerClickHandler={this.HamburgerToggleClickHandler} />
      <Hamburger show={this.state.HamburgerOpen} click={this.HamburgerToggleClickHandler} />
      <Router>
        <Switch>
          <Route exact path="/" render={props => <div>Landing Page</div>} />
          <Route path="/login" render={(props) => <LoginPage login={authService.login(setUser, props.history)}/>} />
          <Route path="/signup" render={(props) => <SignupPage signup={authService.signup(setUser, props.history)}/>} />
          <Route path="/onboarding" render={props => <div>Onboarding Page</div>} />
          <PrivateRoute path="/profile" privateRender={props => <ProfilePage user={user} />} />
          <Route render={props => <NotFoundPage />} />
          {/* <PrivateRoute
            exact
            path="/swipe"
            privateRender={() => <div>Swipe Page</div>}
          /> */}
          {/* <PrivateRoute
            path="/matches"
            privateRender={() => <div>Matches Page</div>}
          /> */}
          {/* <PrivateRoute
            path="/group/:groupName"
            privateRender={props => <div>Matches Page: {props.match.params.groupName}</div>}
          /> */}
        </Switch>
      </Router>

    </div>
  );
}

export default App;

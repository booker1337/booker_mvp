import React, { useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import authService from '../utils/authService';
import "./App.css";

import NavBar from './NavBar/NavBar';
import Hamburger from './Hamburger/Hamburger';

import SignupPage from './SignupPage/SignupPage';
import LoginPage from './LoginPage/LoginPage';
import ProfilePage from './ProfilePage/ProfilePage';
import NotFoundPage from './NotFoundPage/NotFoundPage';

// authenticated route
const AuthRoute = ({ ...props }) => (
  <Route {...props}>
    {props.user ? props.children : <Redirect to="/signup" />}
  </Route>
);

function App() {
  const [user, setUser] = useState(authService.getUser() || undefined);
  const [HamburgerOpen, setHamburgerOpen] = useState(false);

  const HamburgerToggleClickHandler = () => setHamburgerOpen(!HamburgerOpen);

  const history = useHistory();

  const login = authService.getLogin(setUser, history);
  const signup = authService.getSignup(setUser, history);

  return (
    <div className="App" style={{height: '100%'}}>
      <NavBar HamburgerClickHandler={this.HamburgerToggleClickHandler} />
      <Hamburger show={this.state.HamburgerOpen} click={this.HamburgerToggleClickHandler} />
      <Router>
        <Switch>
          <Route exact path="/">
            <div>Landing Page</div>
          </Route>

          <Route path="/login">
            <LoginPage login={login}/>
          </Route>

          <Route path="/signup">
            <SignupPage signup={signup}/>
          </Route>

          <AuthRoute path="/start" user={user}>
            <div>Onboarding Page</div>
          </AuthRoute>

          <AuthRoute path="/profile" user={user}>
            <ProfilePage user={user} />
          </AuthRoute>

          <Route> <NotFoundPage /> </Route>
        </Switch>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import authService from '../utils/authService';

import SignupPage from './SignupPage/SignupPage';
import LoginPage from './LoginPage/LoginPage';

const PrivateRoute = ({ cb, ...rest }) => (
  <Route {...rest}
    render={props => {
      let component = cb(props);
      if(!!component.props.user) return component;
      else return <Redirect to="/signup" />;
    }}
  />
);

function App() {
  const [user, setUser] = useState(authService.getUser() || undefined);

  const login = (payload) => (
    fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(body => {
        console.log(body);
      })
      .catch(err => console.log(err))
  );

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={props => <div>Landing Page</div>} />
          <Route path="/login" render={(props) => <LoginPage login={login(setUser, props.history)}/>} />
          <Route path="/signup" render={(props) => <SignupPage signup={authService.signup(setUser, props.history)}/>} />
          <Route path="/onboarding" render={props => <div>Onboarding Page</div>} />
          <PrivateRoute
            exact
            path="/swipe"
            user={user}
            cb={props => <div>Swipe Page</div>}
          />
          <PrivateRoute
            path="/profile/:username"
            user={user}
            render={props => <div>Profile Page: {props.match.params.username}</div>}
          />
          <PrivateRoute
            path="/matches"
            user={user}
            render={props => <div>Matches Page</div>}
          />
          <PrivateRoute
            path="/group/:groupName"
            user={user}
            render={props => <div>Matches Page: {props.match.params.groupName}</div>}
          />
        </Switch>
      </Router>

    </div>
  );
}

export default App;

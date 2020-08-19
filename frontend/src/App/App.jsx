import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import authService from '../utils/authService';

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

  const handleLogin = () => {
    let user = authService.getUser() || undefined;
    this.setUser(user);
  };

  const handleLogout = () => {
    authService.logout()
    this.setUser(user);
  };

  return (
    <div className="App">
      
      <Router>
        <Switch>
          <Route exact path="/" render={props => <div>Landing Page</div>} />
          <Route path="/login" render={props => <div>Login Page</div>} />
          <Route path="/signup" render={props => <div>Signup Page</div>} />
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

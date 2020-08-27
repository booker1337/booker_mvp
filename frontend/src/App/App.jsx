import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import authService from '../utils/authService';

import SignupPage from './SignupPage/SignupPage';
import LoginPage from './LoginPage/LoginPage';
import ProfilePage from './ProfilePage/ProfilePage';
import NotFoundPage from './NotFoundPage/NotFoundPage';

const PrivateRoute = ({ render, ...routeProps }) => (
  <Route
    {...routeProps}
    render={routerProps => {
      let component = render(routerProps);
      if(!!component.props.user) return component;
      else return <Redirect to="/signup" />;
    }}
  />
);

function App() {
  const [user, setUser] = useState(authService.getLocalUser() || undefined);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={props => <div>Landing Page</div>} />
          <Route
            path="/login"
            render={(props) => <LoginPage login={authService.getLogin(setUser, props.history)}/>}
          />
          <Route path="/signup" render={(props) => <SignupPage signup={authService.getSignup(setUser, props.history)}/>} />
          <Route path="/start" render={props => <div>Onboarding Page</div>} />
          <PrivateRoute path="/profile" render={props => <ProfilePage user={user} history={props.history} />} />
          <Route render={props => <NotFoundPage />} />
          {/* <PrivateRoute
            exact
            path="/swipe"
            render={() => <div>Swipe Page</div>}
          /> */}
          {/* <PrivateRoute
            path="/matches"
            render={() => <div>Matches Page</div>}
          /> */}
          {/* <PrivateRoute
            path="/group/:groupName"
            render={props => <div>Matches Page: {props.match.params.groupName}</div>}
          /> */}
        </Switch>
      </Router>

    </div>
  );
}

export default App;

/**
 * authorize 
 */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';




class Authorize extends React.Component {

  render() {
    const { match } = this.props;
    console.log(match);
    return (
      <Router>
        <div>
          <AuthButton />
          <ul>
            <li><Link to={`${match.url}/public`}>Public Page</Link></li>
            <li><Link to={`${match.url}/protected`}>Protected Page</Link></li>
            {/* <li><Link to={`/protected`}>Protected Page</Link></li> */}
          </ul>

          <Route exact path={`${match.url}/public`} component={Public} />
          <Route exact path={`${match.url}/login`} component={Login} />
          <PrivateRoute exact patch={`${match.url}/protected`} component={Protected} />
          {/* <PrivateRoute path='/protected' component={Protected} /> */}
        </div>
      </Router>
    );
  }

}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

const AuthButton = withRouter(({ history }) => {
  return (
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome! <button onClick={() => {
          fakeAuth.signout(() => {
            history.push('/authorize');
          });
        }}>sign out</button>
      </p>
    ) : (
        <p>You are not logged in.</p>
      )
  );
});

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(rest);
  return (
    <Route
      {...rest}
      render={props => {
        console.log('---->', props);
        return (
          fakeAuth.isAuthenticated ? (
            <Component {...props} />
          ) : (
              <Redirect
                to={{
                  pathname: '/authorize/login',
                  state: { from: props.location }
                }}
              />
            )
        );
      }}
    />
  );
};


const Public = () => (<h3>Public</h3>);
const Protected = () => (<h3>protected</h3>);

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
  };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({
        redirectToReferrer: true,
      });
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/authorize' } };
    const { redirectToReferrer } = this.state;
    console.log('=====> ', from, redirectToReferrer);
    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div>
        <p>you must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>log in</button>
      </div>
    );
  }
};

export default Authorize;

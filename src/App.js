import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {Home,Login,Signup} from './pages';
import {Container} from 'reactstrap';
import { NavBar,ProtectedRoute} from './components';
class App extends Component {
  render() {
    return (
      <div>
          <Container>
            <NavBar/>
            <ProtectedRoute path="/" component={Home} exact/>
            <Route path="/login" component={Login} exact/>
            <Route path="/signup" component={Signup} exact/>
          </Container>
      </div>
    );
  }
}

export default App;

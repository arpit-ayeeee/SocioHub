import React, {Component} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';
import CreatePost from './components/CreatePost';
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Route exact path="/"><Home /></Route>
        <Route exact path="/login"><Login /></Route>
        <Route exact path="/signup"><Signup /></Route>
        <Route exact path="/profile"><Profile /></Route>
        <Route exact path="/createpost"><CreatePost /></Route>
      </BrowserRouter>
    );
  }
}

export default App;

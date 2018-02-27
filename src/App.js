import React, { Component } from 'react';
import Video from './components/video'
import logo from './logo.svg';
import './App.css';
import './styles/video.css'
import { BrowserRouter, Route } from 'react-router-dom';
class App extends Component {
  constructor(){
    super()
  }

  render() {
    return (
      <BrowserRouter>
        <Route
          path="/:roomId"
          component={Video}/>
      </BrowserRouter>
    )
  }
}

export default App;

import React, { Component } from 'react';
import Video from './components/video'
import logo from './logo.svg';
import './App.css';
import './styles/video.css'
import { BrowserRouter, Route } from 'react-router-dom';
class App extends Component {
  constructor(props){
    super(props)
    this.roomId = React.createRef();
  }
  goToRoom = (history) => {
    history.push(`/${this.roomId.current.value}`)
  }
  render() {
    return (
      <BrowserRouter>
       <React.Fragment>
          <Route
            path="/"
            exact
            render={({history}) => (
              <React.Fragment>
                <input type="text" ref={this.roomId} placeholder="Room id"/>
                <button onClick={() => this.goToRoom(history)}>Enter</button>
              </React.Fragment>
            )}/>
          <Route
            path="/:roomId"
            exact
            component={Video}/>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default App;

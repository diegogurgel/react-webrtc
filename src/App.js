import React, { Component } from 'react';
import Video from './components/video'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      otherId:'',
      myId:'',
    }
  }
  call = (desc) =>{
    this.video.call(this.state.otherId)
  }
  textChange = (ev) =>{
    this.setState({ otherId: ev.target.value })
  }
  updateId = (myId) =>{
    this.setState({ myId })
  }
  render() {
    return (
      <div>
        <Video ref={ref => (this.video = ref)} updateId={this.updateId}/>
        <div className="text-area-wrapper">
          <h3>My Id</h3>
          <textarea cols="30" rows="10" value={this.state.myId}></textarea>
        </div>
        <div className="text-area-wrapper">
          <h3>Other Id</h3>
          <textarea cols="30" rows="10" onChange={this.textChange}></textarea>
        </div>
        <button onClick={this.call}> Call</button>
      </div>
    )
  }
}

export default App;

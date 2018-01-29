import React, { Component } from 'react';
import Video from './components/video'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      otherId:''
    }
  }
  call = (desc) =>{
    this.video.call(this.state.otherId)
  }
  textChange = (ev) =>{
    this.setState({ otherId: ev.target.value })
  }
  render() {
    return (
      <div>
        <Video ref={ref => (this.video = ref)}/>
        <textarea cols="30" rows="10" onChange={this.textChange}></textarea>
        <button onClick={this.call}> Call</button>
      </div>
    )
  }
}

export default App;

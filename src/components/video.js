import React from 'react'
import videoCall from '../helpers/simple-peer'
import '../styles/video.css'
import io from 'socket.io-client'

class Video extends React.Component{
    constructor(){
        super()
        this.state = {
            localStream:{},
            remoteStreamUrl:'',
            streamUrl:''
        }
    }
    componentDidMount(){
        const socket = io('http://localhost:8080')
        socket.emit('join', {roomId: 'a3b43'})
        socket.on('initiator', ()=>{
            console.log('initiator')
        }) 
        navigator.getUserMedia({video:true, audio: true}, stream =>{
            this.setState({ streamUrl: window.URL.createObjectURL(stream), localStream: stream })
            const peer = videoCall.init(this.state.localStream)
            peer.on('signal', data => {
                this.props.updateId(JSON.stringify(data))
            })
            peer.on('stream', stream => {
                this.setState({ remoteStreamUrl: window.URL.createObjectURL(stream)})
            })

        }, ()=>{})
    }
    call = (otherId) => {
        videoCall.connect(otherId)
    }
    render(){
        return( 
            <div>
                <video autoPlay id="localVideo" muted src={this.state.streamUrl}></video>
                <video autoPlay src={this.state.remoteStreamUrl}></video>
            </div>
        )
    }
}

export default Video
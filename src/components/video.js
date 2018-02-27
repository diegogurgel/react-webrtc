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
            streamUrl:'',
            initiator: false,
            peer:{},
            full:false,
        }

    }
    componentDidMount(){
        const socket = io(process.env.REACT_APP_SIGNALING_SERVER)
        const component = this
        this.setState({socket})
        this.getUserMedia().then(() => {
            socket.emit('join', { roomId: window.location.hash })
        })
        socket.on('init', ()=>{
            component.setState({ initiator: true})
        })
        socket.on('ready', ()=>{
            component.enter()
        })
        socket.on('desc', (data) => {
            if (data.type ==='offer' && component.state.initiator) return
            if (data.type === 'answer' && !component.state.initiator) return
            component.call(data) 
        })
        socket.on('disconnected', () => {
            component.setState({ initiator: true })
        })
        socket.on('full', () => {
            component.setState({full:true})
        })

    }
    getUserMedia(cb){
        return new Promise((resolve, reject) => {
            navigator.getUserMedia = navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            const op = {
                video: {
                    width: { min: 160, ideal: 640, max: 1280 },
                    height: { min: 120, ideal: 360, max: 720 },
                },
                audio: true 
            }
            navigator.getUserMedia(op, stream => {
                this.setState({ streamUrl: stream, localStream: stream })
                this.localVideo.srcObject = stream
                resolve()
            }, () => { }) 
        })
    }
    enter = () => {
        const peer = videoCall.init(this.state.localStream, this.state.initiator)
        peer.on('signal', data => {
            const signal = {
                room: window.location.hash,
                desc: data
            }
            this.state.socket.emit('signal', signal)
        })
        peer.on('stream', stream => {
            this.remoteVideo.srcObject = stream
        })
        peer.on('error', function (err) { 
            console.log(err)
        })

    }
    call = (otherId) => {
        videoCall.connect(otherId)
    }
    renderFull = () => {
        if(this.state.full){
            return 'The room is full'
        }
    }
    render(){
        return( 
            <div className="video-wrapper">
                <div className="local-video-wrapper">
                    <video autoPlay id="localVideo" muted ref={video => (this.localVideo = video)}></video>
                </div>
                <video autoPlay id="remoteVideo"  ref={video => (this.remoteVideo = video)}></video>
                {this.renderFull()}
            </div>
        )
    }
}

export default Video
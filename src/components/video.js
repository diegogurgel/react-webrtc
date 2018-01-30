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
        console.log('did mount')
        const socket = io('https://signaling.now.sh')
        const component = this
        this.setState({socket})
        this.getUserMedia().then(() => {
            socket.emit('join', { roomId: window.location.hash })
        })
        socket.on('init', ()=>{
            component.setState({ initiator: true})
        })
        socket.on('ready', ()=>{
            console.log('ready initiator?', component.state.initiator)
            if (!component.state.initiator){
                this.getUserMedia().then(() => {
                    component.enter()
                })
            }else{
                component.enter()
            }
            
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
            navigator.getUserMedia({ video: true, audio: true }, stream => {
                this.setState({ streamUrl: window.URL.createObjectURL(stream), localStream: stream })
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
            this.setState({ remoteStreamUrl: window.URL.createObjectURL(stream) })
        })

    }
    call = (otherId) => {
        videoCall.connect(otherId)
    }
    renderFull = () => {
        if(this.state.full){
            return 'Sala cheia'
        }
    }
    render(){
        return( 
            <div>
                <video autoPlay id="localVideo" muted src={this.state.streamUrl}></video>
                <video autoPlay src={this.state.remoteStreamUrl}></video>
                {this.renderFull()}
            </div>
        )
    }
}

export default Video
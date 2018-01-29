import Peer from 'simple-peer'

export default {
    peer: null, 
    init: (stream, remoteVideoElement) => {
        this.peer = new Peer({
            initiator: window.location.hash === '#init',
            stream: stream,
            trickle: false,
        })
        return this.peer
    },
    connect: (otherId) => {
        this.peer.signal(JSON.parse(otherId))
    }  
} 
import Peer from 'simple-peer'

export default {
    peer: null, 
    init: (stream, remoteVideoElement) => {
        this.peer = new Peer({
            initiator: window.location.hash === '#init',
            stream: stream,
            trickle: false,
            config: {
                iceServers: [
                    { url: 'stun4.l.google.com:19302' },
                    {
                        url: 'turn:turn.anyfirewall.com:443?transport=tcp',
                        credential: 'webrct',
                        username: 'webrtc'
                    },
                ]
            }
        })
        return this.peer
    },
    connect: (otherId) => {
        this.peer.signal(JSON.parse(otherId))
    }  
} 
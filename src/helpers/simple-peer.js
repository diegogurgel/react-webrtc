import Peer from 'simple-peer'

export default class VideoCall {
    peer = null 
    init = (stream, initiator) => {
        this.peer = new Peer({
            initiator: initiator,
            stream: stream,
            trickle: false,
            reconnectTimer: 1000,
            iceTransportPolicy: 'relay',
            config: {
                iceServers: [
                    { urls: process.env.REACT_APP_STUN_SERVERS.split(',') },
                    {
                        urls: process.env.REACT_APP_TURN_SERVERS.split(','),
                        username: process.env.REACT_APP_TURN_USERNAME,
                        credential: process.env.REACT_APP_TURN_CREDENCIAL
                    },
                ]
            }
        })
        return this.peer
    }
    connect = (otherId) => {
        this.peer.signal(otherId)
    }  
} 
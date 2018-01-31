import Peer from 'simple-peer'

export default {
    peer: null, 
    init: (stream, initiator) => {
        this.peer = new Peer({
            initiator: initiator,
            stream: stream,
            trickle: false,
            reconnectTimer: 100,
            iceTransportPolicy: 'relay',
            config: {
                iceServers: [
                    { urls: ['stun:stun4.l.google.com:19302'] },
                    {
                        urls: ['turn:numb.viagenie.ca'],
                        credential: '12345678',
                        username: 'hi@diegogurgel.com'
                    },
                ]
            }
        })
        return this.peer
    },
    connect: (otherId) => {
        this.peer.signal(otherId)
    }  
} 
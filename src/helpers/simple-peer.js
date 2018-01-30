import Peer from 'simple-peer'

export default {
    peer: null, 
    init: (stream, initiator) => {
        this.peer = new Peer({
            initiator: initiator,
            stream: stream,
            trickle: false,
            config: {
                iceServers: [
                    { url: 'stun:stun4.l.google.com:19302' },
                    {
                        url: 'turn:numb.viagenie.ca',
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
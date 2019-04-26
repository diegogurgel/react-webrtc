import React from 'react'

const goToRoom = (history, roomId) => {
  history.push(`/${roomId.current.value}`)
}

export function goToRoomInput({history}) {
  let roomId = React.createRef();
  return (<div className="enter-room-container">
          <input type="text" ref={roomId} placeholder="Room id"/>
          <button onClick={() => {
            goToRoom(history, roomId)
          }}>Enter</button>
        </div>)
}
import React, { useState } from 'react'
import shortId from 'shortid'

const goToRoom = (history, roomId) => {
  history.push(`/${roomId}`)
}


export function goToRoomInput({history}) {
  let [roomId, setRoomId] = useState(shortId.generate());

  return (<div className="enter-room-container">
    <form>
          <input type="text" value={roomId} placeholder="Room id" onChange={(event) => {
            setRoomId(event.target.value)
          }}/>
          <button onClick={() => {
            goToRoom(history, roomId)
          }}>Enter</button>
          </form>
        </div>)
}
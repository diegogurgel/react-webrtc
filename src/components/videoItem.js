import React from 'react'

export default class VideoItem extends React.PureComponent {
  videoRef = React.createRef()

  componentDidMount () {
    this.componentDidUpdate()
  }
  componentDidUpdate () {
    const { stream } = this.props
    const video = this.videoRef.current

    if ('srcObject' in video) {
      video.srcObject = stream
    } else {
      video.src = window.URL.createObjectURL(stream) // for older browsers
    }
  }

  render () {
    const { userId } = this.props

    return (
        <video
          id={`video-${userId}`}
          autoPlay
          ref={this.videoRef}
        />
    )
  }
}

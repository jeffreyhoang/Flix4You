import { React } from "react";


const VideoPlayer = ({ src, videoRef }) => {

    return (
      <div className="video-player">
        <video ref={videoRef} width="720" height="400" controls>
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };
  
  export default VideoPlayer;
  
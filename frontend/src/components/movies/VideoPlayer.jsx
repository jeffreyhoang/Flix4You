const VideoPlayer = ({ src }) => {
    return (
      <div className="video-player">
        <video width="720" height="400" controls>
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };
  
  export default VideoPlayer;
  
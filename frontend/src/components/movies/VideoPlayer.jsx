const VideoPlayer = ({ src, title }) => {
    return (
      <div className="video-player">
        <h3>{title}</h3>
        <video width="720" height="400" controls>
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };
  
  export default VideoPlayer;
  
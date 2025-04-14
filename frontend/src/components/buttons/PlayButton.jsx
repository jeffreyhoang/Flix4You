import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const PlayButton = ({ videoRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    if (videoRef?.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <Button className="custom-gradient-btn-1" onClick={handleToggle}>
      {isPlaying ? "Pause" : "Play"}
    </Button>
  );
};

export default PlayButton;

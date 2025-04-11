import React from "react";
import Button from "react-bootstrap/Button";


const PlayButton = ({ videoRef }) => {

    const handlePlay = () => {
        if (videoRef?.current) {
            videoRef.current.play();
          }
    };

    return (
        <Button className="custom-gradient-btn-1" onClick={handlePlay}>
            Play
        </Button>
    )
}

export default PlayButton;
import React from "react";

const DownloadButton = ({ movie }) => {
  return (
    <a href={movie.movie_url} download={`${movie.title}.mp4`} className="btn custom-gradient-btn-2">
        Download
    </a>
  );
};

export default DownloadButton;

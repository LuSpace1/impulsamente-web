import React from "react";
import "./VideoSection.css";

const VideoSection = () => {
  // IMPORTANTE: Cuando suban su video, cambien ESTA ID por la suya.
  // La ID es la parte final del link de youtube (ej: dQw4w9WgXcQ)
  const youtubeVideoId = "H7SYuqnczuY"; // ID de ejemplo (Rick Roll para probar)

  return (
    <section className="video-section-container">
      <h2 className="video-title">Conoce nuestra metodología</h2>

      <div className="video-wrapper">
        <div className="video-aspect-ratio">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeVideoId}`}
            title="Video de nuestra metodología"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;

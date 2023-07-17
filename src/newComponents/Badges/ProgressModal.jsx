import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./ProgressModal.css";
import { LinearProgress } from "@mui/material";

function ProgressModal({ onClose, progressLevel, progressLabels }) {

  return (
    <div className="progress-modal-overlay">
      <div className="progress-modal">
        <div className="progress-container">
          {/* Progress Bar */}
          <CircularProgress
            variant="determinate"
            value={progressLevel}
            size={200}
            thickness={4}
            style={{
              width: "250px",
              height: "250px",
              borderRadius: "100%",
              color: '#83C55F',
              borderColor: '#3D71B8',
              borderStyle: "solid",
              borderWidth: "6px",
              backgroundColor: "transparent",
              boxShadow:
                "0 0 20px 5px rgba(255, 255, 0, 0.5), 0 0 10px 0 rgba(255, 255, 0, 0.5)",
            }}
          />

        </div>
        <div
          className="progress-label"
          dangerouslySetInnerHTML={{
            __html: progressLabels[Math.floor(progressLevel / 20)],
          }}
        ></div>
        <button className="modal-close" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}

export default ProgressModal;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Badges.css";
import CircularProgress from '@mui/material/CircularProgress';

function Badges() {
  const dispatch = useDispatch();
  const badgesEarned = useSelector((store) => store.badges);

  useEffect(() => {
    dispatch({ type: "FETCH_BADGES" });
  }, [dispatch]);

  const progressLevel = 100; // Set the desired progress level here (0-100)
  const progressLabels = [
    "",
    "Every day in every way, I am getting stronger.",
    "In me, I trust.",
    "Inhale the future, exhale the past.",
    "I am open to the possibilities of the Universe.",
    "I am a magnet for health, wealth, and happiness."
  ];

  return (
    <div className="container1">
      <div className="header1">
        <h1 className="badges-title">Badges</h1>
        <img
          src="Logo/cg-smile-icon.png"
          alt="ChangeGrower Logo"
          className="logo"
        />
      </div>
      
      <div className="badgescontainer">
        {badgesEarned.map((badge) => {
          const isCurrentUserBadge = badge.user_id !== null && badge.user_id === 1;
          const badgeImageSrc = isCurrentUserBadge
            ? `/badges/${badge.badge_name.replace(/\s/g, '')}.png`
            : `/badges/${badge.badge_name.replace(/\s/g, '')}Gray.png`;
  
          return (
            <div key={badge.id} className="badge-container">
              <img
                className="badges"
                src={badgeImageSrc}
                alt={badge.badge_name}
              />
              {isCurrentUserBadge && (
                <div className="checkmark">
                  <img
                    src="/badges/checkmark.png"
                    alt="Checkmark"
                    className="checkmark-icon"
                  />
                </div>
              )}
              <div className="badge-summary">
                <p>{badge.summary}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        
        <CircularProgress
          variant="determinate"
          value={progressLevel}
          size={200}
          thickness={4}
          className="progress-bar"
        />
        
      </div>
      <p className="progress-label">{progressLabels[Math.floor(progressLevel / 20)]}</p>
    </div>
  );
}

export default Badges;

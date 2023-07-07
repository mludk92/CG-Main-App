import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Badges.css";
import CircularProgress from '@mui/material/CircularProgress';

function Badges() {
  const dispatch = useDispatch();
  const badgesEarned = useSelector((store) => store.badges);
  const logindata = useSelector((store) => store.logindata);

  useEffect(() => {
    dispatch({ type: "FETCH_BADGES" });
    dispatch({ type: "FETCH_LOGIN_DATA" });
  }, [dispatch]);

  // Add a check to ensure logindata array has data
  if (!logindata || logindata.length === 0) {
    return <div>Loading...</div>;
  }

  const progressLevel = logindata[0].streak * 20; // Set the desired progress level here (0-100)
  const progressLabels = [
    "",
    "Every day in every way, I am getting stronger.<br/>Great job! You have logged for 1 day in a row!",
    "In me, I trust.<br/>2 days now! Keep it up!",
    "Inhale the future, exhale the past.<br/>Amazing job! You have logged for 3 days in a row!",
    "I am open to the possibilities of the Universe.<br/> What an achievement! You have logged for 4 days in a row!",
    "I am a magnet for health, wealth, and happiness. <br/> The Progess bar is filled, just like your heart!<br/> You have logged for 5 days in a row!",
  ];

  //scroll bar behavior 
  useEffect(() => {
    const container = document.querySelector(".badgescontainer");
    const indicator = document.querySelector(".indicator");

    const handleScroll = () => {
      if (container.scrollTop > 0) {
        indicator.classList.add("transparent");
      } else {
        indicator.classList.remove("transparent");
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        {/* Indicator */}
        {badgesEarned.length > 4 && (
          <div className="indicator">Scroll for more badges</div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="progress-container">

        <CircularProgress
          variant="determinate"
          value={progressLevel}
          size={200}
          thickness={4}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "100%",
            color: "#83C55F",
            borderColor: "#3D71B8",
            borderStyle: "solid",
            backgroundColor: "transparent",
          }}
          className="progress-bar"
        />

      </div>
      <div className="progress-label" dangerouslySetInnerHTML={{ __html: progressLabels[Math.floor(progressLevel / 20)] }}></div>
    </div>
  );
}

export default Badges;

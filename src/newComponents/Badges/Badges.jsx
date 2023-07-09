import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Badges.css";
import CircularProgress from "@mui/material/CircularProgress";


function Badges() {
  const dispatch = useDispatch();
  const badgesEarned = useSelector((store) => store.badges);
  const logindata = useSelector((store) => store.logindata);
  
  const [filter, setFilter] = useState("all"); // Filter state
  const [showTooltip, setShowTooltip] = useState(false);
console.log(logindata)
  useEffect(() => {
    dispatch({ type: "FETCH_BADGES" });
    dispatch({ type: "FETCH_LOGIN_DATA" });
  }, [dispatch]);

 

  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector(".badgescontainer");
      const indicator = document.querySelector(".indicator");
  
      if (container) {
        if (container.scrollTop > 0) {
          indicator.classList.add("transparent");
        } else {
          indicator.classList.remove("transparent");
        }
      }
    };
  
    const container = document.querySelector(".badgescontainer");
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
  
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);


  // Add a check to ensure logindata array has data
  if (!logindata || logindata.length === 0) {
    return <div>Loading...</div>;
  }

  const progressLevel = logindata[0].streak * 20; // Set the desired progress level here (0-100)
  const progressLabels = [
    "",
    `Every day in every way, I am getting stronger.<br/>Great job! You have logged in for ${logindata[0].streak} day in a row!`,
    `In me, I trust.<br/>${logindata[0].streak} days now! Keep it up!`,
    `Inhale the future, exhale the past.<br/>Amazing job! You have logged in for ${logindata[0].streak} days in a row!`,
    `I am open to the possibilities of the Universe.<br/> What an achievement! You have logged in for ${logindata[0].streak} days in a row!`,
    `I am a magnet for health, wealth, and happiness. <br/> The Progress bar is filled, just like your heart!<br/> You have logged in for ${logindata[0].streak} days in a row!`,
  ];

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const radioButtons = [
    { label: "All", value: "all" },
    { label: "Achieved", value: "achieved" },
    { label: "Not Achieved", value: "not-achieved" },
  ];

  const filteredBadges = badgesEarned.filter((badge) => {
    if (filter === "all") {
      return true;
    } else if (filter === "achieved") {
      return badge.user_id !== null && badge.user_id === 1;
    } else if (filter === "not-achieved") {
      return badge.user_id === null || badge.user_id !== 1;
    }
    return false;
  });

  return (
    <div className="main-container">
      <div className="container1">
        <div className="header1">
          <h1 className="badges-title">Badges</h1>
          <img src="Logo/cg-smile-icon.png" alt="ChangeGrower Logo" className="logo" />
        </div>

        <div className="filter-container">
          {radioButtons.map((button) => (
            <label key={button.value} className="radio-button">
              <input
                type="radio"
                value={button.value}
                checked={filter === button.value}
                onChange={handleFilterChange}
              />
              <span className="radio-custom"></span>
              <span className="radio-label">{button.label}</span>
            </label>
          ))}
        </div>

        <div className="badgescontainer">
          {filteredBadges.map((badge) => {
            const isCurrentUserBadge = badge.user_id !== null && badge.user_id === 1;
            const badgeImageSrc = isCurrentUserBadge
              ? `/badges/${badge.badge_name.replace(/\s/g, "")}.png`
              : `/badges/${badge.badge_name.replace(/\s/g, "")}Gray.png`;

            return (
              <div key={badge.id} className="badge-container">
                <img className="badges" src={badgeImageSrc} alt={badge.badge_name} />
                {isCurrentUserBadge && (
                  <div className="checkmark">
                    <img src="/badges/checkmark.png" alt="Checkmark" className="checkmark-icon" />
                  </div>
                )}
                <div className="badge-summary">
                  <p>{badge.summary}</p>
                </div>
              </div>
            );
          })}
          {/* Indicator */}
          {filteredBadges.length > 4 && (
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
              borderWidth: "6px",
              backgroundColor: "transparent",
              boxShadow: "0 0 20px 5px rgba(255, 255, 0, 0.5), 0 0 10px 0 rgba(255, 255, 0, 0.5)",
            }}
            className="progress-bar"
          />
        </div>
        <div
          className="progress-label"
          dangerouslySetInnerHTML={{ __html: progressLabels[Math.floor(progressLevel / 20)] }}
        ></div>
        {showTooltip && <div className="tooltip">Tooltip Text</div>}
      </div>
    </div>
  );
}

export default Badges;

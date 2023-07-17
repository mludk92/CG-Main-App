import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Badges.css";

import ProgressModal from "./ProgressModal";

function Badges() {
  const dispatch = useDispatch();
  const badgesEarned = useSelector((store) => store.badges);
  const logindata = useSelector((store) => store.logindata);
  const userId = useSelector((state) => state.user.id);
  const [filter, setFilter] = useState("all"); // Filter state
  const [showTooltip, setShowTooltip] = useState(false);
  const [quote, setQuote] = useState(""); // State to hold fetched quote
  const [showModal, setShowModal] = useState(true); // State to control modal visibility

  useEffect(() => {
    dispatch({ type: "FETCH_BADGES" });
    dispatch({ type: "FETCH_LOGIN_DATA" });

    // Fetch motivational quote from API
    fetch("https://quote-garden.onrender.com/api/v3/quotes?genre=motivational")
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.data.length);
        setQuote(data.data[randomIndex].quoteText);
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  const handleScroll = () => {
    const container = document.querySelector(".badgescontainer");
    const indicator = document.querySelector(".indicator");

    if (container && indicator) {
      if (container.scrollTop > 0) {
        indicator.classList.add("transparent");
      } else {
        indicator.classList.remove("transparent");
      }
    }
  };

  useEffect(() => {
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

  if (!logindata || logindata.length === 0) {
    return <div>Loading...</div>;
  }

  const progressLevel = logindata[0].streak * 20;

  const progressLabels = [
    "",
    `${quote}<br/>Great job! You have logged in for <span style="font-weight:bold; font-size:25px;">${logindata[0].streak}</span> day in a row!`,
    `${quote}<br/><span style="font-weight:bold; font-size:25px;">${logindata[0].streak}</span> days now! Keep it up!`,
    `${quote}<br/>Amazing job! You have logged in for <span style="font-weight:bold; font-size:25px;">${logindata[0].streak}</span> days in a row!`,
    `${quote}<br/> What an achievement! You have logged in for <span style="font-weight:bold; font-size:25px;">${logindata[0].streak}</span> days in a row!`,
    `${quote}<br/> The Progress bar is filled, just like your heart!<br/> You have logged in for <span style="font-weight:bold; font-size:25px;">${logindata[0].streak}</span> days in a row!`,
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
      return badge.user_id !== null && badge.user_id === userId;
    } else if (filter === "not-achieved") {
      return badge.user_id === null;
    }
    return false;
  });
  console.log("filteredBadges:", filteredBadges);
  console.log(userId, "userId");
  console.log(badgesEarned, "badgesEarned");

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="main-container">
      {showModal && (
        <ProgressModal
          onClose={closeModal}
          progressLevel={progressLevel}
          progressLabels={progressLabels}
        />
      )}
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
            const isCurrentUserBadge =
              badge.user_id !== null && badge.user_id === userId;
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
          {filteredBadges.length > 4 && <div className="indicator">Scroll for more badges</div>}
        </div>
      </div>
    </div>
  );
}

export default Badges;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Badges.css";
function Badges() {
  const dispatch = useDispatch();
  const badgesEarned = useSelector((store) => store.badges);

  useEffect(() => {
    dispatch({ type: "FETCH_BADGES" });
  }, [dispatch]);

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
      <h3>Welcome to the Badges Page</h3>
      <div className="badgescontainer1">
        {badgesEarned.map((badge) => {
          const isCurrentUserBadge = badge.user_id !== null && badge.user_id === 1;
          const badgeImageSrc = isCurrentUserBadge
            ? `/badges/${badge.badge_name.replace(/\s/g, '')}.png`
            : `/badges/${badge.badge_name.replace(/\s/g, '')}Gray.png`;
  
          return (
            <img
              key={badge.id}
              className="badges"
              src={badgeImageSrc}
              alt={badge.badge_name}
            />
          );
        })}
      </div>

    </div>
  );
  
  
}

export default Badges;

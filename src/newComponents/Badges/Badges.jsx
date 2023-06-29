import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Badges() {
  const dispatch = useDispatch();
  const journalEntries = useSelector((store) => store.badges);

  useEffect(() => {
    dispatch({ type: "FETCH_BADGES" });
  }, [dispatch]);

  return (
    <div className="container">
      <h3>Welcome to the Badges Page</h3>
      <p>Map of Badges goes here</p>
      <pre>{JSON.stringify(badgesEarned)}</pre>
      <input type="text" />
      <button>Submit</button>
    </div>
  );
}

export default Badges;

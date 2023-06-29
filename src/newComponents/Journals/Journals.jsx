import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Journals() {
  const dispatch = useDispatch();
  const journalEntries = useSelector((store) => store.journal);

  useEffect(() => {
    dispatch({ type: "FETCH_JOURNAL" });
  }, [dispatch]);

  return (
    <div className="container">
      <h3>Welcome to the Journals Page</h3>
      <p>Map of journals goes here</p>
      <pre>{JSON.stringify(journalEntries)}</pre>
      <input type="text" />
      <button>Submit</button>
    </div>
  );
}

export default Journals;

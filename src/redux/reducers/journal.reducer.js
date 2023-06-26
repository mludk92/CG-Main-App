const journalReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_JOURNAL':
        return action.payload;
      case 'ADD_JOURNAL_ENTRY': // Update the action type for adding a new journal entry
        return [...state, action.payload]; // Add the new journal entry to the state array
      case 'RESET_JOURNAL':
        return [];
      default:
        return state;
    }
  };
  
  export default journalReducer;
  
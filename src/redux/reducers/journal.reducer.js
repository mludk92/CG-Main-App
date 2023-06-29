const journalReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_JOURNAL':
      return action.payload;
    case 'ADD_JOURNAL_ENTRY':
      return [...state, action.payload];
    case 'RESET_JOURNAL':
      return [];
    default:
      return state;
  }
};

export default journalReducer;

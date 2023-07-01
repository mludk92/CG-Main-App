import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_JOURNAL" and "DELETE_JOURNAL_ENTRY" actions
function* fetchJournal() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.get('/journal', config);

    yield put({ type: 'SET_JOURNAL', payload: response.data });
  } catch (error) {
    console.log('Journal get request failed', error);
  }
}

function* deleteJournalEntry(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    yield axios.delete('/journal', { data: action.payload }, config);

    // After successful delete, fetch the updated journal entries
    yield put({ type: 'FETCH_JOURNAL' });
  } catch (error) {
    console.log('Journal delete request failed', error);
  }
}

function* insertJournalEntry(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    yield axios.post('/journal', action.payload, config);

    // After successful insert, fetch the updated journal entries
    yield put({ type: 'FETCH_JOURNAL' });
  } catch (error) {
    console.log('Journal POST request failed', error);
  }
}

function* editJournalEntry(action) {
  try {
    const { payload } = action;
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    console.log(payload);
    yield axios.put('/journal', payload, config);

    // Dispatch an action to update the Redux store
    yield put({ type: 'FETCH_JOURNAL' });
  } catch (error) {
    console.log('Journal entry edit request failed in saga', error);
  }
}

function* journalSaga() {
  yield takeLatest('FETCH_JOURNAL', fetchJournal);
  yield takeLatest('DELETE_JOURNAL_ENTRY', deleteJournalEntry);
  yield takeLatest('INSERT_JOURNAL_ENTRY', insertJournalEntry);
  yield takeLatest('EDIT_JOURNAL_ENTRY', editJournalEntry);
}

export default journalSaga;

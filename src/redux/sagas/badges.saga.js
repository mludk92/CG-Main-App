import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchBadges() {
  try {
    const response = yield axios.get('/api/badges');
    yield put({ type: 'SET_BADGES_LIST', payload: response.data });
  } catch (error) {
    console.log('Badges get request failed', error);
  }
}

function* badgesSaga() {
  yield takeLatest('FETCH_BADGES', fetchBadges);
}

export default badgesSaga;
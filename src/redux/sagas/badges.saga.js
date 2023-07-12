import axios from 'axios';
import { put, takeLatest, call, select } from 'redux-saga/effects';
import { useSelector } from 'react-redux';

function* fetchBadges() {
  try {
    const response = yield axios.get('/api/badges');
    yield put({ type: 'SET_BADGES_LIST', payload: response.data });
  } catch (error) {
    console.log('Badges get request failed', error);
  }
}

function* postBadgesInBackground() {
  try {
    const userId = yield select(state => state.user.id); // Get the user ID from the Redux store or appropriate location
    const response = yield call(axios.post, '/api/badges');
    yield put({ type: 'SET_NEW_BADGE', payload: response.data });
  } catch (error) {
    console.log('Error posting badges:', error);
  }
}

function* badgesSaga() {
  yield takeLatest('FETCH_BADGES', fetchBadges);
  yield takeLatest('POST_BADGES_IN_BACKGROUND', postBadgesInBackground);
}

export default badgesSaga;
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchLogindata() {
  try {
    const response = yield axios.get('/api/logindata');
    yield put({ type: 'SET_LOGIN_DATA_LIST', payload: response.data });
  } catch (error) {
    console.log('Login Data get request failed', error);
  }
}

function* logindataSaga() {
  yield takeLatest('FETCH_LOGIN_DATA', fetchLogindata);
}

export default logindataSaga;
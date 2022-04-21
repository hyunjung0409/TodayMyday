import axios from 'axios'
import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects'
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
} from '../reducers/user'

function logInAPI(data) {
  return axios.post('/api/login', data)
}

function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data)
    const { navigate } = action.data
    yield delay(2000)
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    })
    navigate('/')
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    })
  }
}

function logOutAPI() {
  return axios.post('/api/logout')
}

function* logOut(action) {
  try {
    // const result = yield call(logOutAPI)
    const { navigate } = action.data
    yield delay(2000)
    yield put({
      type: LOG_OUT_SUCCESS,
    })
    navigate('/')
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    })
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn)
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut)
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)])
}

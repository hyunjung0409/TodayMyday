import { getAxios } from '../api'
import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects'
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from '../reducers/user'
import setAuthorizationToken from '../utils/setAuthorizationToken'

const axios = getAxios()

function loadUsedrAPI(data) {
  return axios.get(`/user/read/${data}`)
}

function* loadUser(action) {
  try {
    const result = yield call(loadUsedrAPI, action.data)
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data.user,
    })
  } catch (err) {
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data,
    })
  }
}

function logInAPI(data) {
  return axios.post('/user/login', { userId: data.userId, password: data.password })
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data)
    let str = result.headers.authorization
    const token = str.substr(7)
    localStorage.setItem('jwtToken', token)
    setAuthorizationToken(token)
    const { navigate } = action.data
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

function* logOut(action) {
  try {
    const { navigate } = action.data
    yield delay(1000)
    localStorage.removeItem('jwtToken')
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

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser)
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn)
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut)
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchLoadUser)])
}

import { getAxios } from '../api'
import { all, fork, takeLatest, call, put } from 'redux-saga/effects'
import {
  ARTICLE_ADD_FAILURE,
  ARTICLE_ADD_REQUEST,
  ARTICLE_ADD_SUCCESS,
  ARTICLE_LIST_REQUEST,
  ARTICLE_LIST_SUCCESS,
  ARTICLE_LIST_FAILURE,
} from '../reducers/article'

const axios = getAxios()

function articleAddAPI(data) {
  const article = data.data
  return axios.post(`diary/${data.userId}`, article)
}

function* articleAdd(action) {
  try {
    yield call(articleAddAPI, action.data)
    yield put({
      type: ARTICLE_ADD_SUCCESS,
      data: action.data,
    })
  } catch (err) {
    yield put({
      type: ARTICLE_ADD_FAILURE,
      error: err.response.data,
    })
  }
}

function articleListAPI(data) {
  return axios.get(`/user/read/${data}`)
}

function* articleList(action) {
  try {
    const result = yield call(articleListAPI, action.data)
    const dairies = result.data.user.dairies
    yield put({
      type: ARTICLE_LIST_SUCCESS,
      data: dairies,
    })
  } catch (err) {
    yield put({
      type: ARTICLE_LIST_FAILURE,
      error: err.response.data,
    })
  }
}

function* watchArticleAdd() {
  yield takeLatest(ARTICLE_ADD_REQUEST, articleAdd)
}

function* watchArticleList() {
  yield takeLatest(ARTICLE_LIST_REQUEST, articleList)
}

export default function* userSaga() {
  yield all([fork(watchArticleAdd), fork(watchArticleList)])
}

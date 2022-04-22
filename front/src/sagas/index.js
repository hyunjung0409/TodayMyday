import { all, fork } from 'redux-saga/effects'
import userSaga from './user'
import articleSaga from './article'

export default function* rootSaga() {
  yield all([fork(userSaga), fork(articleSaga)])
}

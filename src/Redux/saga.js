
import { put, takeEvery, delay } from 'redux-saga/effects';
import { startPractice, finishPractice } from './action';
import { START_PRACTICE } from './actionTypes';

function* practiceTimer() {
  yield delay(300000); // 5 minutes
  yield put(finishPractice());
}

export function* watchPractice() {
  yield takeEvery(START_PRACTICE, practiceTimer);
}

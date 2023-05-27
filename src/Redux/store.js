

import {  applyMiddleware, legacy_createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import { watchPractice } from './saga';

const sagaMiddleware = createSagaMiddleware();

export const store = legacy_createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchPractice);
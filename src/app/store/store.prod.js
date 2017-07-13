import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'app/ducks';
import rootSaga from 'app/sagas';

const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
	applyMiddleware(sagaMiddleware),
);

export default function configureStore (initialState) {
	const store = createStore(rootReducer, fromJS(initialState), enhancer);

	sagaMiddleware.run(rootSaga);

	return store;
};

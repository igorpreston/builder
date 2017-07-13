import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'app/ducks';
import rootSaga from 'app/sagas';
import DevTools from 'app/components/DevTools';

const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
	applyMiddleware(sagaMiddleware),
	DevTools.instrument(),
);

export default function configureStore (initialState) {
	const store = createStore(rootReducer, fromJS(initialState), enhancer);

	if (module.hot) {
		module.hot.accept('app/ducks', () => {
			return store.replaceReducer(rootReducer);
		});
	}

	sagaMiddleware.run(rootSaga);

	return store;
};

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import errorsReducers from './reducers/errors.reducers';
import profileReducer from './reducers/profile.reducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    errror: errorsReducers,
    candidate: profileReducer
})

const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store;
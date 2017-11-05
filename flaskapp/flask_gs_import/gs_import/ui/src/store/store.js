import {applyMiddleware, createStore} from "redux"
import thunk from "redux-thunk"

import reducer from './main_reducer'

import {composeWithDevTools} from 'redux-devtools-extension';

const checkAuthenticated = store => next => action => {
    console.log(action)
    if (action.meta === 'api_call' &&
        action.type.includes('_REJECTED') &&
        action.payload.response &&
        action.payload.response.status === 401
    ) {
        alert('logged out')
    } else {
        return next(action);
    }

};

const middleware = applyMiddleware(thunk);

const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options if needed
});
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    middleware
));


export default store
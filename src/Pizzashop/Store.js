

import { createStore, applyMiddleware } from 'redux';
import {thunk }from 'redux-thunk'; // Correct import statement
import rootReducer from './Reducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;


// import { createStore, applyMiddleware } from 'redux';
// import { thunk } from 'redux-thunk';
// import rootReducer from './Reducer';

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;
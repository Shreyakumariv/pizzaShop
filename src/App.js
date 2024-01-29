import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import rootReducer from './Pizzashop/Reducer';
import PizzaDashboard from './Pizzashop/Components/PizzaDashboard'
import PizzaOrderForm from './Pizzashop/Components/PizzaOrderForm';

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
    <div>
      <PizzaOrderForm />
      <PizzaDashboard />
    </div>
  </Provider>
  )
}

export default App

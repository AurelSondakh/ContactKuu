import React from 'react';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './App/Redux/Reducers/index';
import AppNavigator from './App/Router/AppNavigator';

const App = () => {

  const clientStore = configureStore({
    reducer: rootReducer
  })

  return (
    <Provider store={clientStore}>
      <AppNavigator />
    </Provider>
  );
};

export default App;

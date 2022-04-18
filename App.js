import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TimeFeederNaviagor from './Navigation/TimeFeederNaviagor';
import 'react-native-gesture-handler';

import { createStore, combineReducers } from 'redux'
import itemsReducer from './Store/reducers/items'
import logsReducer from './Store/reducers/logs' 
import { Provider } from 'react-redux'

const rootReducer = combineReducers({
  items: itemsReducer,
  logs: logsReducer
});

const store = createStore(rootReducer);

export default function App() {

  return (<Provider store={store}>
    <NavigationContainer>
      <TimeFeederNaviagor />
    </NavigationContainer>
  </Provider>);
}


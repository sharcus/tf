import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TimeFeederNaviagor from "./Navigation/TimeFeederNaviagor";
import "react-native-gesture-handler";

import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./Store/reducers/items";
import logsReducer from "./Store/reducers/logs";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    items: itemsReducer,
    logs: logsReducer,
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TimeFeederNaviagor />
      </NavigationContainer>
    </Provider>
  );
}

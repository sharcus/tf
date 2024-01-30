import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TimeFeederNaviagor from "./Navigation/TimeFeederNaviagor";
import "react-native-gesture-handler";

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import itemsReducer from "./Store/reducers/items";
import logsReducer from "./Store/reducers/logs";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/es/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  items: itemsReducer,
  logs: logsReducer,
});

const persistConfig = {
  storage: AsyncStorage,
  key: "root",
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <TimeFeederNaviagor />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

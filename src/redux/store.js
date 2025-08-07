import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { persistConfig } from './persistConfig';
import { combineReducers } from 'redux';
import textReducer from './slices/textSlice';
import ideaReducer from './slices/ideaSlice';

const rootReducer = combineReducers({
  // audio: audioReducer/**/,
  text: textReducer,
  ideas: ideaReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

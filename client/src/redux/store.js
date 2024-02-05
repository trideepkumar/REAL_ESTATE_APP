import { combineReducers, configureStore } from '@reduxjs/toolkit';
import useReducer from './user/userSlice.js';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ user: useReducer });

const persistConfig = {
    key: 'root',
    storage, // Corrected the variable name here
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // Corrected the variable name here

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

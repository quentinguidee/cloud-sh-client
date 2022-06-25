import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import authSlice from "Store/Slices/AuthSlice";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
    auth: authSlice,
});

const reducer = persistReducer({ key: "root", storage }, reducers);

const store = configureStore({
    reducer: reducer,
});

export const persistor = persistStore(store);

export type StoreState = ReturnType<typeof store.getState>;

export default store;

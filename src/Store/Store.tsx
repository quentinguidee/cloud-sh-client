import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import authSlice from "Store/Slices/AuthSlice";
import storage from "redux-persist/lib/storage";
import messagesSlice from "Store/Slices/MessagesSlice";
import { PersistConfig } from "redux-persist/es/types";

const reducers = combineReducers({
    auth: authSlice,
    messages: messagesSlice,
});

const persistConfig: PersistConfig<any> = {
    key: "root",
    storage,
    blacklist: ["messages"],
};

const reducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
        });
    },
});

export const persistor = persistStore(store);

export type StoreState = ReturnType<typeof store.getState>;

export default store;

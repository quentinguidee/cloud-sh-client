import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "Store/Slices/AuthSlice";
import messagesSlice from "Store/Slices/MessagesSlice";
import commandsSlice from "Store/Slices/CommandsSlice";
import { PersistConfig } from "redux-persist/es/types";
import themeSlice from "Store/Slices/ThemeSlice";

const reducers = combineReducers({
    auth: authSlice,
    commands: commandsSlice,
    messages: messagesSlice,
    theme: themeSlice,
});

const persistConfig: PersistConfig<any> = {
    key: "root",
    storage,
    blacklist: ["messages", "commands"],
};

export const reducer = persistReducer(persistConfig, reducers);

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

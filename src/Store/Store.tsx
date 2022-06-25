import { configureStore } from "@reduxjs/toolkit";
import authSlice from "Store/Slices/AuthSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
    },
});

export type StoreState = ReturnType<typeof store.getState>;

export default store;

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "Store/Slices/AuthSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
    },
});

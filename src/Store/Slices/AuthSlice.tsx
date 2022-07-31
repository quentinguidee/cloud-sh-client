import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "Models/User";
import { Token } from "Models/Token";
import { StoreState } from "Store/Store";

function setUserReducer(state, action: PayloadAction<{ user: User }>) {
    const { payload: user } = action;
    state.user = user;
}

function setTokenReducer(state, action: PayloadAction<{ token: Token }>) {
    const { payload: token } = action;
    state.token = token;
}

type AuthState = {
    user?: User;
    token?: Token;
};

const authSlice = createSlice({
    name: "auth",
    initialState: {} as AuthState,
    reducers: {
        setUser: setUserReducer,
        setToken: setTokenReducer,
    },
});

export const { setUser, setToken } = authSlice.actions;

export const getUser = (state: StoreState) => state.auth.user;
export const getToken = (state: StoreState) => state.auth.token;

export default authSlice.reducer;

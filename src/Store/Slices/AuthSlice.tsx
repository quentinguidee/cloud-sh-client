import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "Models/User";
import { Session } from "Models/Session";
import { StoreState } from "Store/Store";

function setUserReducer(state, action: PayloadAction<{ user: User }>) {
    const { payload: user } = action;
    state.user = user;
}

function setSessionReducer(state, action: PayloadAction<{ session: Session }>) {
    const { payload: session } = action;
    state.session = session;
}

type AuthState = {
    user?: User;
    session?: Session;
};

const authSlice = createSlice({
    name: "auth",
    initialState: {} as AuthState,
    reducers: {
        setUser: setUserReducer,
        setSession: setSessionReducer,
    },
});

export const { setUser, setSession } = authSlice.actions;

export const getUser = (state: StoreState) => state.auth.user;
export const getSession = (state: StoreState) => state.auth.session;

export default authSlice.reducer;

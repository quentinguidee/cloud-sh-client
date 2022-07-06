import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreState } from "Store/Store";
import { Theme } from "Models/Theme";

function setThemeReducer(state, action: PayloadAction<Theme>) {
    const { payload: theme } = action;
    return theme;
}

const themeSlice = createSlice({
    name: "theme",
    initialState: "light" as Theme,
    reducers: {
        setTheme: setThemeReducer,
    },
});

export const { setTheme } = themeSlice.actions;

export const getTheme = (state: StoreState) => state.theme;

export default themeSlice.reducer;

import React from "react";
import Router from "./Router";
import classNames from "classnames";

import "Assets/Reset.sass";
import "Assets/App.sass";
import { Provider } from "react-redux";
import store, { persistor } from "Store/Store";
import { PersistGate } from "redux-persist/integration/react";
import { useTheme } from "Store/Hooks/useTheme";

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Container />
            </PersistGate>
        </Provider>
    );
}

function Container() {
    const theme = useTheme();

    return (
        <div className={classNames(theme)}>
            <Router />
        </div>
    );
}

export default App;

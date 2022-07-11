import React from "react";
import Router from "./Router";
import classNames from "classnames";

import "Assets/Reset.sass";
import "Assets/App.sass";
import { Provider } from "react-redux";
import store, { persistor } from "Store/Store";
import { PersistGate } from "redux-persist/integration/react";
import { useTheme } from "Store/Hooks/useTheme";
import MessageBoxStack from "Components/MessageBoxStack/MessageBoxStack";
import { useMessages } from "Store/Hooks/useMessages";

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
    const messages = useMessages();

    const theme = useTheme();

    return (
        <div className={classNames(theme)}>
            <Router />
            <MessageBoxStack messages={messages} />
        </div>
    );
}

export default App;

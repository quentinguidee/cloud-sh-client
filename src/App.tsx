import React from "react";
import Router from "./Router";
import classNames from "classnames";

import "Assets/Reset.sass";
import "Assets/App.sass";
import { Provider } from "react-redux";
import store from "Store/Store";

function App() {
    const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");

    // TODO: It should be possible to turn off darkTheme on demand(for the user, for testing purpose...)

    return (
        <Provider store={store}>
            <div
                className={classNames(
                    // FIXME: Re-enable this
                    darkTheme.matches ? /* dark */ "light" : "light",
                )}
            >
                <Router />
            </div>
        </Provider>
    );
}

export default App;

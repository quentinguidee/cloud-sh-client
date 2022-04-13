import React from "react";
import Router from "./Router";
import classNames from "classnames";

import "Assets/Reset.sass";
import "Assets/App.sass";

function App() {
    const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");

    // TODO: It should be possible to turn off darkTheme on demand(for the user, for testing purpose...)

    return (
        <div
            className={classNames(
                // FIXME: Re-enable this
                darkTheme.matches ? /* dark */ "light" : "light",
            )}
        >
            <Router />
        </div>
    );
}

export default App;

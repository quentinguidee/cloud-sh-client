import React from "react";
import Router from "./Router";
import classNames from "classnames";

import "Assets/Reset.sass";
import "Assets/App.sass";

function App() {
    const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");

    return (
        <div className={classNames(darkTheme.matches ? "dark" : "light")}>
            <Router />
        </div>
    );
}

export default App;

import React from "react";
import NavBar from "Components/NavBar/NavBar";
import NavBarItem from "Components/NavBarItem/NavBarItem";

import Layout from "Components/Layout/Layout";

function SettingsNavBar() {
    return (
        <NavBar title="Settings">
            <Layout vertical stretch gap={4}>
                <NavBarItem to="/settings/me" icon="person">
                    My info
                </NavBarItem>
                <NavBarItem to="/settings/appearance" icon="palette">
                    Appearance
                </NavBarItem>
            </Layout>
        </NavBar>
    );
}

export default SettingsNavBar;

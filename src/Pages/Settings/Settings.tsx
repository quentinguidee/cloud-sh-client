import React from "react";
import Page from "Layouts/Page/Page";
import SettingsNavBar from "Pages/Settings/SettingsNavBar";
import { Route, Routes } from "react-router-dom";
import SettingsProfile from "Pages/Settings/Categories/SettingsProfile";
import SettingsAppearance from "Pages/Settings/Categories/SettingsAppearance";

function Settings() {
    return (
        <React.Fragment>
            <SettingsNavBar />
            <Page>
                <Routes>
                    <Route path="profile/*" element={<SettingsProfile />} />
                    <Route
                        path="appearance/*"
                        element={<SettingsAppearance />}
                    />
                </Routes>
            </Page>
        </React.Fragment>
    );
}

export default Settings;

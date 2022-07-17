import React from "react";
import TitleBar from "Layouts/TitleBar/TitleBar";
import Layout from "Components/Layout/Layout";
import { Text } from "Components/Text/Text";
import ThemeToggle from "Components/ThemeToggle/ThemeToggle";

function SettingsProfile() {
    return (
        <React.Fragment>
            <TitleBar title="Appearance" />
            <Layout horizontal center gap={12}>
                <ThemeToggle>
                    <Text>Change theme</Text>
                </ThemeToggle>
            </Layout>
        </React.Fragment>
    );
}

export default SettingsProfile;

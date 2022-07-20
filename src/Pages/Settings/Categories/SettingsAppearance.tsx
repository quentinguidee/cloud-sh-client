import React from "react";
import TitleBar from "Layouts/TitleBar/TitleBar";
import Layout from "Components/Layout/Layout";
import { Text } from "Components/Text/Text";
import ThemeToggle from "Components/ThemeToggle/ThemeToggle";
import ColorPalette from "Components/ColorPalette/ColorPalette";

function SettingsProfile() {
    return (
        <React.Fragment>
            <TitleBar title="Appearance" />
            <Layout vertical left gap={12}>
                <ColorPalette
                    colors={[
                        "var(--background-secondary)",
                        "var(--accent)",
                        "var(--background-red)",
                        "var(--background-orange)",
                        "var(--background-blue)",
                    ]}
                />
                <ThemeToggle>
                    <Text>Change theme</Text>
                </ThemeToggle>
            </Layout>
        </React.Fragment>
    );
}

export default SettingsProfile;

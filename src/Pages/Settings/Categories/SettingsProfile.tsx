import React from "react";
import { Text } from "Components/Text/Text";
import TitleBar from "Layouts/TitleBar/TitleBar";
import Layout from "Components/Layout/Layout";
import ProfilePicture from "Components/ProfilePicture/ProfilePicture";
import { useUser } from "Store/Hooks/useUser";

function SettingsProfile() {
    const user = useUser();

    return (
        <React.Fragment>
            <TitleBar title="My profile" />
            <Layout vertical left gap={12}>
                <Layout horizontal center gap={12}>
                    <ProfilePicture src={user.profile_picture} />
                    <Text>{user.name}</Text>
                </Layout>
            </Layout>
        </React.Fragment>
    );
}

export default SettingsProfile;

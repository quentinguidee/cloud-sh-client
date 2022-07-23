import React from "react";
import { Caption, Text } from "Components/Text/Text";
import TitleBar from "Layouts/TitleBar/TitleBar";
import Layout from "Components/Layout/Layout";
import ProfilePicture from "Components/ProfilePicture/ProfilePicture";
import { useUser } from "Store/Hooks/useUser";
import AccountRole from "Components/AccountRole/AccountRole";

type InfoProps = React.PropsWithChildren<{
    title: string;
}>;

function Info(props: InfoProps) {
    const { title, children } = props;
    if (children === undefined) return;

    return (
        <Layout vertical gap={8}>
            <Caption>{title}</Caption>
            <Text>{children}</Text>
        </Layout>
    );
}

function SettingsProfile() {
    const user = useUser();

    let creation_date;
    if (user?.created_at) {
        const date = new Date(user?.created_at);
        creation_date = date.toLocaleString();
    }

    return (
        <React.Fragment>
            <TitleBar title="My profile" />
            <Layout vertical left gap={24}>
                <Layout horizontal center gap={12}>
                    <ProfilePicture size={40} src={user.profile_picture} />
                    <Layout vertical left gap={8}>
                        <Text>{user.name}</Text>
                        <AccountRole role={user.role} />
                    </Layout>
                </Layout>
                <Info title="Username">{user.username}</Info>
                <Info title="Creation date">{creation_date}</Info>
            </Layout>
        </React.Fragment>
    );
}

export default SettingsProfile;

import React, { useEffect } from "react";
import Layout from "Components/Layout/Layout";
import Symbol from "Components/Symbol/Symbol";

import styles from "./Apps.module.sass";
import Logo from "Layouts/Logo/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Command } from "Models/Command";
import { pushCommand, removeCommand } from "Store/Slices/CommandsSlice";
import { useDispatch } from "react-redux";
import { Text } from "Components/Text/Text";
import { useUser } from "Store/Hooks/useUser";
import Spacer from "Components/Spacer/Spacer";

type AppProps = {
    name: string;
    icon: string;
    to: string;
};

function App(props: AppProps) {
    const { name, icon, to } = props;

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                classNames({
                    [styles.app]: true,
                    [styles.appSelected]: isActive,
                })
            }
        >
            <Layout vertical center middle maximize gap={6}>
                <Symbol symbol={icon} />
                <Layout className={styles.appTooltip}>
                    <Text>{name}</Text>
                </Layout>
            </Layout>
        </NavLink>
    );
}

function Apps() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const user = useUser();

    useEffect(() => {
        const commands: Command[] = [
            {
                id: "go_to_storage",
                icon: "storage",
                name: "Jump to storage",
                callback: () => navigate("/storage"),
                tooltip: "Open your storage.",
            },
            {
                id: "go_to_admin",
                icon: "admin_panel_settings",
                name: "Jump to admin panel",
                callback: () => navigate("/admin"),
                tooltip: "Open your admin panel.",
            },
        ];

        commands.forEach((c) => dispatch(pushCommand(c)));
        return () => commands.forEach((c) => dispatch(removeCommand(c)));
    }, []);

    return (
        <Layout vertical center gap={3} className={styles.apps}>
            <Logo onClick={() => navigate("/")} small className={styles.logo} />
            <App name="Storage" icon="cloud" to="/storage" />
            <Spacer />
            {user.role === "admin" && (
                <App
                    name="Admin panel"
                    icon="admin_panel_settings"
                    to="/admin"
                />
            )}
            <App name="Settings" icon="settings" to="/settings" />
        </Layout>
    );
}

export default Apps;

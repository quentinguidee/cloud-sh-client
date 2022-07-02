import React, { useEffect } from "react";
import NavBar from "Components/NavBar/NavBar";
import Logo from "Layouts/Logo/Logo";
import NavBarItem from "Components/NavBarItem/NavBarItem";

import styles from "./NavigationBar.module.sass";
import Layout from "Components/Layout/Layout";
import { Command } from "Models/Command";
import { pushCommand, removeCommand } from "Store/Slices/CommandsSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function NavigationBar() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

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
                id: "go_to_contacts",
                icon: "contacts",
                name: "Jump to contacts",
                callback: () => navigate("/contacts"),
                tooltip: "Open your contacts.",
            },
            {
                id: "go_to_mails",
                icon: "email",
                name: "Jump to mails",
                callback: () => navigate("/mails"),
                tooltip: "Open your mails.",
            },
        ];

        commands.forEach((c) => dispatch(pushCommand(c)));
        return () => commands.forEach((c) => dispatch(removeCommand(c)));
    }, []);

    return (
        <NavBar>
            <Logo className={styles.logo} />
            <Layout vertical stretch gap={4}>
                <NavBarItem to="/storage" icon="storage">
                    Storage
                </NavBarItem>
                <NavBarItem to="/contacts" icon="contacts">
                    Contacts
                </NavBarItem>
                <NavBarItem to="/mails" icon="email">
                    Mails
                </NavBarItem>
            </Layout>
        </NavBar>
    );
}

export default NavigationBar;

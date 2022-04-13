import React from "react";
import NavBar from "Components/NavBar/NavBar";
import Logo from "Layouts/Logo/Logo";
import NavBarItem from "Components/NavBarItem/NavBarItem";

import styles from "./NavigationBar.module.sass";
import Layout from "Components/Layout/Layout";

function NavigationBar() {
    return (
        <NavBar>
            <Logo className={styles.logo} />
            <Layout vertical stretch>
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

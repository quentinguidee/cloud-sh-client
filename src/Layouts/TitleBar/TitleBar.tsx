import React from "react";

import styles from "./TitleBar.module.sass";

import Layout from "Components/Layout/Layout";
import { Title } from "Components/Title/Title";
import Spacer from "Components/Spacer/Spacer";
import Account from "Layouts/Account/Account";
import { useUser } from "Store/Hooks/useUser";
import Button from "Components/Button/Button";
import Symbol from "Components/Symbol/Symbol";
import { setTheme } from "Store/Slices/ThemeSlice";
import { useTheme } from "Store/Hooks/useTheme";
import { useDispatch } from "react-redux";

type Props = {
    title: string;
};

function TitleBar(props: Props) {
    const { title } = props;

    const dispatch = useDispatch();

    const user = useUser();
    const theme = useTheme();

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        dispatch(setTheme(newTheme));
    };

    return (
        <Layout horizontal center className={styles.bar}>
            <Title className={styles.title}>{title}</Title>
            <Spacer />
            <Button onlySymbol onClick={toggleTheme}>
                <Symbol symbol="dark_mode" />
            </Button>
            <Spacer width={12} />
            <Account user={user} />
        </Layout>
    );
}

export default TitleBar;

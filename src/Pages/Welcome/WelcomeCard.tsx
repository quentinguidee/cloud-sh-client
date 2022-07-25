import React from "react";
import styles from "./Welcome.module.sass";
import Layout from "Components/Layout/Layout";
import Symbol from "Components/Symbol/Symbol";
import { App } from "Models/App";
import { Text } from "Components/Text/Text";
import { NavLink } from "react-router-dom";

type Props = {
    app: App;
};

function WelcomeCard(props: Props) {
    const { symbol, name, id } = props.app;

    return (
        <NavLink style={{ textDecoration: "none" }} to={id}>
            <Layout horizontal center gap={12} className={styles.card}>
                <Symbol symbol={symbol} size={24} />
                <Text>{name}</Text>
            </Layout>
        </NavLink>
    );
}

export default WelcomeCard;

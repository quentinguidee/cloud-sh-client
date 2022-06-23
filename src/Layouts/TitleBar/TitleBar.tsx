import React from "react";

import styles from "./TitleBar.module.sass";

import Layout from "Components/Layout/Layout";
import { Title } from "Components/Title/Title";
import Spacer from "Components/Spacer/Spacer";
import Account from "Layouts/Account/Account";
import User from "Models/User";

type Props = {
    title: string;
    account?: User;
};

function TitleBar(props: Props) {
    const { title, account } = props;
    return (
        <Layout horizontal>
            <Title className={styles.title}>{title}</Title>
            <Spacer />
            <Account account={account} />
        </Layout>
    );
}

export default TitleBar;

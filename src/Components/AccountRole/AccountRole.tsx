import React from "react";

import styles from "./AccountRole.module.sass";
import Symbol from "Components/Symbol/Symbol";
import Layout from "Components/Layout/Layout";

type Props = {
    role: string;
};

function AccountRole(props: Props) {
    const { role } = props;

    let symbol = "person";
    if (role === "admin") {
        symbol = "gavel";
    }

    return (
        <Layout horizontal center gap={6} className={styles.role}>
            <Symbol symbol={symbol} />
            {role}
        </Layout>
    );
}

export default AccountRole;

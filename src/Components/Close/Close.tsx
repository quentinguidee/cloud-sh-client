import React from "react";

import styles from "./Close.module.sass";
import Symbol from "Components/Symbol/Symbol";
import Layout from "Components/Layout/Layout";

type Props = {
    onClick: () => void;
};

function Close(props: Props) {
    const { onClick } = props;
    return (
        <Layout center middle className={styles.close} onClick={onClick}>
            <Symbol className={styles.closeSymbol} symbol="close" />
        </Layout>
    );
}

export default Close;

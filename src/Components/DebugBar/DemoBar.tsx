import React from "react";
import Layout from "Components/Layout/Layout";

import styles from "./DemoBar.module.sass";
import Spacer from "Components/Spacer/Spacer";
import { Text } from "Components/Text/Text";
import Symbol from "Components/Symbol/Symbol";

function DemoBar() {
    return (
        <Layout horizontal center className={styles.bar}>
            <Symbol symbol="warning" />
            <Spacer width={8} />
            <Text>
                cloud.sh demo. Do NOT upload your personal data here. They're
                NOT encrypted and could be read by anyone.
            </Text>
        </Layout>
    );
}

export default DemoBar;

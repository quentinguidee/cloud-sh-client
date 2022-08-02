import Layout from "Components/Layout/Layout";
import styles from "./AuthMethodItem.module.sass";
import { Caption, Text } from "Components/Text/Text";
import React from "react";
import { AuthMethod } from "Models/AuthMethod";
import Code from "Components/Code/Code";

type Props = {
    method: AuthMethod;
};

function AuthMethodItem(props: Props) {
    const { method } = props;
    return (
        <Layout vertical top left gap={8} className={styles.item}>
            <Text>{method.display_name}</Text>
            <Caption>
                Client ID: <Code>{method.client_id}</Code>
            </Caption>
        </Layout>
    );
}

export default AuthMethodItem;

import React from "react";
import { Message } from "Models/Message";
import Layout from "Components/Layout/Layout";
import MessageBox from "Components/MessageBox/MessageBox";

import styles from "./MessageBoxStack.module.sass";

type Props = {
    messages: Message[];
};

function MessageBoxStack(props: Props) {
    const { messages } = props;
    return (
        <Layout vertical center gap={18} className={styles.stack}>
            {messages?.map((message) => (
                <MessageBox message={message} />
            ))}
        </Layout>
    );
}

export default MessageBoxStack;

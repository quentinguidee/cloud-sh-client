import React from "react";
import Box from "Components/Box/Box";

import styles from "./MessageBox.module.sass";
import Text from "Components/Text/Text";
import { Message } from "Models/Message";
import Layout from "Components/Layout/Layout";
import Symbol from "Components/Symbol/Symbol";
import Close from "Components/Close/Close";
import { useDispatch } from "react-redux";
import { removeMessage } from "Store/Slices/MessagesSlice";
import Spacer from "Components/Spacer/Spacer";
import classNames from "classnames";

type Props = {
    message: Message;
    className?: string;
};

function MessageBox(props: Props) {
    const { className } = props;
    const { message, type } = props.message;

    const dispatch = useDispatch();

    const dismiss = () => {
        dispatch(removeMessage(props.message));
    };

    return (
        <Box className={classNames(styles.box, className)} type={type}>
            <Layout horizontal center gap={12}>
                <Symbol size={24} symbol={type} />
                <Text>{message}</Text>
                <Spacer />
                <Close onClick={dismiss} />
            </Layout>
        </Box>
    );
}

export default MessageBox;

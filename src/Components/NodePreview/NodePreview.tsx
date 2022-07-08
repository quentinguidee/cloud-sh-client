import React, { useEffect, useState } from "react";
import Overlay from "Components/Overlay/Overlay";
import styles from "./NodePreview.module.sass";
import { Node } from "Models/Node";
import classNames from "classnames";
import axios from "axios";
import { api, route } from "Backend/api";
import { useSession } from "Store/Hooks/useSession";
import Layout from "Components/Layout/Layout";
import Spacer from "Components/Spacer/Spacer";
import Close from "Components/Close/Close";
import { Caption } from "Components/Text/Text";
import { Subtitle } from "Components/Title/Title";

type Props = {
    node?: Node;
    onClose?: () => void;
};

function NodePreview(props: Props) {
    const { node } = props;

    const session = useSession();

    const [image, setImage] = useState(undefined);

    const downloadNode = (node: Node) => {
        axios({
            method: "GET",
            url: route("/storage/download"),
            params: {
                node_uuid: node.uuid,
            },
            headers: {
                Authorization: session.token,
            },
            responseType: "blob",
        })
            .then((res) => {
                setImage(URL.createObjectURL(res.data));
            })
            .catch(api.error);
    };

    useEffect(() => {
        if (node?.mime.includes("image/")) {
            downloadNode(node);
        }
    }, [node]);

    const onClose = () => {
        setImage(undefined);
        if (props.onClose) props.onClose();
    };

    return (
        <React.Fragment>
            <Overlay show={node !== undefined} onClick={onClose} />
            <div
                className={classNames({
                    [styles.window]: true,
                    [styles.windowShow]: node !== undefined,
                })}
            >
                <Layout horizontal center className={styles.titleBar}>
                    <Layout vertical left gap={2}>
                        <Subtitle>Preview</Subtitle>
                        <Caption>{node?.name}</Caption>
                    </Layout>
                    <Spacer />
                    <Spacer width={24} />
                    <Close onClick={onClose} />
                </Layout>
                <div className={styles.contentWrapper}>
                    {image && (
                        <img
                            alt={node.name}
                            src={image}
                            className={styles.content}
                        />
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}

export default NodePreview;

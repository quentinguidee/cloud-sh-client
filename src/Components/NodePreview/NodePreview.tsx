import React, { useEffect, useState } from "react";
import styles from "./NodePreview.module.sass";
import { Node } from "Models/Node";
import axios from "axios";
import { api, route } from "Backend/api";
import { useSession } from "Store/Hooks/useSession";
import classNames from "classnames";
import Layout from "Components/Layout/Layout";

type Props = {
    node?: Node;
    className?: string;
};

function NodePreview(props: Props) {
    const { node, className } = props;

    if (!node) return null;

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
        if (node?.mime?.includes("image/")) {
            downloadNode(node);
        }
    }, [node]);

    if (image)
        return (
            <Layout middle className={styles.wrapper}>
                <img
                    alt={node?.name}
                    src={image}
                    className={classNames(styles.content, className)}
                />
            </Layout>
        );

    return null;
}

export default NodePreview;

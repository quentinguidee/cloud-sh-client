import React, { useEffect, useState } from "react";

import styles from "./StorageNavBar.module.sass";

import NavBar from "Components/NavBar/NavBar";
import NavBarItem from "Components/NavBarItem/NavBarItem";
import Layout from "Components/Layout/Layout";
import ProgressBar from "Components/ProgressBar/ProgressBar";
import { Caption } from "Components/Text/Text";
import axios from "axios";
import { api, route } from "Backend/api";
import { useSession } from "Store/Hooks/useSession";
import prettyBytes from "pretty-bytes";

function StorageSize() {
    const session = useSession();

    const [bucketSize, setBucketSize] = useState<number>();
    const [bucketLimit, setBucketLimit] = useState<number>();

    useEffect(() => {
        axios({
            method: "GET",
            url: route("/storage/bucket"),
            headers: {
                Authorization: session.token,
            },
        })
            .then((res) => {
                const { size, bucket } = res.data;
                setBucketSize(size);
                setBucketLimit(bucket?.max_size);
            })
            .catch(api.error);
    }, []);

    if (!bucketSize) return;

    if (!bucketLimit) {
        return (
            <Layout vertical gap={6} className={styles.storageProgress}>
                <Caption>Stored: {prettyBytes(bucketSize)}</Caption>
            </Layout>
        );
    }

    return (
        <Layout vertical gap={6} className={styles.storageProgress}>
            <Caption>
                {prettyBytes(bucketSize)}/{prettyBytes(bucketLimit)}
            </Caption>
            <ProgressBar percentage={(bucketSize / bucketLimit) * 100} />
        </Layout>
    );
}

function StorageNavBar() {
    return (
        <NavBar title="Storage">
            <Layout vertical stretch gap={4}>
                <NavBarItem to="/storage/bucket" icon="storage">
                    My storage
                </NavBarItem>
                <NavBarItem to="/storage/recent" icon="schedule">
                    Recent
                </NavBarItem>
                <NavBarItem to="/storage/bin" icon="delete">
                    Bin
                </NavBarItem>
                <StorageSize />
            </Layout>
        </NavBar>
    );
}

export default StorageNavBar;

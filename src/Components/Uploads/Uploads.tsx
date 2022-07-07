import React, { useEffect, useState } from "react";

import styles from "./Uploads.module.sass";
import { Subtitle } from "Components/Title/Title";
import Layout from "Components/Layout/Layout";
import Overlay from "Components/Overlay/Overlay";
import Symbol from "Components/Symbol/Symbol";
import Spacer from "Components/Spacer/Spacer";
import classNames from "classnames";
import UploadsItem from "Components/UploadsItem/UploadsItem";
import { useUploads } from "Store/Hooks/useUploads";

type Props = React.HTMLProps<HTMLDivElement>;

function Uploads(props: Props) {
    const {} = props;

    const uploads = useUploads();

    const [collapsed, setCollapsed] = useState<boolean>(true);
    const [hidden, setHidden] = useState<boolean>(true);

    const collapse = () => setCollapsed(true);
    const expand = () => setCollapsed(false);
    const toggle = (e) => {
        setCollapsed((c) => !c);
        e.stopPropagation();
    };

    useEffect(() => {
        if (uploads.length > 0) setHidden(false);
    }, [uploads]);

    return (
        <React.Fragment>
            <Overlay show={!collapsed} onClick={collapse} />
            <Layout
                vertical
                gap={6}
                className={classNames({
                    [styles.uploads]: true,
                    [styles.uploadsCollapsed]: collapsed,
                    [styles.uploadsHidden]: hidden,
                })}
                onClick={expand}
            >
                <Layout
                    horizontal
                    center
                    className={styles.topBar}
                    onClick={toggle}
                >
                    <Subtitle>Uploads</Subtitle>
                    <Spacer />
                    <Symbol
                        symbol={collapsed ? "expand_less" : "expand_more"}
                    />
                </Layout>
                {uploads.map((node) => (
                    <UploadsItem node={node} />
                ))}
            </Layout>
        </React.Fragment>
    );
}

export default Uploads;

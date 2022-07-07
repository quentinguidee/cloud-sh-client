import React, { useState } from "react";

import styles from "./Uploads.module.sass";
import { Subtitle } from "Components/Title/Title";
import Layout from "Components/Layout/Layout";
import Overlay from "Components/Overlay/Overlay";
import Symbol from "Components/Symbol/Symbol";
import Spacer from "Components/Spacer/Spacer";
import classNames from "classnames";

type Props = React.HTMLProps<HTMLDivElement>;

function Uploads(props: Props) {
    const { children } = props;

    const [collapsed, setCollapsed] = useState<boolean>(false);

    const collapse = () => setCollapsed(true);
    const expand = () => setCollapsed(false);
    const toggle = (e) => {
        setCollapsed((c) => !c);
        e.stopPropagation();
    };

    return (
        <React.Fragment>
            <Overlay show={!collapsed} onClick={collapse} />
            <Layout
                vertical
                gap={6}
                className={classNames({
                    [styles.uploads]: true,
                    [styles.uploadsCollapsed]: collapsed,
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
                {children}
            </Layout>
        </React.Fragment>
    );
}

export default Uploads;

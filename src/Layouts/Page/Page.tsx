import classNames from "classnames";
import Layout from "Components/Layout/Layout";
import React from "react";

import styles from "./Page.module.sass";

type Props = React.HTMLProps<HTMLDivElement>;

function Page(props: Props) {
    const { className, children, ...others } = props;
    return (
        <Layout
            vertical
            stretch
            maximize
            className={classNames(styles.page, className)}
            {...others}
        >
            {children}
        </Layout>
    );
}

export default Page;

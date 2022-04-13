import classNames from "classnames";
import Layout from "Components/Layout/Layout";
import React from "react";

import styles from "./Page.module.sass";

type Props = React.HTMLProps<HTMLDivElement>;

function Page(props: Props) {
    const { className, children, ...others } = props;
    return (
        <div {...others} className={classNames(styles.page, className)}>
            <Layout vertical stretch gap={12}>
                {children}
            </Layout>
        </div>
    );
}

export default Page;

import React from "react";
import classNames from "classnames";

import styles from "./List.module.sass";
import Layout from "Components/Layout/Layout";

type Props = React.HTMLProps<HTMLDivElement>;

function List(props: Props) {
    const { className, children, ...others } = props;
    return (
        <div {...others} className={classNames(styles.list, className)}>
            <Layout vertical stretch gap={6}>
                {children}
            </Layout>
        </div>
    );
}

export default List;

import React from "react";
import classNames from "classnames";

import styles from "./NavBar.module.sass";
import Layout from "Components/Layout/Layout";

type Props = React.HTMLProps<HTMLDivElement>;

function NavBar(props: Props) {
    const { className, children, ...others } = props;
    return (
        <div className={classNames(styles.navbar, className)} {...others}>
            <Layout vertical stretch gap={13}>
                {children}
            </Layout>
        </div>
    );
}

export default NavBar;

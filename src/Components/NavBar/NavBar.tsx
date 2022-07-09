import React from "react";
import classNames from "classnames";

import styles from "./NavBar.module.sass";
import Layout from "Components/Layout/Layout";
import { Title } from "Components/Title/Title";

type Props = React.HTMLProps<HTMLDivElement> & {
    title: string;
};

function NavBar(props: Props) {
    const { className, children, title, ...others } = props;
    return (
        <div className={classNames(styles.navbar, className)} {...others}>
            <Title className={styles.title}>{title}</Title>
            <Layout vertical stretch gap={13}>
                {children}
            </Layout>
        </div>
    );
}

export default NavBar;

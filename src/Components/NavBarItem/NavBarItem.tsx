import classNames from "classnames";
import Icon from "Components/Icon/Icon";
import Layout from "Components/Layout/Layout";
import React from "react";
import { NavLink, To } from "react-router-dom";

import styles from "./NavBarItem.module.sass";

type Props = React.HTMLProps<HTMLDivElement> & {
    to: To;
    icon: string;
};

function NavBarItem(props: Props) {
    const { to, className, children, icon: symbol, ...others } = props;

    const icon = <Icon className={styles.icon} symbol={symbol} />;

    return (
        <NavLink to={to} className={styles.wrapper}>
            <Layout
                horizontal
                center
                gap={8}
                className={classNames(styles.item, className)}
                {...others}
            >
                {icon}
                {children}
            </Layout>
        </NavLink>
    );
}

export default NavBarItem;

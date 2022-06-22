import classNames from "classnames";
import Symbol from "Components/Icon/Symbol";
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

    const icon = <Symbol className={styles.icon} symbol={symbol} />;

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                classNames({
                    [styles.item]: true,
                    [styles.itemSelected]: isActive,
                })
            }
        >
            <Layout
                horizontal
                center
                gap={12}
                className={classNames(styles.content, className)}
                {...others}
            >
                {icon}
                {children}
            </Layout>
        </NavLink>
    );
}

export default NavBarItem;

import React from "react";
import classNames from "classnames";

import styles from "./NavBar.module.sass";

type Props = React.HTMLProps<HTMLDivElement>;

function NavBar(props: Props) {
    const { className, ...others } = props;
    return <div className={classNames(styles.navbar, className)} {...others} />;
}

export default NavBar;

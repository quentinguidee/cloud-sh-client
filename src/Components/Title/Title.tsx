import classNames from "classnames";
import React from "react";

import styles from "./Title.module.sass";

type Props = React.HTMLProps<HTMLHeadingElement>;

function Title(props: Props) {
    const { className, ...others } = props;
    return <h1 {...others} className={classNames(styles.title, className)} />;
}

function Subtitle(props: Props) {
    const { className, ...others } = props;
    return <h2 {...others} className={classNames(styles.title, className)} />;
}

export { Title, Subtitle };

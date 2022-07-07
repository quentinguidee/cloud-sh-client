import classNames from "classnames";
import React from "react";

import styles from "./Layout.module.sass";

type Props = React.HTMLProps<HTMLDivElement> & {
    vertical?: boolean;
    horizontal?: boolean;

    left?: boolean;
    center?: boolean;
    right?: boolean;
    stretch?: boolean;

    top?: boolean;
    middle?: boolean;
    bottom?: boolean;

    justify?: boolean;

    maximize?: boolean;

    gap?: number;
};

function Layout(props: Props) {
    const {
        vertical,
        horizontal,
        left,
        center,
        right,
        stretch,
        justify,
        maximize,
        className,
        style,
        gap,
        top,
        middle,
        bottom,
        ...others
    } = props;

    return (
        <div
            {...others}
            className={classNames({
                [styles.layout]: true,
                [styles.layoutHorizontal]: horizontal,
                [styles.layoutVertical]: vertical,
                [styles.layoutLeft]: left,
                [styles.layoutCenter]: center,
                [styles.layoutRight]: right,
                [styles.layoutStretch]: stretch,
                [styles.layoutTop]: top,
                [styles.layoutMiddle]: middle,
                [styles.layoutBottom]: bottom,
                [styles.layoutJustify]: justify,
                [styles.layoutMaximize]: maximize,
                [className]: true,
            })}
            style={{ gap, ...style }}
        />
    );
}

export default Layout;

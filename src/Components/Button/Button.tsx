import classNames from "classnames";
import Layout from "Components/Layout/Layout";
import React from "react";

import styles from "./Button.module.sass";

type Props = React.HTMLProps<HTMLDivElement> & {
    primary?: boolean;
    secondary?: boolean;
    onlySymbol?: boolean;
    sharp?: boolean;
};

function Button(props: Props) {
    const {
        children,
        className,
        disabled,
        secondary,
        onlySymbol,
        sharp,
        ...others
    } = props;

    return (
        <div
            {...others}
            className={classNames({
                [styles.button]: true,
                [styles.buttonSecondary]: secondary,
                [styles.buttonOnlySymbol]: onlySymbol,
                [styles.buttonDisabled]: disabled,
                [styles.buttonSharp]: sharp,
                [className]: true,
            })}
        >
            <Layout horizontal center gap={6}>
                {children}
            </Layout>
        </div>
    );
}

export default Button;

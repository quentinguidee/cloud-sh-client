import classNames from "classnames";
import Symbol from "Components/Symbol/Symbol";
import React, { useState } from "react";

import styles from "./Checkbox.module.sass";
import Layout from "Components/Layout/Layout";

type Props = React.HTMLProps<HTMLInputElement>;

function Checkbox(props: Props) {
    const { checked: value, children, ...others } = props;

    const [checked, setChecked] = useState<boolean>(value);

    const onClick = () => {
        setChecked(!checked);
    };

    return (
        <Layout
            horizontal
            center
            className={styles.wrapper}
            onClick={onClick}
            gap={8}
        >
            <input
                {...others}
                className={styles.input}
                type="checkbox"
                checked={checked}
            />
            <span
                className={classNames({
                    [styles.checkbox]: true,
                    [styles.checkboxChecked]: checked,
                })}
            >
                <Symbol
                    className={classNames(styles.icon)}
                    symbol="done"
                    size={16}
                />
            </span>
            {children}
        </Layout>
    );
}

export default Checkbox;

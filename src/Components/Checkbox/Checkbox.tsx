import classNames from "classnames";
import Symbol from "Components/Icon/Symbol";
import React, { useState } from "react";

import styles from "./Checkbox.module.sass";

type Props = React.HTMLProps<HTMLInputElement>;

function Checkbox(props: Props) {
    const { checked: value, ...others } = props;

    const [checked, setChecked] = useState<boolean>(value);

    const onClick = () => {
        setChecked(!checked);
    };

    return (
        <div className={styles.wrapper}>
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
                onClick={onClick}
            >
                <Symbol
                    className={classNames(styles.icon)}
                    symbol="done"
                    size={16}
                />
            </span>
        </div>
    );
}

export default Checkbox;

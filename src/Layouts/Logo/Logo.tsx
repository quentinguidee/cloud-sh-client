import classNames from "classnames";
import React from "react";

import LogoPNG from "Assets/Images/logo.png";

import styles from "./Logo.module.sass";
import { Text } from "Components/Text/Text";
import Layout from "Components/Layout/Layout";

type Props = React.HTMLProps<HTMLDivElement> & {
    // Small hides the text
    small?: boolean;
};

function Logo(props: Props) {
    const { className, small, ...others } = props;
    return (
        <Layout
            horizontal
            center
            middle
            gap={12}
            {...others}
            className={classNames(styles.logo, className)}
        >
            <img alt="Logo" src={LogoPNG} className={styles.image} />
            {!small && <Text>cloud.sh</Text>}
        </Layout>
    );
}

export default Logo;

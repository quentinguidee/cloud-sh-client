import classNames from "classnames";
import React from "react";

import LogoPNG from "Assets/Images/logo.png";

import styles from "./Logo.module.sass";
import { Text } from "Components/Text/Text";
import Layout from "Components/Layout/Layout";

type Props = React.HTMLProps<HTMLDivElement>;

function Logo(props: Props) {
    const { className, ...others } = props;
    return (
        <Layout
            horizontal
            center
            gap={12}
            {...others}
            className={classNames(styles.logo, className)}
        >
            <img alt="Logo" src={LogoPNG} className={styles.image} />
            <Text>cloud.sh</Text>
        </Layout>
    );
}

export default Logo;

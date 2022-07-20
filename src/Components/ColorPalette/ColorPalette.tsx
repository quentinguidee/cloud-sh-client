import React from "react";

import styles from "./ColorPalette.module.sass";
import Layout from "Components/Layout/Layout";

type ColorProps = {
    color: string;
};

function Color(props: ColorProps) {
    const { color } = props;
    return <div className={styles.color} style={{ backgroundColor: color }} />;
}

type Props = {
    colors: string[];
};

function ColorPalette(props: Props) {
    const { colors } = props;
    return (
        <Layout horizontal className={styles.palette}>
            {colors.map((color) => (
                <Color color={color} />
            ))}
        </Layout>
    );
}

export default ColorPalette;

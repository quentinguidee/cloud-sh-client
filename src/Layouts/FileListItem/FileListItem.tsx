import classNames from "classnames";
import Icon from "Components/Icon/Icon";
import Layout from "Components/Layout/Layout";
import Text from "Components/Text/Text";
import { File, getColor, getIcon } from "Models/File";
import React from "react";

import styles from "./FileListItem.module.sass";

type Props = React.HTMLProps<HTMLDivElement> & {
    file: File;
};

function FileListItem(props: Props) {
    const { className, children, file, ...others } = props;
    const { filename } = file;

    let symbol = getIcon(file);
    let color = getColor(file);

    return (
        <div {...others} className={classNames(styles.item, className)}>
            <Layout horizontal center gap={16}>
                <Icon symbol={symbol} style={{ color }} />
                <Text>{filename}</Text>
            </Layout>
        </div>
    );
}

export default FileListItem;

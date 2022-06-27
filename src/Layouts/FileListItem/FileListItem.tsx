import classNames from "classnames";
import Symbol from "Components/Symbol/Symbol";
import Layout from "Components/Layout/Layout";
import Text from "Components/Text/Text";
import { File, getColor, getIcon } from "Models/File";
import React, { CSSProperties, useState } from "react";

import styles from "./FileListItem.module.sass";
import Popover from "Components/Popover/Popover";
import PopoverItemWithSymbol from "Components/PopoverItemWithSymbol/PopoverItemWithSymbol";

type Props = React.HTMLProps<HTMLDivElement> & {
    file: File;
    onDelete: () => void;
};

function FileListItem(props: Props) {
    const { className, children, file, onDelete, ...others } = props;
    const { filename } = file;

    let symbol = getIcon(file);
    let color = getColor(file);

    const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
    const [contextMenuX, setContextMenuX] = useState<number | undefined>();
    const [contextMenuY, setContextMenuY] = useState<number | undefined>();

    const openContextMenu = (e) => {
        setShowContextMenu(true);
        setContextMenuX(e.pageX);
        setContextMenuY(e.pageY);
        e.preventDefault();
    };

    const closeContextMenu = () => {
        setShowContextMenu(false);
        setContextMenuX(undefined);
        setContextMenuY(undefined);
    };

    const popoverStyle: CSSProperties = {
        left: contextMenuX + "px",
        top: contextMenuY + "px",
    };

    let contextMenu;
    if (showContextMenu) {
        contextMenu = (
            <Popover
                show={showContextMenu}
                onClose={closeContextMenu}
                style={popoverStyle}
                animateFrom="top left"
            >
                <PopoverItemWithSymbol symbol="delete" onClick={onDelete} red>
                    Delete
                </PopoverItemWithSymbol>
            </Popover>
        );
    }

    return (
        <div>
            {contextMenu}
            <div
                onContextMenu={openContextMenu}
                {...others}
                className={classNames({
                    [styles.item]: true,
                    [styles.itemSelected]: showContextMenu,
                    [className]: true,
                })}
            >
                <Layout horizontal center gap={16}>
                    <Symbol symbol={symbol} style={{ color }} size={24} />
                    <Text>{filename}</Text>
                </Layout>
            </div>
        </div>
    );
}

export default FileListItem;

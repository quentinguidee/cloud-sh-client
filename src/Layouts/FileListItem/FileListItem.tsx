import classNames from "classnames";
import Symbol from "Components/Symbol/Symbol";
import Layout from "Components/Layout/Layout";
import Text from "Components/Text/Text";
import { Node, getColor, getIcon } from "Models/Node";
import React, { CSSProperties, useEffect, useRef, useState } from "react";

import styles from "./FileListItem.module.sass";
import Popover from "Components/Popover/Popover";
import PopoverItemWithSymbol from "Components/PopoverItemWithSymbol/PopoverItemWithSymbol";
import Input from "Components/Input/Input";
import Spacer from "Components/Spacer/Spacer";
import Button from "Components/Button/Button";
import PopoverSeparator from "Components/PopoverSeparator/PopoverSeparator";

type Props = React.HTMLProps<HTMLDivElement> & {
    node: Node;
    editing?: boolean;
    onDelete?: () => void;
    onDownload?: () => void;
    onRename?: () => void;
    onValidation?: (node?: Node) => void;
};

function FileListItem(props: Props) {
    const {
        className,
        children,
        node,
        onRename,
        onDelete,
        onDownload,
        onValidation,
        onClick,
        ...others
    } = props;

    const input = useRef<HTMLInputElement>(null);

    const [inputValue, setInputValue] = useState<string>(node.name);
    const [editing, setEditing] = useState<boolean>();

    let symbol = getIcon(node);
    let color = getColor(node);

    const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
    const [contextMenuX, setContextMenuX] = useState<number | undefined>();
    const [contextMenuY, setContextMenuY] = useState<number | undefined>();

    const openContextMenu = (e) => {
        if (editing) return;
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
        const onRename = () => {
            if (props.onRename) props.onRename();
            closeContextMenu();
        };

        const onDownload = () => {
            if (props.onDownload) props.onDownload();
            closeContextMenu();
        };

        const onDelete = () => {
            if (props.onDelete) props.onDelete();
            closeContextMenu();
        };

        contextMenu = (
            <Popover
                show={showContextMenu}
                onClose={closeContextMenu}
                style={popoverStyle}
                animateFrom="top left"
            >
                <PopoverItemWithSymbol symbol="edit" onClick={onRename}>
                    Rename
                </PopoverItemWithSymbol>
                {node.type !== "directory" && (
                    <PopoverItemWithSymbol
                        symbol="download"
                        onClick={onDownload}
                    >
                        Download
                    </PopoverItemWithSymbol>
                )}
                <PopoverSeparator />
                <PopoverItemWithSymbol symbol="delete" onClick={onDelete} red>
                    Delete
                </PopoverItemWithSymbol>
            </Popover>
        );
    }

    useEffect(() => {
        if (props.editing) {
            setTimeout(() => {
                input.current?.focus();
            }, 80);
        }
    }, [props.editing, node]);

    useEffect(() => {
        setEditing(props.editing);
    }, [props.editing]);

    const cancel = () => onValidation();
    const submit = () => {
        if (onValidation) {
            onValidation({
                name: inputValue,
                type: node.type,
            });
        }
    };

    const onInputValueChange = (e) => {
        setInputValue(e.target.value);
    };

    const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValid()) {
            submit();
        }
    };

    const onKeyDown = (e) => {
        if (e.key === "Escape") {
            cancel();
        }
    };

    useEffect(() => {
        if (editing) {
            props.editing
                ? document.addEventListener("keydown", onKeyDown)
                : document.removeEventListener("keydown", onKeyDown);
        }

        return () => document.removeEventListener("keydown", onKeyDown);
    }, [editing]);

    const inputValid = () => {
        return inputValue.trim() !== "";
    };

    const onItemClick = (e) => {
        if (onClick) onClick(e);
        if (editing) input.current.focus();
    };

    let nodeName;
    if (editing) {
        nodeName = (
            <React.Fragment>
                <Spacer width={8} />
                <Input
                    ref={input}
                    placeholder="Name"
                    value={inputValue}
                    onChange={onInputValueChange}
                    onKeyDown={onInputKeyDown}
                    small
                />
                <Spacer width={8} />
                <Spacer />
                <Button onlySymbol onClick={cancel}>
                    <Symbol symbol="close" />
                </Button>
                <Button secondary onClick={submit}>
                    <Text>Create</Text>
                    <Symbol symbol="arrow_forward" />
                </Button>
            </React.Fragment>
        );
    } else {
        nodeName = (
            <React.Fragment>
                <Spacer width={16} />
                <Text>{node.name}</Text>
            </React.Fragment>
        );
    }

    return (
        <div>
            {contextMenu}
            <div
                onContextMenu={openContextMenu}
                onClick={onItemClick}
                {...others}
                className={classNames({
                    [styles.item]: true,
                    [styles.itemSelected]: showContextMenu,
                    [styles.itemEditing]: editing,
                    [className]: true,
                })}
            >
                <Layout horizontal center gap={0}>
                    <Symbol symbol={symbol} style={{ color }} size={24} />
                    {nodeName}
                </Layout>
            </div>
        </div>
    );
}

export default FileListItem;

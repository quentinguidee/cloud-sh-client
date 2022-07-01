import React, { CSSProperties, useEffect, useRef, useState } from "react";
import Button from "Components/Button/Button";
import Symbol from "Components/Symbol/Symbol";
import Text from "Components/Text/Text";
import Popover from "Components/Popover/Popover";

import styles from "./NewDirectoryButton.module.sass";
import PopoverItem from "Components/PopoverItem/PopoverItem";
import Input from "Components/Input/Input";
import Layout from "Components/Layout/Layout";

type Props = {
    createDirectory: (name: string) => void;
};

function NewDirectoryButton(props: Props) {
    const { createDirectory } = props;

    const ref = useRef<HTMLInputElement>(null);

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");

    const onValueChange = (e) => {
        setValue(e.target.value);
    };

    const onKeyDown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "N") {
            openDialog();
            e.preventDefault();
        }
    };

    const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && valid()) {
            submit();
        }
    };

    const valid = () => {
        return value.trim() !== "";
    };

    const openDialog = () => {
        setShowDialog(true);
    };

    useEffect(() => {
        showDialog
            ? document.removeEventListener("keydown", onKeyDown)
            : document.addEventListener("keydown", onKeyDown);

        if (showDialog) {
            setTimeout(() => {
                ref.current?.focus();
            }, 80);
        }

        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [showDialog]);

    const closeDialog = () => {
        ref.current?.blur();
        setShowDialog(false);
        setValue("");
    };

    const submit = () => {
        createDirectory(value);
        closeDialog();
    };

    const popoverStyle: CSSProperties = {
        top: 48,
    };

    return (
        <div className={styles.button}>
            <Popover
                show={showDialog}
                style={popoverStyle}
                onClose={closeDialog}
                animateFrom="top left"
            >
                <Layout vertical right gap={4}>
                    <PopoverItem noPadding>
                        <Input
                            ref={ref}
                            type="text"
                            name="directory_name"
                            placeholder="Folder name"
                            value={value}
                            onChange={onValueChange}
                            onKeyDown={onInputKeyDown}
                        />
                    </PopoverItem>
                    <PopoverItem onClick={submit} disabled={!valid()}>
                        <Layout horizontal center gap={6}>
                            <Text>Create</Text>
                            <Symbol symbol="arrow_forward" />
                        </Layout>
                    </PopoverItem>
                </Layout>
            </Popover>
            <Button onClick={openDialog} secondary>
                <Symbol symbol="create_new_folder" />
            </Button>
        </div>
    );
}

export default NewDirectoryButton;

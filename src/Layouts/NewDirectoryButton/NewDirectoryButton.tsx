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

    const ref = useRef(null);

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");

    const onValueChange = (e) => {
        setValue(e.target.value);
    };

    const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            submit();
        }
    };

    const openDialog = () => {
        setShowDialog(true);
    };

    useEffect(() => {
        if (!showDialog) return;
        setTimeout(() => {
            ref.current?.focus();
        }, 10);
    }, [showDialog]);

    const closeDialog = () => {
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
                    <PopoverItem onClick={submit}>
                        <Layout horizontal center gap={6}>
                            <Text>Create</Text>
                            <Symbol symbol="arrow_forward" />
                        </Layout>
                    </PopoverItem>
                </Layout>
            </Popover>
            <Button onClick={openDialog}>
                <Symbol symbol="create_new_folder" />
                <Text>New folder</Text>
            </Button>
        </div>
    );
}

export default NewDirectoryButton;

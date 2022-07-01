import React, { useEffect, useRef, useState } from "react";
import Symbol from "Components/Symbol/Symbol";
import Text from "Components/Text/Text";
import Popover from "Components/Popover/Popover";
import PopoverItem from "Components/PopoverItem/PopoverItem";
import Input from "Components/Input/Input";
import Layout from "Components/Layout/Layout";
import { File } from "Models/File";

import styles from "./NewFilePopup.module.sass";

type Props = {
    show: boolean;
    onClose?: () => void;
    createFile: (file: File) => void;
};

function NewFilePopup(props: Props) {
    const { createFile, onClose } = props;

    const ref = useRef<HTMLInputElement>(null);

    const [show, setShow] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");

    const onValueChange = (e) => {
        setValue(e.target.value);
    };

    const onKeyDown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "N") {
            setShow((show) => !show);
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

    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    useEffect(() => {
        show
            ? document.removeEventListener("keydown", onKeyDown)
            : document.addEventListener("keydown", onKeyDown);

        if (show) {
            setTimeout(() => {
                ref.current?.focus();
            }, 80);
        }

        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [show]);

    const closeDialog = () => {
        ref.current?.blur();
        setShow(false);
        setValue("");
        if (onClose) onClose();
    };

    const submit = () => {
        createFile({
            filename: value,
            filetype: "directory",
        });
        closeDialog();
    };

    return (
        <Popover show={show} onClose={closeDialog} className={styles.popup}>
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
    );
}

export default NewFilePopup;

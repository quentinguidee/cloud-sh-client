import React, { CSSProperties, useState } from "react";
import Button from "Components/Button/Button";
import Symbol from "Components/Symbol/Symbol";
import Text from "Components/Text/Text";
import Popover from "Components/Popover/Popover";

import styles from "./NewDirectoryButton.module.sass";
import PopoverItem from "Components/PopoverItem/PopoverItem";
import Input from "Components/Input/Input";

type Props = {
    createDirectory: (name: string) => void;
};

function NewDirectoryButton(props: Props) {
    const { createDirectory } = props;

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");

    const onValueChange = (e) => {
        setValue(e.target.value);
    };

    const openDialog = () => {
        setShowDialog(true);
    };

    const onDialogClose = () => {
        setShowDialog(false);
        setValue("");
    };

    const create = () => {
        createDirectory(value);
    };

    const popoverStyle: CSSProperties = {
        top: 48,
    };

    return (
        <div className={styles.button}>
            <Popover
                show={showDialog}
                style={popoverStyle}
                onClose={onDialogClose}
            >
                <PopoverItem>
                    <Input
                        type="text"
                        name="filename"
                        value={value}
                        onChange={onValueChange}
                    />
                </PopoverItem>
                <PopoverItem onClick={create}>Create</PopoverItem>
            </Popover>
            <Button onClick={openDialog}>
                <Symbol symbol="create_new_folder" />
                <Text>New folder</Text>
            </Button>
        </div>
    );
}

export default NewDirectoryButton;

import React, { CSSProperties, useState } from "react";
import Button from "Components/Button/Button";
import Popover from "Components/Popover/Popover";
import PopoverItemWithSymbol from "Components/PopoverItemWithSymbol/PopoverItemWithSymbol";
import Symbol from "Components/Symbol/Symbol";
import Text from "Components/Text/Text";

import styles from "./NewButton.module.sass";

type Props = {
    createFile: () => void;
    createFolder: () => void;
    importFile: () => void;
};

function NewButton(props: Props) {
    const { createFile, createFolder, importFile } = props;
    const [show, setShow] = useState<boolean>(false);

    const close = () => setShow(false);
    const toggle = () => setShow((show) => !show);

    const popoverStyle: CSSProperties = {
        top: 48,
    };

    const exec = (action?: () => void) => {
        return () => {
            if (action) action();
            close();
        };
    };

    return (
        <React.Fragment>
            <div className={styles.button}>
                <Popover
                    show={show}
                    style={popoverStyle}
                    animateFrom="top left"
                    onClose={close}
                >
                    <PopoverItemWithSymbol
                        onClick={exec(createFile)}
                        symbol="article"
                    >
                        File
                    </PopoverItemWithSymbol>
                    <PopoverItemWithSymbol
                        onClick={exec(createFolder)}
                        symbol="create_new_folder"
                    >
                        Folder
                    </PopoverItemWithSymbol>
                    <PopoverItemWithSymbol
                        onClick={exec(importFile)}
                        symbol="file_upload"
                    >
                        Import
                    </PopoverItemWithSymbol>
                </Popover>
                <Button onClick={toggle}>
                    <Symbol symbol="add" />
                    <Text>New</Text>
                </Button>
            </div>
        </React.Fragment>
    );
}

export default NewButton;

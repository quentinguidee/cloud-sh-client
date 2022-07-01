import React, { CSSProperties, useState } from "react";
import Button from "Components/Button/Button";
import Popover from "Components/Popover/Popover";
import PopoverItemWithSymbol from "Components/PopoverItemWithSymbol/PopoverItemWithSymbol";
import Symbol from "Components/Symbol/Symbol";
import Text from "Components/Text/Text";

import styles from "./NewButton.module.sass";
import NewFilePopup from "Layouts/NewFilePopup/NewFilePopup";
import { File } from "Models/File";

type Props = {
    onCreateFile: (file: File) => void;
};

function NewButton(props: Props) {
    const { onCreateFile } = props;
    const [show, setShow] = useState<boolean>(false);

    const [showCreateFile, setShowCreateFile] = useState<boolean>(false);

    const close = () => setShow(false);
    const toggle = () => setShow((show) => !show);

    const popoverStyle: CSSProperties = {
        top: 48,
    };

    const createFile = () => {
        setShowCreateFile(true);
        close();
    };

    const createFileCallback = (file: File) => onCreateFile(file);

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
                        onClick={createFile}
                        symbol="article"
                    >
                        File
                    </PopoverItemWithSymbol>
                    <PopoverItemWithSymbol
                        onClick={createFile}
                        symbol="create_new_folder"
                    >
                        Folder
                    </PopoverItemWithSymbol>
                </Popover>
                <Button onClick={toggle}>
                    <Symbol symbol="add" />
                    <Text>New</Text>
                </Button>
            </div>
            <NewFilePopup
                show={showCreateFile}
                onClose={() => setShowCreateFile(false)}
                createFile={createFileCallback}
            />
        </React.Fragment>
    );
}

export default NewButton;

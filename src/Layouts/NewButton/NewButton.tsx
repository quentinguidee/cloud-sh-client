import React, { CSSProperties, useState } from "react";
import Button from "Components/Button/Button";
import Popover from "Components/Popover/Popover";
import PopoverItemWithSymbol from "Components/PopoverItemWithSymbol/PopoverItemWithSymbol";
import Symbol from "Components/Symbol/Symbol";
import Text from "Components/Text/Text";

import styles from "./NewButton.module.sass";

function NewButton() {
    const [show, setShow] = useState<boolean>(false);

    const close = () => setShow(false);
    const toggle = () => setShow((show) => !show);

    const popoverStyle: CSSProperties = {
        top: 48,
    };

    return (
        <div className={styles.button}>
            <Popover
                show={show}
                style={popoverStyle}
                animateFrom="top left"
                onClose={close}
            >
                <PopoverItemWithSymbol symbol="article">
                    File
                </PopoverItemWithSymbol>
                <PopoverItemWithSymbol symbol="create_new_folder">
                    Folder
                </PopoverItemWithSymbol>
            </Popover>
            <Button onClick={toggle}>
                <Symbol symbol="add" />
                <Text>New</Text>
            </Button>
        </div>
    );
}

export default NewButton;

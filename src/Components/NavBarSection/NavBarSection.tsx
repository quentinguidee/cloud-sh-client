import React from "react";
import { Caption } from "Components/Text/Text";

import styles from "./NavBarSection.module.sass";

type Props = React.PropsWithChildren<{
    title: string;
}>;

function NavBarSection(props: Props) {
    const { title, children } = props;

    return (
        <React.Fragment>
            <Caption className={styles.title}>{title}</Caption>
            {children}
        </React.Fragment>
    );
}

export default NavBarSection;

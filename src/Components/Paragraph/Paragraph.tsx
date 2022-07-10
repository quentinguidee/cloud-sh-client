import React from "react";

import styles from "./Paragraph.module.sass";
import classNames from "classnames";

type Props = React.HTMLProps<HTMLParagraphElement>;

function Paragraph(props: Props) {
    const { className, ...others } = props;
    return (
        <p className={classNames(styles.paragraph, className)} {...others} />
    );
}

export default Paragraph;

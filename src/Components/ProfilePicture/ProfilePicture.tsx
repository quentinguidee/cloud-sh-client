import React from "react";
import styles from "./ProfilePicture.module.sass";
import classNames from "classnames";

type Props = React.HTMLProps<HTMLImageElement>;

function ProfilePicture(props: Props) {
    const { onClick, className, crossOrigin, ...others } = props;

    return (
        <img
            onClick={onClick}
            className={classNames(styles.picture, className)}
            alt="Profile picture"
            {...others}
        />
    );
}

export default ProfilePicture;

import React from "react";
import styles from "./ProfilePicture.module.sass";
import classNames from "classnames";

type Props = React.HTMLProps<HTMLImageElement> & {
    size?: number;
};

function ProfilePicture(props: Props) {
    const { onClick, className, crossOrigin, size, style, ...others } = props;

    return (
        <img
            onClick={onClick}
            className={classNames(styles.picture, className)}
            style={{
                width: size,
                height: size,
                ...style,
            }}
            alt="Profile picture"
            {...others}
        />
    );
}

export default ProfilePicture;

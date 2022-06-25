import React from "react";

import styles from "./Account.module.sass";
import User from "Models/User";

type Props = {
    user?: User;
};

function Account(props: Props) {
    const { user } = props;
    return <div className={styles.account}>{user?.username}</div>;
}

export default Account;

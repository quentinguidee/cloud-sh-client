import React from "react";

import styles from "./Account.module.sass";
import User from "Models/User";

type Props = {
    account?: User;
};

function Account(props: Props) {
    return <div className={styles.account}></div>;
}

export default Account;

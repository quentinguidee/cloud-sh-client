import React, { CSSProperties, useState } from "react";

import styles from "./Account.module.sass";
import User from "Models/User";
import Popover from "Components/Popover/Popover";
import Layout from "Components/Layout/Layout";
import PopoverItemLink from "Components/PopoverItemLink/PopoverItemLink";

type Props = {
    user?: User;
};

function Account(props: Props) {
    const { user } = props;

    const [show, setShow] = useState<boolean>(false);

    const popoverStyle: CSSProperties = {
        right: 0,
        top: "48px",
    };

    const togglePopover = () => {
        setShow(!show);
    };

    return (
        <div className={styles.account}>
            <img
                onClick={togglePopover}
                className={styles.picture}
                alt="Profile picture"
                src={user?.profile_picture}
            />
            <Popover
                show={show}
                className={styles.popover}
                style={popoverStyle}
                onClose={() => setShow(false)}
            >
                <Layout vertical>
                    <PopoverItemLink
                        to="/logout"
                        symbol="logout"
                        className={styles.logout}
                    >
                        Logout
                    </PopoverItemLink>
                </Layout>
            </Popover>
        </div>
    );
}

export default Account;

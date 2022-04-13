import React from "react";

type Props = React.HTMLProps<HTMLDivElement>;

function NavBar(props: Props) {
    return <div {...props} />;
}

export default NavBar;

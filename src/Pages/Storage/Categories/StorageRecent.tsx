import React, { Fragment } from "react";
import FileExplorer from "Layouts/FileExplorer/FileExplorer";
import TitleBar from "Layouts/TitleBar/TitleBar";

function StorageRecent() {
    const reload = () => {};

    return (
        <Fragment>
            <TitleBar title="Recent" />
            <FileExplorer onReload={reload} />
        </Fragment>
    );
}

export default StorageRecent;

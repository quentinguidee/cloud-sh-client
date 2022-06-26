import React from "react";
import Page from "Layouts/Page/Page";
import TitleBar from "Layouts/TitleBar/TitleBar";
import FileExplorer from "Layouts/FileExplorer/FileExplorer";

function Storage() {
    return (
        <Page>
            <TitleBar title="Storage" />
            <FileExplorer />
        </Page>
    );
}

export default Storage;

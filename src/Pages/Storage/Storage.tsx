import React from "react";
import Page from "Layouts/Page/Page";
import TitleBar from "Layouts/TitleBar/TitleBar";
import FileExplorer from "Layouts/FileExplorer/FileExplorer";
import Uploads from "Components/Uploads/Uploads";
import UploadsItem from "Components/UploadsItem/UploadsItem";

function Storage() {
    return (
        <React.Fragment>
            <Page>
                <TitleBar title="Storage" />
                <FileExplorer />
            </Page>
            <Uploads>
                <UploadsItem node={{ name: "Filename", type: "file" }} />
            </Uploads>
        </React.Fragment>
    );
}

export default Storage;

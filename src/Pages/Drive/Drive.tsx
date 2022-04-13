import React from "react";
import { Title } from "Components/Title/Title";
import Page from "Layouts/Page/Page";
import List from "Components/List/List";
import FileListItem from "Layouts/FileListItem/FileListItem";

function Drive() {
    return (
        <Page>
            <Title>Drive</Title>
            <List>
                <FileListItem file={{ type: "file", filename: "File.txt" }} />
                <FileListItem
                    file={{ type: "directory", filename: "Directory" }}
                />
                <FileListItem
                    file={{ type: "file", filename: "Another document" }}
                />
            </List>
        </Page>
    );
}

export default Drive;

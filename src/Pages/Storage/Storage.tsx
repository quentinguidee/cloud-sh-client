import React from "react";
import { Title } from "Components/Title/Title";
import Page from "Layouts/Page/Page";
import List from "Components/List/List";
import FileListItem from "Layouts/FileListItem/FileListItem";
import Button from "Components/Button/Button";
import Icon from "Components/Icon/Icon";
import Text from "Components/Text/Text";
import Layout from "Components/Layout/Layout";

function Drive() {
    return (
        <Page>
            <Title>Storage</Title>
            <Layout horizontal center gap={12}>
                <Button>
                    <Icon symbol="create_new_folder" />
                    <Text>New folder</Text>
                </Button>
            </Layout>
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

import React from "react";
import Page from "Layouts/Page/Page";
import List from "Components/List/List";
import FileListItem from "Layouts/FileListItem/FileListItem";
import Button from "Components/Button/Button";
import Symbol from "Components/Icon/Symbol";
import Text from "Components/Text/Text";
import Layout from "Components/Layout/Layout";
import TitleBar from "Layouts/TitleBar/TitleBar";
import User from "Models/User";

type Props = {
    account?: User;
};

function Storage(props: Props) {
    const { account } = props;
    return (
        <Page>
            <TitleBar title="Storage" account={account} />
            <Layout horizontal center gap={12}>
                <Button>
                    <Symbol symbol="create_new_folder" />
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

export default Storage;

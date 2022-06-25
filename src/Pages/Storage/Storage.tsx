import React from "react";
import Page from "Layouts/Page/Page";
import Button from "Components/Button/Button";
import Symbol from "Components/Symbol/Symbol";
import Text from "Components/Text/Text";
import Layout from "Components/Layout/Layout";
import TitleBar from "Layouts/TitleBar/TitleBar";
import FileExplorer from "Layouts/FileExplorer/FileExplorer";

function Storage() {
    return (
        <Page>
            <TitleBar title="Storage" />
            <Layout horizontal center gap={12}>
                <Button>
                    <Symbol symbol="create_new_folder" />
                    <Text>New folder</Text>
                </Button>
            </Layout>
            <FileExplorer />
        </Page>
    );
}

export default Storage;

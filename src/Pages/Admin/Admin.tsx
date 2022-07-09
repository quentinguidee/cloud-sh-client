import React from "react";
import Page from "Layouts/Page/Page";
import TitleBar from "Layouts/TitleBar/TitleBar";

function Admin() {
    return (
        <React.Fragment>
            <Page>
                <TitleBar title="Admin panel" />
            </Page>
        </React.Fragment>
    );
}

export default Admin;

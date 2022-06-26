import React, { useEffect, useState } from "react";
import List from "Components/List/List";
import FileListItem from "Layouts/FileListItem/FileListItem";
import { File } from "Models/File";
import { route } from "Backend/api";
import { useSession } from "Store/Hooks/useSession";
import axios from "axios";
import Layout from "Components/Layout/Layout";
import Button from "Components/Button/Button";
import Symbol from "Components/Symbol/Symbol";
import Text from "Components/Text/Text";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};

function FileExplorer(props: Props) {
    const session = useSession();

    const { "*": path } = useParams();
    const navigate = useNavigate();

    const [files, setFiles] = useState<File[]>([]);

    const loadFiles = () => {
        axios({
            url: route("/storage"),
            params: { path },
            headers: {
                Authorization: session.token,
            },
        })
            .then((res) => {
                console.log(res.data);
                setFiles(res.data.files);
            })
            .catch(console.error);
    };

    const createFolder = () => {
        axios({
            method: "PUT",
            url: route("/storage"),
            data: {
                type: "directory",
                name: "New directory",
            },
            params: { path },
            headers: {
                Authorization: session.token,
            },
        })
            .then(() => loadFiles())
            .catch(console.error);
    };

    const openDirectory = (file: File) => {
        if (file.filetype !== "directory") {
            return;
        }
        let destination = `${path ?? ""}/${file.filename}`;
        if (destination[0] !== "/") destination = `/${destination}`;
        navigate(`/storage${destination}`);
    };

    useEffect(() => {
        loadFiles();
    }, [path]);

    return (
        <React.Fragment>
            <Layout horizontal center gap={12}>
                <Button onClick={createFolder}>
                    <Symbol symbol="create_new_folder" />
                    <Text>New folder</Text>
                </Button>
            </Layout>
            <List>
                {files?.map((file) => (
                    <FileListItem
                        key={file.filename}
                        file={file}
                        onClick={() => openDirectory(file)}
                    />
                ))}
            </List>
        </React.Fragment>
    );
}

export default FileExplorer;

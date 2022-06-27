import React, { useEffect, useState } from "react";
import List from "Components/List/List";
import FileListItem from "Layouts/FileListItem/FileListItem";
import { File } from "Models/File";
import { api, route } from "Backend/api";
import { useSession } from "Store/Hooks/useSession";
import axios from "axios";
import Layout from "Components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import NewDirectoryButton from "Layouts/NewDirectoryButton/NewDirectoryButton";

function FileExplorer() {
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
                console.table(res.data.files);
                setFiles(res.data.files);
            })
            .catch(api.error);
    };

    const createDirectory = (name: string) => {
        axios({
            method: "PUT",
            url: route("/storage"),
            data: {
                type: "directory",
                name,
            },
            params: { path },
            headers: {
                Authorization: session.token,
            },
        })
            .then(() => loadFiles())
            .catch(api.error);
    };

    const openDirectory = (file: File) => {
        if (file.filetype !== "directory") {
            return;
        }
        let destination = `${path ?? ""}/${file.filename}`;
        if (destination[0] !== "/") destination = `/${destination}`;
        navigate(`/storage${destination}`);
    };

    const onDelete = (file: File) => {
        const filepath = `${path ?? ""}/${file.filename}`;
        axios({
            method: "DELETE",
            url: route("/storage"),
            params: { path: filepath },
            headers: {
                Authorization: session.token,
            },
        })
            .then(() => loadFiles())
            .catch(api.error);
    };

    useEffect(() => {
        loadFiles();
    }, [path]);

    return (
        <React.Fragment>
            <Layout horizontal center gap={12}>
                <NewDirectoryButton createDirectory={createDirectory} />
            </Layout>
            <List>
                {files?.map((file, i) => (
                    <FileListItem
                        key={i}
                        file={file}
                        onClick={() => openDirectory(file)}
                        onDelete={() => onDelete(file)}
                    />
                ))}
            </List>
        </React.Fragment>
    );
}

export default FileExplorer;

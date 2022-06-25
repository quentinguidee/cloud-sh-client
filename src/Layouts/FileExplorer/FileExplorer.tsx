import React from "react";
import List from "Components/List/List";
import FileListItem from "Layouts/FileListItem/FileListItem";
import { File } from "Models/File";

type Props = {};

function FileExplorer(props: Props) {
    const files: File[] = [
        { type: "file", filename: "File.txt" },
        { type: "directory", filename: "Directory" },
        { type: "file", filename: "Another document" },
    ];

    return (
        <List>
            {files.map((file) => (
                <FileListItem file={file} />
            ))}
        </List>
    );
}

export default FileExplorer;

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import FileListItem from "./FileListItem";
import { File } from "Models/File";

it("renders", async () => {
    const file: File = {
        filename: "Fichier.txt",
        type: "file",
    };

    const { getByText } = render(<FileListItem file={file} />);
    expect(getByText(file.filename)).toBeInTheDocument();
});

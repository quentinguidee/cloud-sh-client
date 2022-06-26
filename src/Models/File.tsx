export type FileType = "directory" | "file";

export type File = {
    filename: string;
    filetype: FileType;
};

export function getIcon(file: File): string {
    switch (file.filetype) {
        case "directory":
            return "folder";
        default:
            return "article";
    }
}

export function getColor(file: File) {
    switch (file.filetype) {
        case "file":
            return "#3e6a99";
        default:
            return "var(--text-secondary)";
    }
}

export type FileType = "directory" | "file";

export type File = {
    filename: string;
    type: FileType;
};

export function getIcon(file: File): string {
    switch (file.type) {
        case "directory":
            return "folder";
        default:
            return "article";
    }
}

export function getColor(file: File) {
    switch (file.type) {
        case "file":
            return "#41628c";
        default:
            return "var(--text-secondary)";
    }
}

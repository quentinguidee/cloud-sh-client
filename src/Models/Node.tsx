export type NodeType = "directory" | "file";

export type Node = {
    name: string;
    type: NodeType;
};

export function getIcon(node: Node): string {
    switch (node.type) {
        case "directory":
            return "folder";
        default:
            return "article";
    }
}

export function getColor(node: Node) {
    switch (node.type) {
        case "file":
            return "#3e6a99";
        default:
            return "var(--text-secondary)";
    }
}
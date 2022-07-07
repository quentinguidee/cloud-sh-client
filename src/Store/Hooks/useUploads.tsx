import { useSelector } from "react-redux";
import { useMemo } from "react";
import { getUploads } from "Store/Slices/UploadsSlice";
import { NodeUpload } from "Models/Node";

export const useUploads = () => {
    const uploads = useSelector(getUploads);
    return useMemo<NodeUpload[]>(() => uploads, [uploads]);
};

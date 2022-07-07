import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreState } from "Store/Store";
import { NodeUpload } from "Models/Node";

function pushUploadReducer(state, action: PayloadAction<NodeUpload>) {
    const { payload: upload } = action;
    state.push(upload);
}

function removeUploadReducer(state, action: PayloadAction<NodeUpload>) {
    const { payload: upload } = action;
    state.splice(upload, 1);
}

type UpdateUpload = {
    node: NodeUpload;
    changes: Partial<NodeUpload>;
};

function updateUploadReducer(state, action: PayloadAction<UpdateUpload>) {
    const { payload: upload } = action;
    const i = state.findIndex((u) => u.name === upload.node.name);
    state[i] = {
        ...upload.node,
        ...upload.changes,
    };
}

const uploadsSlice = createSlice({
    name: "uploads",
    initialState: [] as NodeUpload[],
    reducers: {
        pushUpload: pushUploadReducer,
        removeUpload: removeUploadReducer,
        updateUpload: updateUploadReducer,
    },
});

export const { pushUpload, removeUpload, updateUpload } = uploadsSlice.actions;

export const getUploads = (state: StoreState) => state.uploads;

export default uploadsSlice.reducer;

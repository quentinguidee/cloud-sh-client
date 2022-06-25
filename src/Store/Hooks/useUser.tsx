import { useSelector } from "react-redux";
import { getUser } from "Store/Slices/AuthSlice";
import { useMemo } from "react";

export const useUser = () => {
    const user = useSelector(getUser);
    return useMemo(() => user, [user]);
};

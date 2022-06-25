import { useSelector } from "react-redux";
import { getSession } from "Store/Slices/AuthSlice";
import { useMemo } from "react";

export const useSession = () => {
    const session = useSelector(getSession);
    return useMemo(() => session, [session]);
};

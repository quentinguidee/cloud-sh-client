import { useSelector } from "react-redux";
import { getSession } from "Store/Slices/AuthSlice";
import { useMemo } from "react";
import { Session } from "Models/Session";

export const useSession = () => {
    const session = useSelector(getSession);
    return useMemo<Session>(() => session, [session]);
};

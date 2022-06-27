import { useSelector } from "react-redux";
import { getUser } from "Store/Slices/AuthSlice";
import { useMemo } from "react";
import User from "Models/User";

export const useUser = () => {
    const user = useSelector(getUser);
    return useMemo<User>(() => user, [user]);
};

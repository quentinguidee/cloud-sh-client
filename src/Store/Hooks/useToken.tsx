import { useSelector } from "react-redux";
import { getToken } from "Store/Slices/AuthSlice";
import { useMemo } from "react";
import { Token } from "Models/Token";

export const useToken = () => {
    const token = useSelector(getToken);
    return useMemo<Token>(() => token, [token]);
};

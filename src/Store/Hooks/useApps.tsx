import { useSelector } from "react-redux";
import { useMemo } from "react";
import { getApps } from "Store/Slices/AppsSlice";
import { App } from "Models/App";

export const useApps = () => {
    const apps = useSelector(getApps);
    return useMemo<App[]>(() => apps, [apps]);
};

import { useSelector } from "react-redux";
import { getTheme } from "Store/Slices/ThemeSlice";
import { useMemo } from "react";
import { Theme } from "Models/Theme";

export const useTheme = () => {
    const theme = useSelector(getTheme);
    return useMemo<Theme>(() => theme, [theme]);
};

import React from "react";
import Symbol from "Components/Symbol/Symbol";
import Button from "Components/Button/Button";
import { setTheme } from "Store/Slices/ThemeSlice";
import { useDispatch } from "react-redux";
import { useTheme } from "Store/Hooks/useTheme";

type Props = React.PropsWithChildren<{}>;

function ThemeToggle(props: Props) {
    const { children } = props;

    const dispatch = useDispatch();

    const theme = useTheme();

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        dispatch(setTheme(newTheme));
    };

    return (
        <Button onlySymbol onClick={toggleTheme}>
            <Symbol symbol={theme === "dark" ? "dark_mode" : "light_mode"} />
            {children}
        </Button>
    );
}

export default ThemeToggle;

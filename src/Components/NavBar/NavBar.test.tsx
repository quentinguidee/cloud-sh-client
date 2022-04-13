import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import NavBar from "./NavBar";

it("renders", async () => {
    const content = "Text";
    const { getByText } = render(<NavBar>{content}</NavBar>);
    expect(getByText(content)).toBeInTheDocument();
});

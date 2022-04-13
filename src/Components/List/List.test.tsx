import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import List from "./List";

it("renders", async () => {
    const content = "Text";
    const { getByText } = render(<List>{content}</List>);
    expect(getByText(content)).toBeInTheDocument();
});

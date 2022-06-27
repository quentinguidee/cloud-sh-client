import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Box from "./Box";

it("renders", async () => {
    const content = "Text";
    const { getByText } = render(<Box>{content}</Box>);
    expect(getByText(content)).toBeInTheDocument();
});

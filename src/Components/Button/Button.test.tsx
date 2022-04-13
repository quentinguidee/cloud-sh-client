import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Button from "./Button";

it("renders", async () => {
    const content = "Text";
    const { getByText } = render(<Button>{content}</Button>);
    expect(getByText(content)).toBeInTheDocument();
});

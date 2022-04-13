import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Title } from "./Title";

it("renders", async () => {
    const content = "Text";
    const { getByText } = render(<Title>{content}</Title>);
    expect(getByText(content)).toBeInTheDocument();
});

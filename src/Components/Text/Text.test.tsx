import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Text, Caption } from "./Text";

it("renders a text", async () => {
    const content = "Text";
    const { getByText } = render(<Text>{content}</Text>);
    expect(getByText(content)).toBeInTheDocument();
});

it("renders a caption", async () => {
    const content = "Text";
    const { getByText } = render(<Caption>{content}</Caption>);
    expect(getByText(content)).toBeInTheDocument();
});

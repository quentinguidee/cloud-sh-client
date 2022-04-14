import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Subtitle, Title } from "./Title";

it("renders a title", async () => {
    const content = "Text";
    const { getByText } = render(<Title>{content}</Title>);
    expect(getByText(content)).toBeInTheDocument();
});

it("renders a subtitle", async () => {
    const content = "Text";
    const { getByText } = render(<Subtitle>{content}</Subtitle>);
    expect(getByText(content)).toBeInTheDocument();
});

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Text from "./Text";

it("renders", async () => {
    const content = "Text";
    const { getByText } = render(<Text>{content}</Text>);
    expect(getByText(content)).toBeInTheDocument();
});

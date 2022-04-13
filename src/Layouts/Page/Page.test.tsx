import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Page from "./Page";

it("renders", async () => {
    const content = "Content";
    const { getByText } = render(<Page>{content}</Page>);
    expect(getByText(content)).toBeInTheDocument();
});

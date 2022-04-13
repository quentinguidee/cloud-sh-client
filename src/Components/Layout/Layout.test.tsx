import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Layout from "./Layout";

it("renders", async () => {
    const content = "Text";
    const { getByText } = render(<Layout>{content}</Layout>);
    expect(getByText(content)).toBeInTheDocument();
});

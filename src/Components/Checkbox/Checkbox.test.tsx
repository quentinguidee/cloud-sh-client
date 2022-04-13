import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Checkbox from "./Checkbox";

it("renders", async () => {
    const { getByText } = render(<Checkbox />);
    expect(getByText("done")).toBeInTheDocument();
});

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Logo from "./Logo";

it("renders", async () => {
    const { getByText } = render(<Logo />);
    expect(getByText("cloud.sh")).toBeInTheDocument();
});

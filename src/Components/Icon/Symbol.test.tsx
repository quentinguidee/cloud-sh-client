import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Symbol from "./Symbol";

it("renders", async () => {
    const symbol = "done";
    const { getByText } = render(<Symbol symbol={symbol} />);
    expect(getByText(symbol)).toBeInTheDocument();
});

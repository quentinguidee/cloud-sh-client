import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Icon from "./Icon";

it("renders", async () => {
    const symbol = "done";
    const { getByText } = render(<Icon symbol={symbol} />);
    expect(getByText(symbol)).toBeInTheDocument();
});

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Close from "./Close";
import fn = jest.fn;

it("can be clicked", async () => {
    const onClick = fn();
    const { container } = render(<Close onClick={onClick} />);
    fireEvent.click(container.firstChild);
    expect(onClick).toHaveBeenCalled();
});

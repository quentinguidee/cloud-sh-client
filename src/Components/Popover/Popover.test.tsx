import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Popover from "./Popover";
import PopoverItem from "Components/PopoverItem/PopoverItem";
import fn = jest.fn;

type Props = {
    show: boolean;
    onClose?: () => void;
};

function Component(props: Props) {
    const { show, onClose } = props;
    return (
        <Popover show={show} onClose={onClose}>
            <PopoverItem>Item</PopoverItem>
        </Popover>
    );
}

it("renders", async () => {
    const { getByText } = render(<Component show={true} />);
    expect(getByText("Item")).toBeInTheDocument();
});

it("can be dismissed with the escape key", async () => {
    const onClose = fn();
    const { container } = render(<Component show={true} onClose={onClose} />);
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.keyDown(container, { key: "Escape", charCode: 27 });
    expect(onClose).toHaveBeenCalled();
});

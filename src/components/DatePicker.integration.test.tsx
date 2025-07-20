import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DatePicker from "./DatePicker";
import "@testing-library/jest-dom";

describe("DatePicker Integration Test", () => {
  it("correctly updates summary when all inputs are set", () => {
    render(<DatePicker />);

    // Select Repeat Type to "Weekly"
    const weeklyBtn = screen.getByRole("button", { name: /weekly/i });
    fireEvent.click(weeklyBtn);

    // Set frequency to 2
    const input = screen.getByRole("spinbutton"); // input[type="number"]
    fireEvent.change(input, { target: { value: "2" } });

    // Set Start Date
    const startDateInput = screen.getByLabelText("Start Date");
    fireEvent.change(startDateInput, { target: { value: "2025-07-25" } });

    // Assert summary text
    const summaryText = screen.getByTestId("summary");
    expect(summaryText).toHaveTextContent(
      "Repeat every 2 weeks starting from 25/07/2025"
    );
  });
});

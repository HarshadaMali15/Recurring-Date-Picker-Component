import React from "react"; // keep this even if unused

import { formatDate, getSummaryText } from "./DatePicker";

describe("DatePicker helpers", () => {
  test("formats date correctly", () => {
    expect(formatDate("2025-07-20")).toBe("20/07/2025");
  });

  test("generates daily summary correctly", () => {
    expect(getSummaryText("daily", 1, "2025-07-20")).toBe(
      "Repeat every 1 day starting from 20/07/2025"
    );
  });

  test("generates weekly summary with plural", () => {
    expect(getSummaryText("weekly", 3, "2025-07-20")).toBe(
      "Repeat every 3 weeks starting from 20/07/2025"
    );
  });

  test("returns message if no start date", () => {
    expect(getSummaryText("daily", 1, "")).toBe("Please select a start date");
  });
});

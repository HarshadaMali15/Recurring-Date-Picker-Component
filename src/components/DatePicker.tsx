"use client";
import React, { useState } from "react";

import Calendar from "./Calendar";

type RepeatType = "daily" | "weekly" | "monthly" | "yearly";

//  Extracted for unit testing
export const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};

// Extracted for unit testing
export const getSummaryText = (
  repeatType: RepeatType,
  everyValue: number,
  startDate: string
): string => {
  if (!startDate) return "Please select a start date";

  const formattedStartDate = formatDate(startDate);

  switch (repeatType) {
    case "daily":
      return `Repeat every ${everyValue} day${
        everyValue > 1 ? "s" : ""
      } starting from ${formattedStartDate}`;
    case "weekly":
      return `Repeat every ${everyValue} week${
        everyValue > 1 ? "s" : ""
      } starting from ${formattedStartDate}`;
    case "monthly":
      return `Repeat every ${everyValue} month${
        everyValue > 1 ? "s" : ""
      } starting from ${formattedStartDate}`;
    case "yearly":
      return `Repeat every ${everyValue} year${
        everyValue > 1 ? "s" : ""
      } starting from ${formattedStartDate}`;
    default:
      return "";
  }
};

export default function DatePicker() {
  const [repeatType, setRepeatType] = useState<RepeatType>("daily");
  const [everyValue, setEveryValue] = useState(1);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Recurring Date Picker Component
      </h2>

      {/* Repeat Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-dark-600 mb-2">
          Repeat Type
        </label>
        <div className="flex flex-wrap gap-2">
          {["daily", "weekly", "monthly", "yearly"].map((type) => (
            <button
              key={type}
              onClick={() => setRepeatType(type as RepeatType)}
              className={`px-3 py-1 text-sm rounded ${
                repeatType === type
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {type[0].toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Every */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Every
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            value={everyValue}
            onChange={(e) =>
              setEveryValue(Number.parseInt(e.target.value) || 1)
            }
            className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
          />
          <span className="text-gray-600">
            {repeatType === "daily"
              ? "day"
              : repeatType === "weekly"
              ? "week"
              : repeatType === "monthly"
              ? "month"
              : "year"}
            {everyValue > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Start Date */}
      <div className="mb-4">
        <label
          htmlFor="start-date"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Start Date
        </label>
        <input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* End Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          End Date (Optional)
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Summary */}
      <div className="bg-blue-50 p-3 rounded-md">
        <p className="text-sm text-blue-800" data-testid="summary">
          {getSummaryText(repeatType, everyValue, startDate)}
        </p>
        {endDate && (
          <p className="text-xs text-blue-600 mt-1">
            Ends on {formatDate(endDate)}
          </p>
        )}
      </div>

      {/* Calendar Preview */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Preview Calendar
        </label>
        <Calendar
          startDate={startDate}
          endDate={endDate}
          repeatType={repeatType}
          everyValue={everyValue}
        />
      </div>
    </div>
  );
}

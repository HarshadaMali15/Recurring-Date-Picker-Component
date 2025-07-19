"use client"

import { useState } from "react"
import Calendar from "./Calendar"

type RepeatType = "daily" | "weekly" | "monthly" | "yearly"

export default function DatePicker() {
  const [repeatType, setRepeatType] = useState<RepeatType>("daily")
  const [everyValue, setEveryValue] = useState(1)
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB")
  }

  const getSummaryText = () => {
    if (!startDate) return "Please select a start date"

    const formattedStartDate = formatDate(startDate)

    switch (repeatType) {
      case "daily":
        return `Repeat every ${everyValue} day${everyValue > 1 ? "s" : ""} starting from ${formattedStartDate}`
      case "weekly":
        return `Repeat every ${everyValue} week${everyValue > 1 ? "s" : ""} starting from ${formattedStartDate}`
      case "monthly":
        return `Repeat every ${everyValue} month${everyValue > 1 ? "s" : ""} starting from ${formattedStartDate}`
      case "yearly":
        return `Repeat every ${everyValue} year${everyValue > 1 ? "s" : ""} starting from ${formattedStartDate}`
      default:
        return ""
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* <h2 className="text-lg font-semibold mb-4 text-gray-800">Simple Recurring Date Picker</h2> */}

      {/* Repeat Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-dark-600 mb-2">Repeat Type</label>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "daily", label: "Daily" },
            { value: "weekly", label: "Weekly" },
            { value: "monthly", label: "Monthly" },
            { value: "yearly", label: "Yearly" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setRepeatType(option.value as RepeatType)}
              className={`px-3 py-1 text-sm rounded ${
                repeatType === option.value ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Every */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Every</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            value={everyValue}
            onChange={(e) => setEveryValue(Number.parseInt(e.target.value) || 1)}
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* End Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">End Date (Optional)</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="No end date"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Summary */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
        <div className="bg-blue-50 p-3 rounded-md">
          <p className="text-sm text-blue-800">{getSummaryText()}</p>
          {endDate && <p className="text-xs text-blue-600 mt-1">Ends on {formatDate(endDate)}</p>}
        </div>
      </div>

      {/* Preview Calendar */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Preview Calendar</label>
        <Calendar startDate={startDate} endDate={endDate} repeatType={repeatType} everyValue={everyValue} />
      </div>
    </div>
  )
}

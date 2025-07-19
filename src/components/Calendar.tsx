"use client"

import { useState } from "react"

type RepeatType = "daily" | "weekly" | "monthly" | "yearly"

interface CalendarProps {
  startDate: string
  endDate: string
  repeatType: RepeatType
  everyValue: number
}

export default function Calendar({ startDate, endDate, repeatType, everyValue }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isRecurringDate = (date: Date) => {
    if (!startDate) return false

    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : null

    if (date < start) return false
    if (end && date > end) return false

    const diffTime = date.getTime() - start.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    switch (repeatType) {
      case "daily":
        return diffDays >= 0 && diffDays % everyValue === 0

      case "weekly":
        return diffDays >= 0 && diffDays % (everyValue * 7) === 0

      case "monthly":
        const monthsDiff = (date.getFullYear() - start.getFullYear()) * 12 + (date.getMonth() - start.getMonth())
        return monthsDiff >= 0 && monthsDiff % everyValue === 0 && date.getDate() === start.getDate()

      case "yearly":
        const yearsDiff = date.getFullYear() - start.getFullYear()
        return (
          yearsDiff >= 0 &&
          yearsDiff % everyValue === 0 &&
          date.getMonth() === start.getMonth() &&
          date.getDate() === start.getDate()
        )

      default:
        return false
    }
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const isRecurring = isRecurringDate(date)
      const isToday = new Date().toDateString() === date.toDateString()

      days.push(
        <div
          key={day}
          className={`w-8 h-8 flex items-center justify-center text-sm rounded ${
            isRecurring
              ? "bg-green-500 text-white"
              : isToday
                ? "bg-blue-100 text-blue-800"
                : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {day}
        </div>,
      )
    }

    return days
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev)
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1)
      } else {
        newMonth.setMonth(prev.getMonth() + 1)
      }
      return newMonth
    })
  }

  return (
    <div className="border border-gray-200 rounded-md p-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigateMonth("prev")} className="p-1 hover:bg-gray-100 rounded">
          ←
        </button>
        <h3 className="font-medium">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button onClick={() => navigateMonth("next")} className="p-1 hover:bg-gray-100 rounded">
          →
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="w-8 h-6 flex items-center justify-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-100 rounded"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Recurring</span>
        </div>
      </div>
    </div>
  )
}

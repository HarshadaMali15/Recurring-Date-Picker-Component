"use client"
import DatePicker from "../components/DatePicker"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">Simple Recurring Date Picker</h1>
        <div className="max-w-md mx-auto">
          <DatePicker />
        </div>
      </div>
    </div>
  )
}

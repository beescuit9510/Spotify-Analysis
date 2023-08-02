import React from 'react'

export default function Ranges({ timeRange, handleRange }) {
  const timeRanges = [
    { label: 'Last month', value: 'short_term' },
    { label: 'Last 6 months', value: 'medium_term' },
    { label: 'All time', value: 'long_term' },
  ]

  return (
    <div className='flex gap-1'>
      {timeRanges.map((range) => {
        return (
          <button
            key={range.value}
            className={`hover:bg-gray-200 hover:text-gray-700 dark:text-white px-2 py-2 font-normal rounded-xl ${
              timeRange === range.value ? 'bg-indigo-50 text-indigo-900' : ''
            }`}
            onClick={() => {
              handleRange(range.value)
            }}
          >
            {range.label}
          </button>
        )
      })}
    </div>
  )
}

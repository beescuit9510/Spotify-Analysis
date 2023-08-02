import React from 'react'

export default function Gallery({ data, limit }) {
  return (
    <div className='flex gap-3'>
      {data.slice(0, limit ?? data.items.length).map((item) => (
        <div
          key={item.id}
          className='cursor-pointer w-[32%] bg-slate-500 m-auto'
          onClick={() => window.open(item.link)}
        >
          <img className='h-full w-full' src={item.image} />
        </div>
      ))}
    </div>
  )
}

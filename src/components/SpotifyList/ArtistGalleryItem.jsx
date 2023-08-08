import React, { useState } from 'react'

export default function ArtistGalleryItem({ item }) {
  const [hidden, setHidden] = useState(true)
  return (
    <div
      className='relative sm:w-[32%]'
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
    >
      <img
        className=' aspect-square object-cover h-full w-full '
        src={item.image}
      />

      <div
        className='absolute text-xl font-extrabold w-full h-full inset-0 text-white  bg-slate-900 opacity-70'
        hidden={hidden}
      >
        <div className='h-full flex flex-col justify-center items-center text-center '>
          <div
            className='animate-bounce cursor-pointer'
            onClick={() => window.open(item.url)}
          >
            {item.name}
          </div>
          {/* <div className='hover:animate-pulse text-sm font-normal top-0 right-1 absolute cursor-pointer'>
            X
          </div> */}
        </div>
      </div>
    </div>
  )
}

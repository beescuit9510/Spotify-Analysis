import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { followArtists, unfollowArtists } from '../../apis/spotify'

export default function ArtistGalleryItem({ item }) {
  const [hidden, setHidden] = useState(true)
  const [content, setContent] = useState(item.name)
  // const queryClient = useQueryClient()

  const unfollowingMutation = useMutation({
    mutationKey: ['unfollow artist'],
    mutationFn: (id) => {
      unfollowArtists({ ids: id })
    },
    // onSuccess: (data) => {
    // queryClient.invalidateQueries('userList')
    // },
  })

  const followingMutation = useMutation({
    mutationKey: ['follow artist'],
    mutationFn: (id) => {
      followArtists({ ids: id })
    },
  })

  const [following, setFollowing] = useState(true)
  const [mutate, setMutate] = useState(() => {})

  useEffect(() => {
    if (following) {
      setMutate(unfollowingMutation)
    } else {
      setMutate(followingMutation)
    }
  }, [following])

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
        hidden={following ? hidden : false}
      >
        <div className='h-full flex flex-col justify-center items-center text-center '>
          <div
            className='animate-bounce cursor-pointer'
            onClick={() => {
              mutate.mutateAsync(item.id)
              setFollowing((prev) => !prev)
            }}
            onMouseEnter={() => setContent(following ? 'Unfollow' : 'Follow')}
            onMouseLeave={() => setContent(following ? item.name : 'Follow')}
          >
            {content}
          </div>
          {/* <div className='hover:animate-pulse text-sm font-normal top-0 right-1 absolute cursor-pointer'>
            X
          </div> */}
        </div>
      </div>
    </div>
  )
}

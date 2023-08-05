import { useQuery } from '@tanstack/react-query'
import { getMe } from '../apis/spotify'

export const useMeQuery = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => {
      console.log('Me Loading...')
      return getMe()
    },
    suspense: true,
    retry: false,
  })
}

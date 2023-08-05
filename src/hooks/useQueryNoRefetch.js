import { useQuery } from '@tanstack/react-query'

export const useQueryNoRefetch = ({ queryKey, queryFn }) => {
  return useQuery({
    queryKey,
    queryFn,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}

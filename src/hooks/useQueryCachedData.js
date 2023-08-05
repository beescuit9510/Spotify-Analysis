import { useQueryClient } from '@tanstack/react-query'

export const useQueryCachedData = (queryKey = [], filters = {}) => {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData(queryKey, filters)
  return data
}

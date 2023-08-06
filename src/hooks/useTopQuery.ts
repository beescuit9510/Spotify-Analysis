import { useInfiniteQuery } from '@tanstack/react-query'
import { TimeRange, getNext, getTop } from '../apis/spotify'
import { useState } from 'react'

export const useTopQuery = ({
  type,
  timeRange,
}: {
  type: 'artists' | 'tracks'
  timeRange: TimeRange
}) => {
  const [page, setPage] = useState(1)
  const query = useInfiniteQuery({
    queryKey: [type, { timeRange }],
    queryFn: ({ pageParam }) => {
      if (pageParam) return getNext(pageParam)
      else
        return getTop(type, {
          limit: 10,
          time_range: timeRange,
        })
    },
    getNextPageParam: (lastPage: any) => {
      if (lastPage.next) return lastPage.next
      else return false
    },
    suspense: true,
  })

  const { data } = query
  const { pages } = data as any

  const handleNext = () => {
    if (query.hasNextPage) query.fetchNextPage()
    if (page === pages.length) setPage(1)
    else setPage((prev) => prev + 1)
  }

  return {
    handleNext,
    hasNextPage: query.hasNextPage || page !== pages.length,
    list: pages
      ?.slice(0, query.hasNextPage ? pages.length : page)
      .flatMap((data: any) => data.items),
  }
}

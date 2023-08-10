import { useQueries } from '@tanstack/react-query'
import { TimeRange, getTop } from '../apis/spotify'
import { useEffect, useState } from 'react'

export const useTopQuery = ({
  type,
  timeRange,
  page: defaultPageSize = 10,
}: {
  type: 'artists' | 'tracks'
  timeRange: TimeRange
  page?: number
}) => {
  const [page, setPage] = useState(defaultPageSize)
  const resetPage = () => setPage(defaultPageSize)
  const ranges = ['short_term', 'medium_term', 'long_term']

  useEffect(() => {
    resetPage()
  }, [timeRange])

  const queries: any = useQueries({
    queries: ranges.map((timeRange, index) => ({
      queryKey: [type, { timeRange }],
      suspense: true,
      queryFn: () => {
        return getTop(type, {
          limit: 20,
          offset: 0,
          time_range: timeRange as TimeRange,
        })
      },
    })),
  })

  const targetIdx = ranges.findIndex((v) => v === timeRange)

  const hasNextPage = queries[targetIdx].data.items.length > page

  const handleNext = () => {
    if (hasNextPage) setPage(page + defaultPageSize)
    else resetPage()
  }

  return {
    queries,
    handleNext,
    hasNoPages: !hasNextPage && page <= defaultPageSize,
    hasNextPage,
    resetPage,
    list: queries[targetIdx].data.items.slice(0, page),
  }
}

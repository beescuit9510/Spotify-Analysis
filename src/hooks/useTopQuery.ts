import { useQueries, useQueryClient } from '@tanstack/react-query'
import { TimeRange, getNext, getTop } from '../apis/spotify'
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

  const queryClient = useQueryClient()
  const data: any = queryClient.getQueryData([type, { timeRange }])

  if (data) {
    const hasNextPage = data?.items?.length > page

    const handleNext = () => {
      if (hasNextPage) setPage(page + 10)
      else setPage(10)
    }

    return {
      handleNext,
      hasNoPages: !hasNextPage && page <= 10,
      hasNextPage,
      list: data?.items?.slice(0, page),
    }
  }

  const queries: any = useQueries({
    queries: ranges.map((timeRange, index) => ({
      queryKey: [type, { timeRange }],
      suspense: true,
      queryFn: () => {
        return getTop(type, {
          limit: 50,
          offset: 0,
          time_range: timeRange as TimeRange,
        })
      },
    })),
  })

  queries.forEach((query: any, i: number) => {
    if (i === queries.length - 1) return
    query?.data?.items?.forEach((target: any, newPos: number) => {
      const originalPos = queries[i + 1]?.data?.items.findIndex(
        (item: any) => target.id === item.id
      )

      target.isStay = newPos === originalPos
      target.isUp = originalPos === -1 ? true : originalPos > newPos
      target.isDown = originalPos === -1 ? false : originalPos < newPos
    })

    queryClient.setQueryData([type, { timeRange: ranges[i] }], query.data)
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

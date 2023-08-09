import { useQueries, useQueryClient } from '@tanstack/react-query'
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

  const queryClient = useQueryClient()
  const data: any = queryClient.getQueryData([type, { timeRange }])

  if (data) {
    const idx = ranges.findIndex((r) => r === timeRange)

    if (!data.ranked && idx !== ranges.length - 1) {
      const compare: any = queryClient.getQueryData([
        type,
        { timeRange: ranges[idx + 1] },
      ])

      data?.items?.forEach((target: any, newPos: number) => {
        const originalPos = compare?.items.findIndex(
          (item: any) => target.id === item.id
        )

        target.isStay = newPos === originalPos
        target.isUp = originalPos === -1 ? true : originalPos > newPos
        target.isDown = originalPos === -1 ? false : originalPos < newPos
      })

      data.ranked = true
      queryClient.setQueryData([type, { timeRange }], data)
    }

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

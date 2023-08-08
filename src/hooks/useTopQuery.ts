import { useQueries } from '@tanstack/react-query'
import { TimeRange, getNext, getTop } from '../apis/spotify'
import { useState } from 'react'

export const useTopQuery = ({
  type,
  timeRange,
}: {
  type: 'artists' | 'tracks'
  timeRange: TimeRange
}) => {
  const [page, setPage] = useState(10)
  const ranges = ['short_term', 'medium_term', 'long_term']
  const queries = useQueries({
    queries: ranges.map((timeRange) => ({
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

  const queriesMap: any = queries.reduce(
    (prev, query, i) => ({
      ...prev,
      [ranges[i]]: query,
    }),
    {}
  )
  ranges.forEach((range, i) => {
    if (i === ranges.length - 1) return
    queriesMap[range].data?.items?.forEach((target: any, newPos: number) => {
      const originalPos = queriesMap[ranges[i + 1]].data?.items.findIndex(
        (item: any) => target.id === item.id
      )

      target.isStay = newPos === originalPos
      target.isUp = originalPos === -1 ? true : originalPos > newPos
      target.isDown = originalPos === -1 ? false : originalPos < newPos
    })
  })

  const hasNextPage = queriesMap[timeRange].data.items.length > page

  const handleNext = () => {
    if (hasNextPage) setPage(page + 10)
    else setPage(10)
  }

  return {
    queries,
    handleNext,
    hasNoPages: !hasNextPage && page <= 10,
    hasNextPage,
    list: queriesMap[timeRange].data.items.slice(0, page),
  }
}

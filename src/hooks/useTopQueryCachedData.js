import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const useTopQueryCachedData = ({
  type,
  timeRange,
  page: defaultPageSize = 10,
}) => {
  const [page, setPage] = useState(defaultPageSize)
  const resetPage = () => setPage(defaultPageSize)
  const ranges = ['short_term', 'medium_term', 'long_term']

  useEffect(() => {
    resetPage()
  }, [timeRange])

  const queryClient = useQueryClient()
  const data = queryClient.getQueryData([type, { timeRange }])

  const idx = ranges.findIndex((r) => r === timeRange)

  if (!data) return null

  if (!data.ranked && idx !== ranges.length - 1) {
    const compare = queryClient.getQueryData([
      type,
      { timeRange: ranges[idx + 1] },
    ])

    data?.items?.forEach((target, newPos) => {
      const originalPos = compare?.items.findIndex(
        (item) => target.id === item.id
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

export default useTopQueryCachedData

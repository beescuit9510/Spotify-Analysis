import React, { DetailedHTMLProps, ReactNode } from 'react'

export default function Table<T>({
  columns,
  dataSource,
}: {
  columns: {
    key: string
    label?: string
    props?: DetailedHTMLProps<
      React.ThHTMLAttributes<HTMLTableCellElement>,
      HTMLTableCellElement
    >
    render: (dataSource: T, index: number) => ReactNode
  }[]
  dataSource: T[]
}) {
  const renderedHeader = (
    <tr className='text-slate-500'>
      {columns.map((item) => (
        <th className='px-4 py-1 font-medium' key={item.key} {...item.props}>
          {item.label}
        </th>
      ))}
    </tr>
  )

  const renderedBody = dataSource.map((data, index) => {
    return (
      <tr className='border-b-2' key={index}>
        {columns.map((column) => column.render(data, index))}
      </tr>
    )
  })

  return (
    <table className='border shadow'>
      <thead className='border-b-2 bg-slate-50'>{renderedHeader}</thead>
      <tbody>{renderedBody}</tbody>
    </table>
  )
}

import React, { DetailedHTMLProps, ReactNode } from 'react'

export default function Table<T>({
  columns,
  dataSource,
  props,
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
  props: DetailedHTMLProps<
    React.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  >
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
      <tr className='border-b' key={index}>
        {columns.map((column) => (
          <td key={column.key}>{column.render(data, index)}</td>
        ))}
      </tr>
    )
  })

  return (
    <table className='shadow' {...props}>
      <thead className='border-b bg-slate-50'>{renderedHeader}</thead>
      <tbody>{renderedBody}</tbody>
    </table>
  )
}

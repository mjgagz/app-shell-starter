import { ChevronLeft, ChevronRight, Download, Search } from 'lucide-react'
import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { Button } from './Button'

export interface DataColumn<T> {
  key: string
  label: string
  value: (row: T) => string | number
  render?: (row: T) => ReactNode
}

export interface DataTableProps<T> {
  caption: string
  columns: readonly DataColumn<T>[]
  rows: readonly T[]
  rowKey: (row: T) => string
  statusOf?: (row: T) => string
  pageSize?: number
  exportName?: string
}

function normalized(value: string | number) {
  return String(value).normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('es')
}

function csvCell(value: string | number) {
  let text = String(value)
  if (typeof value === 'string' && /^\s*[=+@-]|^[\t\r\n]/u.test(text)) text = "'" + text
  return '"' + text.replaceAll('"', '""') + '"'
}

function downloadCsv<T>(name: string, columns: readonly DataColumn<T>[], rows: readonly T[]) {
  const lines = [
    columns.map((column) => csvCell(column.label)),
    ...rows.map((row) => columns.map((column) => csvCell(column.value(row)))),
  ]
  const file = new Blob(['\uFEFF', lines.map((line) => line.join(',')).join('\r\n')], {
    type: 'text/csv;charset=utf-8',
  })
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.download = name + '.csv'
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function DataTable<T>({
  caption, columns, rows, rowKey, statusOf, pageSize = 5, exportName = 'registros',
}: DataTableProps<T>) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(0)
  const captionId = useId()
  const statuses = statusOf ? Array.from(new Set(rows.map(statusOf))).filter(Boolean) : []
  const search = normalized(query.trim())
  const filtered = rows.filter((row) =>
    (!status || !statusOf || statusOf(row) === status) &&
    (!search || columns.some((column) => normalized(column.value(row)).includes(search))),
  )
  const size = Number.isFinite(pageSize) ? Math.max(1, Math.floor(pageSize)) : 5
  const pages = Math.max(1, Math.ceil(filtered.length / size))
  const current = Math.min(page, pages - 1)
  const start = current * size
  const visible = filtered.slice(start, start + size)

  return (
    <div className="min-w-0 text-foreground">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <label className="flex min-h-[40px] min-w-0 flex-[1_1_12rem] items-center gap-2 rounded-lg border border-[var(--line)] bg-canvas px-3 text-muted focus-within:ring-2 focus-within:ring-accent">
          <Search size={16} aria-hidden="true" />
          <input
            aria-label="Buscar en la tabla"
            type="search"
            placeholder="Buscar en la tabla"
            className="min-h-[40px] min-w-0 flex-1 bg-transparent text-sm text-foreground focus-visible:outline-none"
            value={query}
            onChange={(event) => { setQuery(event.target.value); setPage(0) }}
          />
        </label>
        {statusOf && (
          <select
            aria-label="Filtrar por estado"
            className="min-h-[40px] max-w-full rounded-lg border border-[var(--line)] bg-surface px-3 text-sm"
            value={status}
            onChange={(event) => { setStatus(event.target.value); setPage(0) }}
          >
            <option value="">Todos los estados</option>
            {statuses.map((item) => <option key={item}>{item}</option>)}
          </select>
        )}
        <Button variant="secondary" disabled={!filtered.length} onClick={() => downloadCsv(exportName, columns, filtered)}>
          <Download size={15} aria-hidden="true" /> CSV
        </Button>
      </div>
      <div tabIndex={0} role="region" aria-labelledby={captionId} className="overflow-x-auto rounded-lg border border-[var(--line)]">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only" id={captionId}>{caption}</caption>
          <thead className="bg-canvas text-muted">
            <tr>{columns.map((column) => <th scope="col" className="px-4 py-3 font-medium" key={column.key}>{column.label}</th>)}</tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr key={rowKey(row)} className="border-t border-[var(--line)]">
                {columns.map((column) => <td key={column.key} className="px-4 py-3">{column.render ? column.render(row) : column.value(row)}</td>)}
              </tr>
            ))}
            {!visible.length && (
              <tr><td colSpan={columns.length} className="px-4 py-8 text-center text-muted">
                {rows.length ? 'Ninguna coincidencia.' : 'Todavía no hay registros.'}
                {(query || status) && <Button className="ml-2" variant="ghost" onClick={() => { setQuery(''); setStatus(''); setPage(0) }}>Limpiar filtros</Button>}
              </td></tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <p role="status">{visible.length ? `${start + 1}–${start + visible.length} de ${filtered.length}` : '0 resultados'}</p>
        <div className="flex items-center gap-1">
          <Button aria-label="Página anterior" variant="ghost" disabled={!current} onClick={() => setPage(current - 1)}><ChevronLeft size={16} /></Button>
          <span className="tabular-nums">{current + 1} / {pages}</span>
          <Button aria-label="Página siguiente" variant="ghost" disabled={current + 1 >= pages} onClick={() => setPage(current + 1)}><ChevronRight size={16} /></Button>
        </div>
      </div>
    </div>
  )
}

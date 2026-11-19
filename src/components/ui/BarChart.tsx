import { useId } from 'react'

export interface BarDatum {
  label: string
  value: number
}

interface BarChartProps {
  title: string
  unit: string
  data: readonly BarDatum[]
}

export function BarChart({ title, unit, data }: BarChartProps) {
  const titleId = useId()
  const valid = data.filter((item) => Number.isFinite(item.value))
  const min = Math.min(0, ...valid.map((item) => item.value))
  const max = Math.max(0, ...valid.map((item) => item.value))
  const range = max - min || 1
  const format = new Intl.NumberFormat('es-MX', { maximumFractionDigits: 3 })

  return (
    <figure aria-labelledby={titleId} className="min-w-0">
      <figcaption id={titleId} className="mb-5 flex flex-wrap items-baseline gap-x-2">
        <strong className="font-semibold text-foreground">{title}</strong>
        <span className="text-xs text-muted">{unit}</span>
      </figcaption>
      {valid.length ? (
        <dl className="grid gap-3 text-sm">
          {valid.map(({ label, value }) => (
            <div key={label} className="grid grid-cols-[minmax(4rem,1fr)_minmax(0,3fr)_minmax(3rem,auto)] items-center gap-3">
              <dt className="break-words text-muted">{label}</dt>
              <dd className="contents">
                <span aria-hidden="true" className="relative block h-4 rounded-sm bg-canvas">
                  <span
                    className="absolute inset-y-0 rounded-sm bg-accent"
                    style={{ left: `${((Math.min(0, value) - min) / range) * 100}%`, width: `${(Math.abs(value) / range) * 100}%` }}
                  />
                </span>
                <span className="text-right font-medium tabular-nums">{format.format(value)}<span className="sr-only"> {unit}</span></span>
              </dd>
            </div>
          ))}
        </dl>
      ) : <p className="text-sm text-muted">Todavía no hay datos para esta gráfica.</p>}
    </figure>
  )
}

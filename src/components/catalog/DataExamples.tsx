import { useState } from 'react'
import { Badge } from '../ui/Badge'
import { BarChart } from '../ui/BarChart'
import { DataTable } from '../ui/DataTable'
import type { DataColumn } from '../ui/DataTable'

interface Pattern {
  name: string
  category: string
  status: 'Disponible' | 'En revisión'
}

const patterns: readonly Pattern[] = [
  { name: 'Botón', category: 'Acciones', status: 'Disponible' },
  { name: 'Campo de texto', category: 'Formularios', status: 'Disponible' },
  { name: 'Tabla de datos', category: 'Datos', status: 'Disponible' },
  { name: 'Gráfica de barras', category: 'Datos', status: 'En revisión' },
  { name: 'Panel lateral', category: 'Navegación', status: 'Disponible' },
  { name: 'Notificación', category: 'Estados', status: 'En revisión' },
  { name: 'Selector', category: 'Formularios', status: 'Disponible' },
  { name: 'Indicador', category: 'Datos', status: 'En revisión' },
]

const columns: readonly DataColumn<Pattern>[] = [
  { key: 'name', label: 'Componente', value: (row) => row.name },
  { key: 'category', label: 'Categoría', value: (row) => row.category },
  {
    key: 'status', label: 'Estado', value: (row) => row.status,
    render: (row) => <Badge tone={row.status === 'Disponible' ? 'success' : 'neutral'} className="whitespace-nowrap">{row.status}</Badge>,
  },
]

export function DataExamples({ section }: { section: 'tabla' | 'grafica' }) {
  const [period, setPeriod] = useState('semana')
  if (section === 'tabla') {
    return <DataTable caption="Componentes de muestra" rows={patterns} columns={columns} rowKey={(row) => row.name} statusOf={(row) => row.status} pageSize={4} exportName="componentes" />
  }

  const data = period === 'semana'
    ? [{ label: 'Lun', value: 26 }, { label: 'Mar', value: 19 }, { label: 'Mié', value: 38 }, { label: 'Jue', value: 31 }, { label: 'Vie', value: 45 }]
    : [{ label: 'Semana 1', value: 116 }, { label: 'Semana 2', value: 158 }, { label: 'Semana 3', value: 138 }, { label: 'Semana 4', value: 159 }]

  return (
    <div>
      <label className="mb-5 flex flex-wrap items-center gap-2 text-sm text-muted">
        Periodo
        <select value={period} onChange={(event) => setPeriod(event.target.value)} className="min-h-[40px] rounded-lg border border-[var(--line)] bg-surface px-3 text-foreground">
          <option value="semana">Esta semana</option>
          <option value="mes">Este mes</option>
        </select>
      </label>
      <BarChart title="Consultas de muestra" unit="consultas" data={data} />
    </div>
  )
}

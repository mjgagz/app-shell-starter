import { Activity, Boxes, CircleGauge } from 'lucide-react'
import { BentoGrid } from '../components/layout/BentoGrid'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { StatCard } from '../components/ui/StatCard'

const indicators = [
  { label: 'Elementos registrados', value: '128', Icon: Boxes },
  { label: 'Eventos recientes', value: '24', Icon: Activity },
  { label: 'Disponibilidad', value: '99.9 %', Icon: CircleGauge },
]

export function DashboardView() {
  return (
    <>
      <div className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Resumen general</h1>
        <Badge tone="info">Datos de ejemplo</Badge>
      </div>
      <BentoGrid>
        {indicators.map(({ label, value, Icon }) => (
          <StatCard key={label} label={label} value={value} icon={<Icon size={20} />} />
        ))}
        <Card className="md:col-span-3">
          <section aria-labelledby="modules-title" className="grid gap-4">
            <h2 id="modules-title" className="text-lg font-semibold tracking-tight">Módulos</h2>
            <div className="min-h-48 rounded-xl border border-dashed border-line bg-canvas/50" />
          </section>
        </Card>
      </BentoGrid>
    </>
  )
}

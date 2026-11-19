import {
  ArrowUpRight,
  Check,
  SlidersHorizontal,
  CircleCheck,
  ListFilter,
} from 'lucide-react'
import type { Specimen } from '../../data/catalog'

export function SpecimenPreview({ id }: { id: Specimen['id'] }) {
  return (
    <div aria-hidden="true" className={'specimen-preview specimen-' + id}>
      {id === 'controles' && (
        <div className="sample-controls">
          <span>
            <Check size={15} /> Confirmar
          </span>
          <i>
            <SlidersHorizontal size={16} />
          </i>
          <i>
            <ArrowUpRight size={17} />
          </i>
        </div>
      )}
      {id === 'tabla' && (
        <div className="sample-table">
          {[1, 2, 3, 4].map((n) => (
            <div key={n}>
              <i />
              <i />
              <i />
            </div>
          ))}
        </div>
      )}
      {id === 'grafica' && (
        <div className="sample-chart">
          {[21, 36, 29, 48, 40, 56, 46, 68, 58].map((n, i) => (
            <i key={i} style={{ height: n + '%' }} />
          ))}
        </div>
      )}
      {id === 'formulario' && (
        <div className="sample-form">
          <i />
          <span />
          <i />
          <span />
        </div>
      )}
      {id === 'estados' && (
        <div className="sample-status">
          <CircleCheck size={22} /> Completado
        </div>
      )}
    </div>
  )
}

export function FoundationArt() {
  return (
    <div className="foundation-art" aria-hidden="true">
      <div className="art-rings" />
      <div className="plate plate-low" />
      <div className="plate plate-mid" />
      <div className="plate plate-top">
        <ListFilter />
        <i />
        <i />
        <i />
      </div>
    </div>
  )
}

import { useEffect, useId, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ArrowUpRight, Bookmark, Check, FileSliders, Pencil, RotateCcw } from 'lucide-react'
import { useToast } from '../../hooks/useToast'
import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { FeedbackState } from '../ui/FeedbackState'
import { FormDrawer } from '../ui/FormDrawer'

export type ControlSection = 'controles' | 'formulario' | 'estados'

const inputClass = 'min-h-[40px] w-full rounded-lg border border-[var(--line)] bg-canvas px-3 py-2 text-sm text-foreground'
const panelClass = 'grid gap-5 rounded-xl border border-[var(--line)] bg-surface p-5'
const errorClass = 'text-sm text-rose-700 dark:text-rose-300'

function ButtonExample() {
  const [saved, setSaved] = useState(false)
  const [detail, setDetail] = useState(false)
  const { showToast } = useToast()

  function toggleSaved() {
    setSaved(!saved)
    showToast('success', saved ? 'Se quitó de favoritos.' : 'Se añadió a favoritos.')
  }

  return (
    <div className={panelClass}>
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={toggleSaved} aria-pressed={saved}>
          {saved ? <Check size={16} /> : <Bookmark size={16} />} Favorito
        </Button>
        <Button variant="secondary" onClick={() => setDetail(true)}>Ver detalles <ArrowUpRight size={15} /></Button>
        <Button variant="ghost" disabled={!saved} onClick={() => {
          setSaved(false)
          showToast('info', 'Se restableció el estado inicial.')
        }}>
          <RotateCcw size={15} /> Restablecer
        </Button>
      </div>
      <Dialog open={detail} onDismiss={() => setDetail(false)} title="Detalles de los controles">
        <p className="text-sm leading-relaxed text-muted">Favorito alterna entre dos estados. Restablecer se activa cuando el elemento está marcado.</p>
      </Dialog>
    </div>
  )
}

const schema = z.object({
  name: z.string().trim().min(2, 'Escribe al menos 2 caracteres.').max(60, 'Usa 60 caracteres o menos.'),
  visibility: z.enum(['Privada', 'Compartida']),
})

type Preferences = z.infer<typeof schema>

function FormExample() {
  const [value, setValue] = useState<Preferences>({ name: 'Vista principal', visibility: 'Privada' })
  const [open, setOpen] = useState(false)
  const { showToast } = useToast()
  const id = useId()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Preferences>({
    resolver: zodResolver(schema),
    defaultValues: value,
  })

  function edit() {
    reset(value)
    setOpen(true)
  }

  function save(values: Preferences) {
    setValue(values)
    setOpen(false)
    showToast('success', 'Cambios aplicados a la vista de ejemplo.')
  }

  return (
    <div className={panelClass}>
      <div className="flex flex-wrap items-center gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent"><FileSliders size={21} aria-hidden="true" /></span>
        <div className="min-w-0 flex-1">
          <p className="wrap-anywhere font-medium">{value.name}</p>
          <p className="mt-1 text-sm text-muted">Visibilidad · {value.visibility}</p>
        </div>
        <Button variant="secondary" onClick={edit}><Pencil size={15} /> Editar vista</Button>
      </div>
      <FormDrawer open={open} title="Editar vista" onDismiss={() => setOpen(false)} onSubmit={handleSubmit(save)} noValidate>
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor={`${id}-name`}>Nombre de la vista</label>
          <input {...register('name')} id={`${id}-name`} className={inputClass} required aria-invalid={Boolean(errors.name)} aria-describedby={`${id}-hint`} />
          <p id={`${id}-hint`} className={errors.name ? errorClass : 'text-sm text-muted'}>{errors.name?.message ?? 'Entre 2 y 60 caracteres.'}</p>
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor={`${id}-visibility`}>Visibilidad</label>
          <select {...register('visibility')} id={`${id}-visibility`} className={inputClass}>
            <option>Privada</option>
            <option>Compartida</option>
          </select>
        </div>
      </FormDrawer>
    </div>
  )
}

const labels = { empty: 'Vacío', loading: 'Carga', error: 'Error', success: 'Éxito' }
type StateKind = keyof typeof labels
const stateKeys: StateKind[] = ['empty', 'loading', 'error', 'success']
const messages: Record<StateKind, { title: string; description: string }> = {
  empty: { title: 'Sin elementos', description: 'Añade un elemento para probar esta colección.' },
  loading: { title: 'Cargando colección', description: 'Recuperando los elementos de la vista.' },
  error: { title: 'La colección no pudo cargarse', description: 'Puedes volver a solicitar los elementos.' },
  success: { title: 'Colección disponible', description: 'El elemento de ejemplo ya está listo.' },
}

function StateExample() {
  const [kind, setKind] = useState<StateKind>('empty')
  const [retrying, setRetrying] = useState(false)
  const [confirm, setConfirm] = useState(false)

  useEffect(() => {
    if (!retrying) return
    const timer = window.setTimeout(() => {
      setKind('success')
      setRetrying(false)
    }, 800)
    return () => window.clearTimeout(timer)
  }, [retrying])

  function switchState(state: StateKind) {
    setRetrying(false)
    setKind(state)
  }

  return (
    <div className="grid gap-4">
      <div role="group" aria-label="Estado de la colección" className="flex flex-wrap gap-1">
        {stateKeys.map((state) => (
          <Button key={state} aria-pressed={kind === state} variant={kind === state ? 'secondary' : 'ghost'} onClick={() => switchState(state)}>
            {labels[state]}
          </Button>
        ))}
      </div>
      <FeedbackState kind={kind} {...messages[kind]} action={
        <>
          {kind === 'empty' && <Button variant="secondary" onClick={() => switchState('success')}>Añadir elemento</Button>}
          {kind === 'error' && <Button variant="secondary" onClick={() => { setKind('loading'); setRetrying(true) }}>Reintentar</Button>}
          {kind === 'success' && <Button variant="secondary" onClick={() => setConfirm(true)}>Vaciar colección</Button>}
        </>
      } />
      <Dialog open={confirm} title="¿Vaciar la colección?" onDismiss={() => setConfirm(false)}>
        <p className="text-sm text-muted">Se quitará el elemento de ejemplo. Puedes volver a añadirlo desde la colección vacía.</p>
        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirm(false)}>Cancelar</Button>
          <Button onClick={() => { setConfirm(false); switchState('empty') }}>Vaciar colección</Button>
        </div>
      </Dialog>
    </div>
  )
}

export function ControlExamples({ section }: { section: ControlSection }) {
  if (section === 'formulario') return <FormExample />
  if (section === 'estados') return <StateExample />
  return <ButtonExample />
}

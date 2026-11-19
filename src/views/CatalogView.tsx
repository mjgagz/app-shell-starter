import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChartNoAxesColumn,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Component,
  GalleryVerticalEnd,
  Grid2X2,
  Layers3,
  Menu,
  Network,
  PanelRight,
  Search,
  SlidersHorizontal,
  Table2,
  X,
} from 'lucide-react'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { appConfig } from '../data/config'
import { DataExamples } from '../components/catalog/DataExamples'
import { ControlExamples } from '../components/catalog/ControlExamples'
import {
  FoundationArt,
  SpecimenPreview,
} from '../components/catalog/SpecimenPreview'
import { applicationMap, specimens } from '../data/catalog'
import type { Specimen, Section } from '../data/catalog'
import './catalog.css'

const library = [
  { id: 'resumen', title: 'Vista general', Icon: Grid2X2 },
  { id: 'fundamentos', title: 'Fundamentos', Icon: Layers3 },
  { id: 'componentes', title: 'Componentes', Icon: Component },
  { id: 'mapa', title: 'Mapa de la app', Icon: Network },
] as const
const specimenIcons = {
  controles: SlidersHorizontal,
  tabla: Table2,
  grafica: ChartNoAxesColumn,
  formulario: PanelRight,
  estados: CircleDot,
}
const pages = [
  ...library,
  ...specimens.map((item) => ({ ...item, Icon: specimenIcons[item.id] })),
]
const href = (id: Section) =>
  id === 'resumen' ? '/catalogo' : '/catalogo/' + id

function LibraryLinks({
  section,
  close,
}: {
  section: string
  close?: () => void
}) {
  return (
    <nav aria-label="Biblioteca">
      {(
        [
          ['Biblioteca', pages.slice(0, 4)],
          ['Ejemplos', pages.slice(4)],
        ] as const
      ).map(([label, items]) => {
        return (
          <div className="nav-block" key={label}>
            <h2>{label}</h2>
            {items.map(({ id, title, Icon }) => (
              <Link
                aria-current={id === section ? 'page' : undefined}
                key={id}
                to={href(id)}
                onClick={close}
              >
                <Icon size={17} />
                {title}
              </Link>
            ))}
          </div>
        )
      })}
    </nav>
  )
}

function SpecimenCards({
  items,
  heading: Heading = 'h2',
}: {
  items: readonly Specimen[]
  heading?: 'h2' | 'h3'
}) {
  return (
    <div className="specimen-grid">
      {items.map((item) => (
        <Link className="specimen-card" key={item.id} to={href(item.id)}>
          <SpecimenPreview id={item.id} />
          <div className="specimen-caption">
            <div>
              <small>{item.group}</small>
              <Heading>{item.title}</Heading>
            </div>
            <ArrowUpRight size={17} />
          </div>
        </Link>
      ))}
    </div>
  )
}

function Overview() {
  return (
    <>
      <div className="catalog-heading">
        <h1>Biblioteca de interfaces</h1>
        <p>Explora los fundamentos y componentes reutilizables de Forma.</p>
      </div>
      <section className="foundation-banner">
        <div className="banner-copy">
          <div className="banner-symbol">
            <Layers3 size={16} /> Fundamentos
          </div>
          <h2>El lenguaje visual</h2>
          <p>Color, tipografía y espaciado que dan forma a cada interfaz.</p>
          <Link to={href('fundamentos')}>
            Explorar fundamentos <ArrowRight size={15} />
          </Link>
        </div>
        <FoundationArt />
      </section>
      <div className="section-heading">
        <h2>Componentes destacados</h2>
        <Link to={href('componentes')}>
          Ver todos <ArrowRight size={15} />
        </Link>
      </div>
      <SpecimenCards items={specimens.slice(0, 3)} heading="h3" />
      <div className="section-heading">
        <h2>Guía de desarrollo</h2>
      </div>
      <Link className="map-link" to={href('mapa')}>
        <span className="map-icon">
          <Network size={23} />
        </span>
        <div>
          <h3>Mapa de una aplicación web</h3>
          <p>14 áreas de decisión, desde el producto hasta la operación.</p>
        </div>
        <ChevronRight size={19} />
      </Link>
    </>
  )
}

function Foundations() {
  return (
    <div className="foundation-list">
      <section>
        <h2>Color</h2>
        <div className="swatches">
          {[
            ['Fondo', '--canvas'],
            ['Superficie', '--surface'],
            ['Texto', '--text'],
            ['Acento', '--accent'],
          ].map(([name, token]) => (
            <div key={token}>
              <i style={{ background: 'var(' + token + ')' }} />
              <b>{name}</b>
              <code>{token}</code>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>Tipografía</h2>
        <div className="type-sample">
          Aa <span>Geist Sans</span>
        </div>
        <p>
          Usa la jerarquía de títulos para orientar la lectura. Reserva Geist
          Mono para valores, identificadores y muestras de código.
        </p>
      </section>
      <section>
        <h2>Espaciado y adaptación</h2>
        <div className="space-scale">
          {[4, 8, 12, 16, 24, 32].map((n) => (
            <span key={n}>
              <i style={{ width: n, height: n }} />
              {n} px
            </span>
          ))}
        </div>
        <p>
          Agrupa controles relacionados a 8 px y separa secciones con 24–32 px.
          En pantallas estrechas, apila los grupos y conserva controles de al
          menos 40 px de altura.
        </p>
      </section>
      <section>
        <h2>Interacción accesible</h2>
        <p>
          Usa Tab para recorrer acciones y Escape para cerrar diálogos. El foco
          es visible en ambos temas y las transiciones respetan la preferencia
          de movimiento reducido del dispositivo.
        </p>
      </section>
    </div>
  )
}

function AppMap() {
  return (
    <div className="map-list">
      {applicationMap.map(([name, rule, implementation]) => (
        <details key={name}>
          <summary>
            <span>{name}</span>
            <ChevronDown size={17} />
          </summary>
          <p>{rule}</p>
          <p>{implementation}</p>
        </details>
      ))}
    </div>
  )
}

export default function CatalogView() {
  const section = useParams().section ?? 'resumen'
  const page = pages.find((p) => p.id === section)
  const { pathname } = useLocation()
  const searchBox = useRef<HTMLDialogElement>(null)
  const menu = useRef<HTMLDialogElement>(null)
  const [query, setQuery] = useState('')
  const specimen = specimens.find((s) => s.id === section)
  const appTitle = page?.title
  useEffect(() => {
    menu.current?.close()
    searchBox.current?.close()
    document.title = (appTitle ?? 'Biblioteca') + ' · Forma'
    window.scrollTo(0, 0)
    return () => {
      document.title = appConfig.name
    }
  }, [pathname, appTitle])
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        menu.current?.close()
        setQuery('')
        searchBox.current?.showModal()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  if (!page) return <Navigate to="/catalogo" replace />
  const normalize = (s: string) =>
    s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
  const results = pages.filter((p) =>
    normalize(p.title).includes(normalize(query.trim())),
  )
  const brand = (
    <Link className="forma-brand" to="/catalogo">
      <span className="forma-mark">
        <GalleryVerticalEnd size={22} />
      </span>
      Forma
      <span className="brand-divider" /> <small>Design System</small>
    </Link>
  )
  return (
    <div className="catalog-shell">
      <a className="skip-link" href="#catalog-main">
        Saltar al contenido
      </a>
      <aside className="catalog-side">
        {brand}
        <LibraryLinks section={section} />
        <div className="side-footer">
          <span /> Biblioteca local <code>v0.1</code>
        </div>
      </aside>
      <div className="catalog-frame">
        <header className="catalog-top">
          <button
            className="mobile-menu icon-action"
            aria-label="Abrir navegación"
            onClick={() => menu.current?.showModal()}
          >
            <Menu size={19} />
          </button>
          <div className="crumb">
            <BookOpen size={16} />
            <Link to="/catalogo">Biblioteca</Link>
            <ChevronRight size={13} />
            <span>{page.title}</span>
          </div>
          <div className="top-actions">
            <button
              className="search-button"
              aria-keyshortcuts="Control+k Meta+k"
              onClick={() => {
                setQuery('')
                searchBox.current?.showModal()
              }}
            >
              <Search size={15} />
              <span className="max-[600px]:sr-only">Buscar</span>
              <kbd>
                {/Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl'} K
              </kbd>
            </button>
            <ThemeToggle />
            <Link className="open-app" to="/">
              Abrir app <ArrowUpRight size={14} />
            </Link>
          </div>
        </header>
        <main id="catalog-main" tabIndex={-1} className="catalog-main">
          {section === 'resumen' ? (
            <Overview />
          ) : (
            <>
              <div className="catalog-heading">
                <h1>{page.title}</h1>
                <p>
                  {specimen?.description ??
                    (
                      {
                        fundamentos:
                          'Reglas visuales compartidas por el catálogo y la aplicación.',
                        componentes:
                          'Selecciona un componente para probar su comportamiento.',
                        mapa: 'Consulta los criterios de la plantilla y las decisiones que corresponden a cada producto.',
                      } as Record<string, string>
                    )[section]}
                </p>
              </div>
              {section === 'fundamentos' && <Foundations />}
              {section === 'componentes' && <SpecimenCards items={specimens} />}
              {section === 'mapa' && <AppMap />}
              {specimen && (
                <div className="live-example">
                  {specimen.id === 'tabla' || specimen.id === 'grafica' ? (
                    <DataExamples section={specimen.id} />
                  ) : (
                    <ControlExamples key={specimen.id} section={specimen.id} />
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
      <dialog
        className="forma-dialog menu-dialog"
        ref={menu}
        aria-label="Navegación de la biblioteca"
      >
        <button
          className="dialog-close icon-action"
          aria-label="Cerrar navegación"
          onClick={() => menu.current?.close()}
        >
          <X size={19} />
        </button>
        {brand}
        <LibraryLinks section={section} close={() => menu.current?.close()} />
      </dialog>
      <dialog
        className="forma-dialog search-dialog"
        ref={searchBox}
        aria-label="Buscar en la biblioteca"
      >
        <div className="search-field">
          <Search size={20} />
          <input
            aria-label="Buscar páginas"
            placeholder="Buscar en la biblioteca…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="icon-action"
            aria-label="Cerrar búsqueda"
            onClick={() => searchBox.current?.close()}
          >
            <X size={18} />
          </button>
        </div>
        <div className="search-results">
          {results.length ? (
            results.map(({ id, title, Icon }) => (
              <Link
                key={id}
                to={href(id)}
                onClick={() => searchBox.current?.close()}
              >
                <Icon size={17} />
                {title}
                <ArrowUpRight size={14} />
              </Link>
            ))
          ) : (
            <p>Sin resultados para «{query}».</p>
          )}
        </div>
      </dialog>
    </div>
  )
}

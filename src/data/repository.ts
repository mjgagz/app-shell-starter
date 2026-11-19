import type { BaseEntity } from '../domain/types'

export interface CrudRepository<T extends BaseEntity> {
  getAll(): Promise<T[]>
  getById(id: string): Promise<T | null>
  create(entity: T): Promise<T>
  update(id: string, changes: Partial<Omit<T, 'id'>>): Promise<T | null>
  delete(id: string): Promise<boolean>
}

export class LocalStorageRepository<T extends BaseEntity> implements CrudRepository<T> {
  constructor(
    private readonly key: string,
    private readonly isEntity: (value: unknown) => value is T,
    private readonly storage: Pick<Storage, 'getItem' | 'setItem'> = localStorage,
  ) {}

  private read(): T[] {
    const raw = this.storage.getItem(this.key)
    if (raw === null) return []

    const entries: unknown = JSON.parse(raw)
    if (!Array.isArray(entries) || !entries.every(this.isEntity)) {
      throw new Error(`Formato inválido en el almacenamiento: ${this.key}`)
    }

    return entries
  }

  private write(entries: T[]): void {
    this.storage.setItem(this.key, JSON.stringify(entries))
  }

  async getAll(): Promise<T[]> {
    return this.read()
  }

  async getById(id: string): Promise<T | null> {
    return this.read().find((entry) => entry.id === id) ?? null
  }

  async create(entity: T): Promise<T> {
    const entries = this.read()
    if (entries.some((entry) => entry.id === entity.id)) {
      throw new Error(`Ya existe un registro con el ID ${entity.id}`)
    }

    this.write([...entries, entity])
    return entity
  }

  async update(id: string, changes: Partial<Omit<T, 'id'>>): Promise<T | null> {
    const entries = this.read()
    const index = entries.findIndex((entry) => entry.id === id)
    if (index === -1) return null

    const updated = { ...entries[index], ...changes, id }
    entries[index] = updated
    this.write(entries)
    return updated
  }

  async delete(id: string): Promise<boolean> {
    const entries = this.read()
    const remaining = entries.filter((entry) => entry.id !== id)
    if (entries.length === remaining.length) return false

    this.write(remaining)
    return true
  }
}

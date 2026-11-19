import type { BaseEntity } from '../domain/types'
import type { CrudRepository } from './repository'

export class RepositoryHttpError extends Error {
  constructor(readonly status: number, method: string) {
    super(`La petición ${method} devolvió HTTP ${status}.`)
    this.name = 'RepositoryHttpError'
  }
}

export class RestRepository<T extends BaseEntity> implements CrudRepository<T> {
  private readonly collectionUrl: string

  constructor(
    collectionUrl: string,
    private readonly isEntity: (value: unknown) => value is T,
    private readonly fetcher: typeof fetch = fetch,
  ) {
    const path = collectionUrl.trim().replace(/\/+$/, '')
    if (!path || /[?#]/u.test(path)) {
      throw new TypeError('Se requiere la ruta de una colección sin consulta ni fragmento.')
    }
    this.collectionUrl = path
  }

  private itemUrl(id: string): string {
    if (!id || id === '.' || id === '..') throw new TypeError('El ID no identifica un recurso.')
    return `${this.collectionUrl}/${encodeURIComponent(id)}`
  }

  private request(url: string, method: string, body?: unknown): Promise<Response> {
    const headers = new Headers({ Accept: 'application/json' })
    if (body !== undefined) headers.set('Content-Type', 'application/json')
    return this.fetcher(url, { method, headers, body: JSON.stringify(body) })
  }

  private check(response: Response, method: string): void {
    if (!response.ok) throw new RepositoryHttpError(response.status, method)
  }

  private async entity(response: Response, method: string, expectedId: string): Promise<T> {
    this.check(response, method)
    const value: unknown = await response.json()
    if (!this.isEntity(value) || value.id !== expectedId) {
      throw new TypeError('La API devolvió una entidad con formato o ID inesperado.')
    }
    return value
  }

  async getAll(): Promise<T[]> {
    const response = await this.request(this.collectionUrl, 'GET')
    this.check(response, 'GET')
    const value: unknown = await response.json()
    if (!Array.isArray(value) || !value.every(this.isEntity)) {
      throw new TypeError('La API devolvió una colección con formato inesperado.')
    }
    return value
  }

  async getById(id: string): Promise<T | null> {
    const response = await this.request(this.itemUrl(id), 'GET')
    return response.status === 404 ? null : this.entity(response, 'GET', id)
  }

  async create(entity: T): Promise<T> {
    const response = await this.request(this.collectionUrl, 'POST', entity)
    return this.entity(response, 'POST', entity.id)
  }

  async update(id: string, changes: Partial<Omit<T, 'id'>>): Promise<T | null> {
    const body = { ...changes }
    if ('id' in body) delete body.id
    const response = await this.request(this.itemUrl(id), 'PATCH', body)
    return response.status === 404 ? null : this.entity(response, 'PATCH', id)
  }

  async delete(id: string): Promise<boolean> {
    const response = await this.request(this.itemUrl(id), 'DELETE')
    if (response.status === 404) return false
    this.check(response, 'DELETE')
    return true
  }
}

import { expect, test } from '@playwright/test'

test('el menú móvil abre la tabla y los filtros reinician la paginación', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 })
  await page.goto('/catalogo')
  await page.getByRole('button', { name: 'Abrir navegación' }).click()
  await page.getByRole('dialog').getByRole('link', { name: 'Tabla de datos' }).click()
  await page.getByRole('button', { name: 'Página siguiente' }).click()
  await expect(page.getByText('5–8 de 8')).toBeVisible()
  await page.getByLabel('Filtrar por estado').selectOption('En revisión')
  await expect(page.getByText('1–3 de 3')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Página anterior' })).toBeDisabled()
})

test('el formulario conserva el último valor válido al cancelar', async ({ page }) => {
  await page.goto('/catalogo/formulario')
  await page.getByRole('button', { name: 'Editar vista' }).click()
  await page.getByLabel('Nombre de la vista').fill('x')
  await page.getByRole('button', { name: 'Guardar cambios' }).click()
  await expect(page.getByText('Escribe al menos 2 caracteres.')).toBeVisible()
  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: 'Editar vista' }).click()
  await expect(page.getByLabel('Nombre de la vista')).toHaveValue('Vista principal')
})

for (const role of ['lector', 'editor'] as const) {
  test('la ruta de configuración respeta el rol ' + role + ' tras recargar', async ({ page }) => {
    await page.goto('/settings')
    await page.getByLabel('Nombre', { exact: true }).fill('Demo')
    await page.getByLabel('Correo electrónico').fill('demo@example.test')
    await page.getByLabel('Permisos de prueba').selectOption(role)
    await page.getByRole('button', { name: 'Entrar' }).click()
    const destination = role === 'editor' ? '/settings' : '/'
    await expect(page).toHaveURL(destination)
    await page.reload()
    await expect(page.getByRole('button', { name: 'Cerrar sesión' })).toBeVisible()
    await expect(page).toHaveURL(destination)
  })
}

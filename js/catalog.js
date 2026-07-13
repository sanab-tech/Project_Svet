let activeCategory = 'all'

function getCategories(products) {
  return ['all', ...new Set(products.map((p) => p.category))]
}

function renderFilters(products) {
  const root = document.getElementById('catalog-filters')
  const categories = getCategories(products)
  root.innerHTML = categories
    .map((cat) => {
      const label = cat === 'all' ? 'Все' : cat
      const active = activeCategory === cat ? 'is-active' : ''
      return `<button type="button" class="catalog-filter ${active}" data-category="${escapeHtml(cat)}">${escapeHtml(label)}</button>`
    })
    .join('')
}

function renderCatalog() {
  const products = Store.getProducts()
  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory)

  renderFilters(products)
  document.getElementById('catalog-empty').hidden = filtered.length > 0
  document.getElementById('catalog-grid').innerHTML = filtered
    .map((p, i) => renderProductCard(p, { fadeDelay: i * 60 }))
    .join('')
  observeFadeIns()
}

document.addEventListener('DOMContentLoaded', () => {
  renderCatalog()
  document.getElementById('catalog-filters').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-category]')
    if (!btn) return
    activeCategory = btn.dataset.category
    renderCatalog()
  })
})

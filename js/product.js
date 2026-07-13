function getQueryId() {
  return new URLSearchParams(location.search).get('id')
}

function renderProductPage() {
  const root = document.getElementById('product-page')
  const product = Store.getProductById(getQueryId())

  if (!product) {
    root.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">Товар не найден</h1>
        <p class="page-subtitle">Возможно, десерт удалили из ассортимента.</p>
        <a href="catalog.html" class="btn-primary">В каталог</a>
      </div>`
    return
  }

  document.title = `${product.name} — Изюмка С`

  root.innerHTML = `
    <nav class="breadcrumbs fade-in" aria-label="Хлебные крошки">
      <a href="index.html">Главная</a>
      <span>/</span>
      <a href="catalog.html">Каталог</a>
      <span>/</span>
      <span>${escapeHtml(product.name)}</span>
    </nav>

    <div class="product-detail fade-in">
      <div class="product-detail__gallery card-bakery">
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" width="${product.width}" height="${product.height}">
      </div>
      <div class="product-detail__info">
        <span class="product-card__category">${escapeHtml(product.category)}</span>
        <h1 class="product-detail__title">${escapeHtml(product.name)}</h1>
        <p class="product-detail__price">${Store.formatPrice(product.price)}</p>
        <p class="product-detail__text">${escapeHtml(product.description)}</p>
        <ul class="product-detail__specs">
          ${product.weight ? `<li><strong>Вес / объём:</strong> ${escapeHtml(product.weight)}</li>` : ''}
          ${product.ingredients ? `<li><strong>Состав:</strong> ${escapeHtml(product.ingredients)}</li>` : ''}
          <li><strong>Наличие:</strong> ${product.inStock ? 'В наличии' : 'Под заказ'}</li>
        </ul>
        <div class="product-detail__actions">
          <label class="qty-field">
            <span>Кол-во</span>
            <input type="number" id="product-qty" min="1" max="20" value="1">
          </label>
          <button type="button" class="btn-primary" data-add-to-cart="${escapeHtml(product.id)}" data-label="В корзину">В корзину</button>
          <a href="cart.html" class="btn-outline">Перейти в корзину</a>
        </div>
      </div>
    </div>
  `

  observeFadeIns()
}

document.addEventListener('DOMContentLoaded', renderProductPage)

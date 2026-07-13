/**
 * Общий хедер/футер и действия магазина.
 * Если в HTML уже есть разметка — только усиливает её (корзина, меню).
 * Если пусто — рисует с нуля (запасной вариант).
 */
const ICONS = {
  vk: `<svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.049 2.303 3.847 2.896 3.847.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.49-.085.744-.576.744z"/></svg>`,
  cart: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 8h14M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"/></svg>`,
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function currentPage() {
  const path = location.pathname || ''
  const file = (path.split('/').pop() || '').toLowerCase()
  if (!file || file === 'project_svet') return 'index.html'
  return file
}

function getHeaderHtml(cartCount) {
  const page = currentPage()
  const links = (SITE_DATA && SITE_DATA.navLinks) || [
    { label: 'Главная', href: 'index.html' },
    { label: 'Каталог', href: 'catalog.html' },
    { label: 'Доставка', href: 'delivery.html' },
  ]
  const brand = (SITE_DATA && SITE_DATA.brand && SITE_DATA.brand.name) || 'Изюмка С'
  const nav = links
    .map((link) => {
      const active = page === String(link.href).toLowerCase()
      return `<li><a href="${link.href}" class="${active ? 'is-active' : ''}">${escapeHtml(link.label)}</a></li>`
    })
    .join('')

  return `
    <div class="container">
      <nav class="header__inner" aria-label="Основная навигация">
        <a href="index.html" class="header__logo">${escapeHtml(brand)}</a>
        <ul class="nav-desktop">${nav}</ul>
        <div class="header__actions">
          <a href="cart.html" class="header__cart" aria-label="Корзина">
            ${ICONS.cart}
            <span class="header__cart-count" id="cart-count"${cartCount ? '' : ' hidden'}>${cartCount || 0}</span>
          </a>
          <a href="catalog.html" class="btn-primary header__cta">В каталог</a>
          <button class="burger" id="burger" type="button" aria-label="Открыть меню" aria-expanded="false" aria-controls="nav-mobile">
            <span class="burger__lines" aria-hidden="true"><span></span><span></span><span></span></span>
          </button>
        </div>
      </nav>
      <nav class="nav-mobile" id="nav-mobile" aria-label="Мобильное меню">
        <ul>${nav}<li><a href="cart.html">Корзина (${cartCount || 0})</a></li><li><a href="admin.html">Админка</a></li></ul>
        <a href="catalog.html" class="btn-primary">Смотреть каталог</a>
      </nav>
    </div>
  `
}

function getFooterHtml() {
  const brand = (SITE_DATA && SITE_DATA.brand) || { name: 'Изюмка С', tagline: 'Домашние десерты с любовью' }
  const links = (SITE_DATA && SITE_DATA.footerLinks) || [
    { label: 'Каталог', href: 'catalog.html' },
    { label: 'Доставка', href: 'delivery.html' },
    { label: 'Политика конфиденциальности', href: 'privacy.html' },
    { label: 'Публичная оферта', href: 'offer.html' },
  ]
  const nav = links
    .map((link) => `<li><a href="${link.href}">${escapeHtml(link.label)}</a></li>`)
    .join('')

  return `
    <div class="container footer__inner">
      <div class="footer__top">
        <div class="footer__brand">
          <p class="footer__name">${escapeHtml(brand.name)}</p>
          <p class="footer__tagline">${escapeHtml(brand.tagline)}</p>
        </div>
        <nav class="footer__nav" aria-label="Навигация в подвале">
          <ul>${nav}</ul>
        </nav>
      </div>
      <div class="footer__bottom">
        <p>© ${new Date().getFullYear()} ${escapeHtml(brand.name)}. Все права защищены.</p>
        <p><a href="admin.html" class="footer__admin-link">Админка</a></p>
      </div>
    </div>
  `
}

function renderHeader() {
  const mount = document.getElementById('site-header')
  if (!mount) return
  const cartCount = typeof Store !== 'undefined' ? Store.getCartCount() : 0
  mount.innerHTML = getHeaderHtml(cartCount)
  initMobileMenu()
}

function renderFooter() {
  const mount = document.getElementById('site-footer')
  if (!mount) return
  mount.innerHTML = getFooterHtml()
}

function updateCartBadge() {
  const count = typeof Store !== 'undefined' ? Store.getCartCount() : 0
  const badge = document.getElementById('cart-count')
  if (badge) {
    badge.textContent = String(count)
    badge.hidden = count === 0
  }
  const mobileCart = document.querySelector('#nav-mobile a[href="cart.html"]')
  if (mobileCart) mobileCart.textContent = `Корзина (${count})`
}

function setMobileMenuOpen(isOpen) {
  const burger = document.getElementById('burger')
  const mobileNav = document.getElementById('nav-mobile')
  if (!burger || !mobileNav) return
  burger.classList.toggle('is-open', isOpen)
  mobileNav.classList.toggle('is-open', isOpen)
  burger.setAttribute('aria-expanded', String(isOpen))
  burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню')
  document.body.classList.toggle('menu-open', isOpen)
}

function initMobileMenu() {
  const burger = document.getElementById('burger')
  const mobileNav = document.getElementById('nav-mobile')
  if (!burger || !mobileNav) return

  burger.onclick = () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true'
    setMobileMenuOpen(!isOpen)
  }

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMobileMenuOpen(false))
  })
}

function renderProductCard(product, options) {
  options = options || {}
  const showAdd = options.showAdd !== false
  const fadeDelay = options.fadeDelay || 0
  const stock = product.inStock
    ? '<span class="product-card__stock">В наличии</span>'
    : '<span class="product-card__stock product-card__stock--out">Под заказ</span>'

  return `
    <article class="card-bakery product-card fade-in" style="transition-delay: ${fadeDelay}ms">
      <a class="product-card__media" href="product.html?id=${encodeURIComponent(product.id)}">
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" width="${product.width}" height="${product.height}" loading="lazy" decoding="async">
      </a>
      <div class="product-card__body">
        <div class="product-card__meta">
          <span class="product-card__category">${escapeHtml(product.category)}</span>
          ${stock}
        </div>
        <h3 class="product-card__title">
          <a href="product.html?id=${encodeURIComponent(product.id)}">${escapeHtml(product.name)}</a>
        </h3>
        <p class="product-card__desc">${escapeHtml(product.shortDescription)}</p>
        <div class="product-card__footer">
          <span class="product-card__price">${Store.formatPrice(product.price)}</span>
          ${
            showAdd
              ? `<button type="button" class="btn-primary product-card__btn" data-add-to-cart="${escapeHtml(product.id)}">В корзину</button>`
              : `<a class="btn-outline product-card__btn" href="product.html?id=${encodeURIComponent(product.id)}">Подробнее</a>`
          }
        </div>
      </div>
    </article>
  `
}

function bindAddToCart(root) {
  root = root || document
  root.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-add-to-cart]')
    if (!btn || typeof Store === 'undefined') return
    const id = btn.dataset.addToCart
    const qtyInput = document.getElementById('product-qty')
    const qty = qtyInput ? Number(qtyInput.value) || 1 : 1
    Store.addToCart(id, qty)
    updateCartBadge()
    const label = btn.dataset.label || 'В корзину'
    btn.textContent = 'Добавлено'
    setTimeout(() => {
      btn.textContent = label
    }, 1200)
  })
}

let scrollObserver = null

function observeFadeIns() {
  if (!scrollObserver) {
    scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            scrollObserver.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '-60px', threshold: 0.1 }
    )
  }
  document.querySelectorAll('.fade-in:not(.is-visible)').forEach((el) => {
    scrollObserver.observe(el)
  })
}

function ensureTrailingSlashForPages() {
  try {
    const path = location.pathname
    if (
      location.protocol.indexOf('http') === 0 &&
      path &&
      path.slice(-1) !== '/' &&
      path.toLowerCase().indexOf('.html') === -1 &&
      path.toLowerCase().indexOf('.') === -1
    ) {
      location.replace(path + '/' + location.search + location.hash)
    }
  } catch (e) {
    /* ignore */
  }
}

function initLayout() {
  try {
    ensureTrailingSlashForPages()
    renderHeader()
    renderFooter()
    updateCartBadge()
    bindAddToCart()
    document.addEventListener('cart:updated', updateCartBadge)
  } catch (err) {
    console.error('Ошибка инициализации layout:', err)
  }
}

function onReady(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn)
  } else {
    fn()
  }
}

onReady(initLayout)

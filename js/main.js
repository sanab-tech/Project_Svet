const ICONS = {
  instagram: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
  telegram: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
  whatsapp: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
}

function renderStars(count) {
  const star = `<svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`
  return `<div class="stars" aria-label="${count} из 5 звёзд">${star.repeat(count)}</div>`
}

function renderNav() {
  const { brand, navLinks } = SITE_DATA

  document.getElementById('brand-name').textContent = brand.name
  document.getElementById('footer-brand-name').textContent = brand.name
  document.getElementById('footer-brand-copy').textContent = brand.name
  document.getElementById('footer-tagline').textContent = brand.tagline
  document.getElementById('hero-title').textContent = brand.name
  document.getElementById('hero-tagline').textContent = brand.tagline
  document.getElementById('hero-desc').textContent = brand.description

  const navHtml = navLinks.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join('')
  document.getElementById('nav-desktop').innerHTML = navHtml
  document.getElementById('nav-mobile-list').innerHTML = navHtml
  document.getElementById('footer-nav').innerHTML = navHtml
}

function renderCatalog() {
  const grid = document.getElementById('catalog-grid')
  grid.innerHTML = SITE_DATA.desserts.map((d, i) => `
    <article class="card-bakery catalog-card fade-in" style="transition-delay: ${i * 80}ms">
      <div class="catalog-card__image">
        <img src="${d.image}" alt="${d.name}" loading="lazy">
      </div>
      <div class="catalog-card__body">
        <div class="catalog-card__head">
          <h3 class="catalog-card__title">${d.name}</h3>
          <span class="catalog-card__price">${d.price}</span>
        </div>
        <p class="catalog-card__desc">${d.description}</p>
      </div>
    </article>
  `).join('')
}

function renderSteps() {
  const grid = document.getElementById('steps-grid')
  grid.innerHTML = SITE_DATA.orderSteps.map((s, i) => `
    <div class="card-bakery step-card fade-in" style="transition-delay: ${i * 120}ms">
      <span class="step-card__num">${s.step}</span>
      <h3 class="step-card__title">${s.title}</h3>
      <p class="step-card__desc">${s.description}</p>
    </div>
  `).join('')
}

function renderReviews() {
  const grid = document.getElementById('reviews-grid')
  grid.innerHTML = SITE_DATA.reviews.map((r, i) => `
    <blockquote class="card-bakery review-card fade-in" style="transition-delay: ${i * 100}ms">
      ${renderStars(r.rating)}
      <p class="review-card__text">«${r.text}»</p>
      <footer class="review-card__footer">
        <div class="review-card__avatar">${r.name.charAt(0)}</div>
        <cite class="review-card__name">${r.name}</cite>
      </footer>
    </blockquote>
  `).join('')
}

function renderSocial() {
  const list = document.getElementById('social-links')
  list.innerHTML = SITE_DATA.socialLinks.map((link) => `
    <a class="social-link" href="${link.href}" target="_blank" rel="noopener noreferrer">
      <span class="social-link__icon">${ICONS[link.icon]}</span>
      <span>${link.name}</span>
      <svg class="social-link__arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
      </svg>
    </a>
  `).join('')
}

function initMobileMenu() {
  const burger = document.getElementById('burger')
  const mobileNav = document.getElementById('nav-mobile')

  burger.addEventListener('click', () => {
    burger.classList.toggle('is-open')
    mobileNav.classList.toggle('is-open')
  })

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      burger.classList.remove('is-open')
      mobileNav.classList.remove('is-open')
    })
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

function initForm() {
  const form = document.getElementById('contact-form')
  const success = document.getElementById('form-success')

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    form.hidden = true
    success.hidden = false
  })
}

function initFooterYear() {
  document.getElementById('footer-year').textContent = new Date().getFullYear()
}

document.addEventListener('DOMContentLoaded', () => {
  renderNav()
  renderCatalog()
  renderSteps()
  renderReviews()
  renderSocial()
  initMobileMenu()
  observeFadeIns()
  initForm()
  initFooterYear()
})

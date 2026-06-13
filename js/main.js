const ICONS = {
  vk: `<svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.049 2.303 3.847 2.896 3.847.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.49-.085.744-.576.744z"/></svg>`,
}

function renderStars(count) {
  const star = `<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`
  return `<div class="stars" aria-label="${count} из 5 звёзд">${star.repeat(count)}</div>`
}

function renderAbout() {
  const { about } = SITE_DATA

  document.getElementById('about-stat-num').textContent = about.stat.num
  document.getElementById('about-stat-label').textContent = about.stat.label

  document.getElementById('about-content').innerHTML = `
    <span class="section-label section-label--blush" id="about-heading">${about.label}</span>
    ${about.paragraphs.map((text, i) => `
      <p class="about__text${i > 0 ? ' about__text--second' : ''}">${text}</p>
    `).join('')}
    <ul class="about__highlights">
      ${about.highlights.map((item) => `
        <li class="about__highlight card-bakery">
          <span class="about__highlight-icon" aria-hidden="true">${item.icon}</span>
          <span class="about__highlight-text">${item.text}</span>
        </li>
      `).join('')}
    </ul>
    <p class="about__closing">${about.closing}</p>
  `
}

function renderNav() {
  const { brand } = SITE_DATA

  document.getElementById('brand-name').textContent = brand.name
  document.getElementById('footer-brand-name').textContent = brand.name
  document.getElementById('footer-brand-copy').textContent = brand.name
  document.getElementById('footer-tagline').textContent = brand.tagline
  document.getElementById('hero-image').src = SITE_DATA.images.hero
  document.getElementById('about-image').src = SITE_DATA.images.about
  document.getElementById('hero-title').textContent = brand.name
  document.getElementById('hero-tagline').textContent = brand.tagline
  document.getElementById('hero-desc').textContent = brand.description
}

function renderCatalog() {
  const grid = document.getElementById('catalog-grid')
  grid.innerHTML = SITE_DATA.desserts
    .map((d, i) => `
    <article class="card-bakery catalog-card fade-in" style="transition-delay: ${i * 80}ms">
      <div class="catalog-card__image">
        <img
          src="${d.image}"
          alt="${d.name}"
          width="${d.width}"
          height="${d.height}"
          loading="lazy"
          decoding="async"
        >
      </div>
      <div class="catalog-card__body">
        <div class="catalog-card__head">
          <h3 class="catalog-card__title">${d.name}</h3>
          <span class="catalog-card__price">${d.price}</span>
        </div>
        <p class="catalog-card__desc">${d.description}</p>
      </div>
    </article>
  `)
    .join('')

  observeFadeIns()
}

function renderSteps() {
  const grid = document.getElementById('steps-grid')
  grid.innerHTML = SITE_DATA.orderSteps
    .map(
      (s, i) => `
    <div class="card-bakery step-card fade-in" style="transition-delay: ${i * 120}ms">
      <span class="step-card__num">${s.step}</span>
      <h3 class="step-card__title">${s.title}</h3>
      <p class="step-card__desc">${s.description}</p>
    </div>
  `
    )
    .join('')
}

function renderReviews() {
  const grid = document.getElementById('reviews-grid')
  grid.innerHTML = SITE_DATA.reviews
    .map(
      (r, i) => `
    <blockquote class="card-bakery review-card fade-in" style="transition-delay: ${i * 100}ms">
      ${renderStars(r.rating)}
      <p class="review-card__text">«${r.text}»</p>
      <footer class="review-card__footer">
        <div class="review-card__avatar" aria-hidden="true">${r.name.charAt(0)}</div>
        <cite class="review-card__name">${r.name}</cite>
      </footer>
    </blockquote>
  `
    )
    .join('')
}

function renderSocial() {
  const list = document.getElementById('social-links')
  list.innerHTML = SITE_DATA.socialLinks
    .map(
      (link) => `
    <a class="social-link" href="${link.href}" target="_blank" rel="noopener noreferrer">
      <span class="social-link__icon">${ICONS[link.icon]}</span>
      <span>${link.name}</span>
      <svg class="social-link__arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
      </svg>
    </a>
  `
    )
    .join('')
}

function renderNavigationLists() {
  const { navLinks } = SITE_DATA
  const navHtml = navLinks.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join('')
  document.getElementById('nav-desktop').innerHTML = navHtml
  document.getElementById('nav-mobile-list').innerHTML = navHtml
  document.getElementById('footer-nav').innerHTML = navHtml
}

function setMobileMenuOpen(isOpen) {
  const burger = document.getElementById('burger')
  const mobileNav = document.getElementById('nav-mobile')

  burger.classList.toggle('is-open', isOpen)
  mobileNav.classList.toggle('is-open', isOpen)
  burger.setAttribute('aria-expanded', String(isOpen))
  burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню')
  document.body.classList.toggle('menu-open', isOpen)
}

function initMobileMenu() {
  const burger = document.getElementById('burger')
  const mobileNav = document.getElementById('nav-mobile')

  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true'
    setMobileMenuOpen(!isOpen)
  })

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMobileMenuOpen(false))
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      setMobileMenuOpen(false)
      burger.focus()
    }
  })

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) setMobileMenuOpen(false)
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

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return true
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()

  try {
    const copied = document.execCommand('copy')
    document.body.removeChild(textarea)
    return copied
  } catch {
    document.body.removeChild(textarea)
    return false
  }
}

function initForm() {
  const form = document.getElementById('contact-form')
  const feedback = document.getElementById('form-feedback')
  const fallback = document.getElementById('form-fallback')
  const fallbackText = document.getElementById('form-fallback-text')
  const { vk } = SITE_DATA

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const name = form.name.value.trim()
    const message = form.message.value.trim()
    const text = `Здравствуйте! Меня зовут ${name}.\n\n${message}`

    let copied = false
    try {
      copied = await copyToClipboard(text)
    } catch {
      copied = false
    }

    window.open(vk.messagesUrl, '_blank', 'noopener,noreferrer')

    feedback.hidden = false
    feedback.classList.toggle('form-feedback--success', copied)
    feedback.classList.toggle('form-feedback--warning', !copied)

    if (copied) {
      feedback.innerHTML = `
        <p class="form-feedback__title">Сообщение скопировано</p>
        <p class="form-feedback__text">
          Открылся чат группы ВКонтакте. Вставьте текст (<kbd>Ctrl</kbd>+<kbd>V</kbd>) и нажмите «Отправить».
        </p>
      `
      fallback.hidden = true
    } else {
      feedback.innerHTML = `
        <p class="form-feedback__title">Скопируйте сообщение вручную</p>
        <p class="form-feedback__text">
          Не удалось скопировать текст автоматически. Выделите его ниже, скопируйте и вставьте в чат ВКонтакте.
        </p>
      `
      fallback.hidden = false
      fallbackText.value = text
      fallbackText.focus()
      fallbackText.select()
    }

    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  })
}

function initSchema() {
  const { brand, vk } = SITE_DATA
  const script = document.getElementById('schema-json')

  script.textContent = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'Bakery',
      name: brand.name,
      description: brand.description,
      slogan: brand.tagline,
      url: vk.groupUrl,
      sameAs: [vk.groupUrl],
      servesCuisine: 'Dessert',
      priceRange: '₽₽',
    },
    null,
    2
  )
}

function initFooterYear() {
  document.getElementById('footer-year').textContent = new Date().getFullYear()
}

document.addEventListener('DOMContentLoaded', () => {
  renderNav()
  renderAbout()
  renderNavigationLists()
  renderCatalog()
  renderSteps()
  renderReviews()
  renderSocial()
  initMobileMenu()
  observeFadeIns()
  initForm()
  initSchema()
  initFooterYear()
})

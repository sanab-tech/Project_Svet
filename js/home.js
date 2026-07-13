function renderStars(count) {
  const star = `<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`
  return `<div class="stars" aria-label="${count} из 5 звёзд">${star.repeat(count)}</div>`
}

function renderAbout() {
  const { about, brand } = SITE_DATA
  document.getElementById('hero-desc').textContent = brand.description
  document.getElementById('hero-title').textContent = brand.name
  document.getElementById('hero-tagline').textContent = brand.tagline
  document.getElementById('about-stat-num').textContent = about.stat.num
  document.getElementById('about-stat-label').textContent = about.stat.label
  document.getElementById('hero-image').src = SITE_DATA.images.hero
  document.getElementById('about-image').src = SITE_DATA.images.about

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

function renderFeatured() {
  const grid = document.getElementById('featured-grid')
  const products = Store.getProducts().slice(0, 3)
  grid.innerHTML = products.map((p, i) => renderProductCard(p, { fadeDelay: i * 80 })).join('')
  observeFadeIns()
}

function renderSteps() {
  document.getElementById('steps-grid').innerHTML = SITE_DATA.orderSteps
    .map(
      (s, i) => `
    <div class="card-bakery step-card fade-in" style="transition-delay: ${i * 120}ms">
      <span class="step-card__num">${s.step}</span>
      <h3 class="step-card__title">${s.title}</h3>
      <p class="step-card__desc">${s.description}</p>
    </div>`
    )
    .join('')
}

function renderReviews() {
  document.getElementById('reviews-grid').innerHTML = SITE_DATA.reviews
    .map(
      (r, i) => `
    <blockquote class="card-bakery review-card fade-in" style="transition-delay: ${i * 100}ms">
      ${renderStars(r.rating)}
      <p class="review-card__text">«${escapeHtml(r.text)}»</p>
      <footer class="review-card__footer">
        <div class="review-card__avatar" aria-hidden="true">${escapeHtml(r.name.charAt(0))}</div>
        <cite class="review-card__name">${escapeHtml(r.name)}</cite>
      </footer>
    </blockquote>`
    )
    .join('')
}

document.addEventListener('DOMContentLoaded', () => {
  renderAbout()
  renderFeatured()
  renderSteps()
  renderReviews()
  observeFadeIns()
})

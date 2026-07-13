(() => {
  const loginScreen = document.getElementById('login-screen')
  const adminApp = document.getElementById('admin-app')
  const loginForm = document.getElementById('login-form')
  const loginError = document.getElementById('login-error')
  const logoutBtn = document.getElementById('logout-btn')
  const ordersBadge = document.getElementById('orders-badge')
  const ordersList = document.getElementById('orders-list')
  const ordersEmpty = document.getElementById('orders-empty')
  const catalogList = document.getElementById('admin-catalog-list')
  const catalogEmpty = document.getElementById('catalog-empty')
  const dessertForm = document.getElementById('dessert-form')
  const dessertAddBtn = document.getElementById('dessert-add-btn')
  const dessertCancelBtn = document.getElementById('dessert-cancel-btn')
  const dessertPreview = document.getElementById('dessert-preview')
  const dessertPreviewImg = document.getElementById('dessert-preview-img')
  const dessertFile = document.getElementById('dessert-file')

  let orderFilter = 'all'
  let pendingImageDataUrl = ''

  function showApp(loggedIn) {
    loginScreen.hidden = loggedIn
    adminApp.hidden = !loggedIn
    if (loggedIn) {
      renderOrders()
      renderCatalog()
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleString('ru-RU', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return iso
    }
  }

  function setTab(tab) {
    document.querySelectorAll('.admin-tab').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.tab === tab)
    })
    document.getElementById('panel-orders').hidden = tab !== 'orders'
    document.getElementById('panel-catalog').hidden = tab !== 'catalog'
  }

  function renderOrders() {
    const orders = Store.getOrders()
    const newCount = orders.filter((o) => o.status === 'new').length
    ordersBadge.textContent = String(newCount)

    const filtered = orderFilter === 'all'
      ? orders
      : orders.filter((o) => o.status === orderFilter)

    ordersEmpty.hidden = filtered.length > 0
    ordersList.innerHTML = filtered
      .map((order) => {
        const statusMeta = Store.ORDER_STATUSES[order.status] || Store.ORDER_STATUSES.new
        const itemsHtml = (order.items || [])
          .map((item) => `<li>${escapeHtml(item.name)} × ${item.quantity} — ${escapeHtml(item.price)}</li>`)
          .join('')
        const statusOptions = Object.entries(Store.ORDER_STATUSES)
          .map(
            ([value, meta]) =>
              `<option value="${value}" ${order.status === value ? 'selected' : ''}>${meta.label}</option>`
          )
          .join('')

        return `
          <article class="card-bakery admin-order" data-order-id="${escapeHtml(order.id)}">
            <div class="admin-order__top">
              <div>
                <h3 class="admin-order__name">${escapeHtml(order.customerName)}</h3>
                <p class="admin-order__meta">
                  ${formatDate(order.createdAt)}
                  ${order.phone ? ` · <a href="tel:${escapeHtml(order.phone)}">${escapeHtml(order.phone)}</a>` : ''}
                </p>
              </div>
              <span class="admin-status admin-status--${statusMeta.color}">${statusMeta.label}</span>
            </div>
            <ul class="admin-order__items">${itemsHtml || '<li>Без позиций</li>'}</ul>
            ${order.comment ? `<p class="admin-order__comment"><strong>Комментарий:</strong> ${escapeHtml(order.comment)}</p>` : ''}
            <div class="admin-order__actions">
              <label class="visually-hidden" for="status-${escapeHtml(order.id)}">Статус заказа</label>
              <select id="status-${escapeHtml(order.id)}" data-action="status" aria-label="Статус заказа">
                ${statusOptions}
              </select>
              <button type="button" class="admin-btn-danger" data-action="delete">Удалить</button>
            </div>
          </article>
        `
      })
      .join('')
  }

  function renderCatalog() {
    const desserts = Store.getDesserts()
    catalogEmpty.hidden = desserts.length > 0
    catalogList.innerHTML = desserts
      .map(
        (d) => `
        <article class="card-bakery admin-dessert" data-dessert-id="${escapeHtml(d.id)}">
          <div class="admin-dessert__image">
            <img src="${escapeHtml(d.image)}" alt="" width="88" height="88" loading="lazy">
          </div>
          <div>
            <h3 class="admin-dessert__title">${escapeHtml(d.name)}</h3>
            <p class="admin-dessert__price">${escapeHtml(d.price)}</p>
            <p class="admin-dessert__desc">${escapeHtml(d.description)}</p>
            <div class="admin-dessert__actions">
              <button type="button" class="btn-outline" data-action="edit">Редактировать</button>
              <button type="button" class="admin-btn-danger" data-action="delete">Удалить</button>
            </div>
          </div>
        </article>
      `
      )
      .join('')
  }

  function resetDessertForm() {
    dessertForm.reset()
    document.getElementById('dessert-id').value = ''
    document.getElementById('dessert-form-title').textContent = 'Новый десерт'
    pendingImageDataUrl = ''
    dessertPreview.hidden = true
    dessertPreviewImg.src = ''
    dessertFile.value = ''
  }

  function openDessertForm(dessert) {
    dessertForm.hidden = false
    if (dessert) {
      document.getElementById('dessert-form-title').textContent = 'Редактировать десерт'
      document.getElementById('dessert-id').value = dessert.id
      document.getElementById('dessert-name').value = dessert.name
      document.getElementById('dessert-price').value = dessert.price
      document.getElementById('dessert-description').value = dessert.description || ''
      document.getElementById('dessert-image').value = dessert.image.startsWith('data:') ? '' : dessert.image
      pendingImageDataUrl = dessert.image.startsWith('data:') ? dessert.image : ''
      dessertPreview.hidden = false
      dessertPreviewImg.src = dessert.image
    } else {
      resetDessertForm()
    }
    dessertForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  function updatePreview(src) {
    if (!src) {
      dessertPreview.hidden = true
      dessertPreviewImg.src = ''
      return
    }
    dessertPreview.hidden = false
    dessertPreviewImg.src = src
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const password = loginForm.password.value
    if (Store.login(password)) {
      loginError.hidden = true
      loginForm.reset()
      showApp(true)
    } else {
      loginError.hidden = false
    }
  })

  logoutBtn.addEventListener('click', () => {
    Store.logout()
    showApp(false)
  })

  document.querySelectorAll('.admin-tab').forEach((btn) => {
    btn.addEventListener('click', () => setTab(btn.dataset.tab))
  })

  document.getElementById('order-filters').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]')
    if (!btn) return
    orderFilter = btn.dataset.filter
    document.querySelectorAll('.admin-filter').forEach((el) => {
      el.classList.toggle('is-active', el.dataset.filter === orderFilter)
    })
    renderOrders()
  })

  ordersList.addEventListener('change', (e) => {
    const select = e.target.closest('select[data-action="status"]')
    if (!select) return
    const card = select.closest('[data-order-id]')
    Store.updateOrderStatus(card.dataset.orderId, select.value)
    renderOrders()
  })

  ordersList.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="delete"]')
    if (!btn) return
    const card = btn.closest('[data-order-id]')
    if (confirm('Удалить этот заказ?')) {
      Store.deleteOrder(card.dataset.orderId)
      renderOrders()
    }
  })

  dessertAddBtn.addEventListener('click', () => openDessertForm(null))
  dessertCancelBtn.addEventListener('click', () => {
    dessertForm.hidden = true
    resetDessertForm()
  })

  document.getElementById('dessert-image').addEventListener('input', (e) => {
    pendingImageDataUrl = ''
    updatePreview(e.target.value.trim())
  })

  dessertFile.addEventListener('change', () => {
    const file = dessertFile.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      pendingImageDataUrl = String(reader.result || '')
      updatePreview(pendingImageDataUrl)
    }
    reader.readAsDataURL(file)
  })

  dessertForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const pathOrUrl = document.getElementById('dessert-image').value.trim()
    const image = pendingImageDataUrl || pathOrUrl || 'images/hero-desserts.jpg'

    Store.upsertDessert({
      id: document.getElementById('dessert-id').value || undefined,
      name: document.getElementById('dessert-name').value,
      price: document.getElementById('dessert-price').value,
      description: document.getElementById('dessert-description').value,
      image,
    })

    dessertForm.hidden = true
    resetDessertForm()
    renderCatalog()
  })

  catalogList.addEventListener('click', (e) => {
    const card = e.target.closest('[data-dessert-id]')
    if (!card) return
    const id = card.dataset.dessertId
    const action = e.target.closest('[data-action]')?.dataset.action

    if (action === 'edit') {
      const dessert = Store.getDesserts().find((d) => d.id === id)
      if (dessert) openDessertForm(dessert)
    }

    if (action === 'delete') {
      if (confirm('Удалить десерт из каталога?')) {
        Store.deleteDessert(id)
        renderCatalog()
      }
    }
  })

  // Скрытый класс для a11y, если его ещё нет в styles.css
  if (!document.getElementById('admin-a11y-style')) {
    const style = document.createElement('style')
    style.id = 'admin-a11y-style'
    style.textContent = '.visually-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}'
    document.head.appendChild(style)
  }

  showApp(Store.isAdminLoggedIn())
})()

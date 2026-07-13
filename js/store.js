/**
 * Общее хранилище каталога и заказов (localStorage).
 * Сайт и админка читают/пишут одни и те же ключи.
 */
const Store = (() => {
  const KEYS = {
    desserts: 'izyumka_desserts',
    orders: 'izyumka_orders',
    auth: 'izyumka_admin_auth',
  }

  /** Пароль админки. При необходимости смените. */
  const ADMIN_PASSWORD = 'izyumka'

  const ORDER_STATUSES = {
    new: { label: 'Новый', color: 'blush' },
    processing: { label: 'В работе', color: 'mint' },
    ready: { label: 'Готов', color: 'mint' },
    completed: { label: 'Выдан', color: 'gray' },
    cancelled: { label: 'Отменён', color: 'gray' },
  }

  function uid(prefix = 'id') {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
  }

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key)
      if (raw == null) return fallback
      return JSON.parse(raw)
    } catch {
      return fallback
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  function ensureDessertIds(list) {
    return list.map((d, i) => ({
      id: d.id || `dessert_${i + 1}`,
      name: d.name,
      description: d.description || '',
      price: d.price,
      image: d.image,
      width: d.width || 600,
      height: d.height || 450,
    }))
  }

  function getDesserts() {
    const stored = read(KEYS.desserts, null)
    if (Array.isArray(stored)) {
      return ensureDessertIds(stored)
    }
    const seed = typeof SITE_DATA !== 'undefined' ? SITE_DATA.desserts : []
    const withIds = ensureDessertIds(seed)
    write(KEYS.desserts, withIds)
    return withIds
  }

  function saveDesserts(list) {
    write(KEYS.desserts, ensureDessertIds(list))
  }

  function upsertDessert(dessert) {
    const list = getDesserts()
    const id = dessert.id || uid('dessert')
    const item = {
      id,
      name: String(dessert.name || '').trim(),
      description: String(dessert.description || '').trim(),
      price: String(dessert.price || '').trim(),
      image: String(dessert.image || '').trim() || 'images/hero-desserts.jpg',
      width: Number(dessert.width) || 600,
      height: Number(dessert.height) || 450,
    }
    const idx = list.findIndex((d) => d.id === id)
    if (idx >= 0) list[idx] = item
    else list.push(item)
    saveDesserts(list)
    return item
  }

  function deleteDessert(id) {
    saveDesserts(getDesserts().filter((d) => d.id !== id))
  }

  function getOrders() {
    const list = read(KEYS.orders, [])
    return Array.isArray(list)
      ? list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      : []
  }

  function saveOrders(list) {
    write(KEYS.orders, list)
  }

  function createOrder(payload) {
    const order = {
      id: uid('order'),
      createdAt: new Date().toISOString(),
      status: 'new',
      customerName: String(payload.customerName || '').trim(),
      phone: String(payload.phone || '').trim(),
      comment: String(payload.comment || '').trim(),
      items: (payload.items || []).map((item) => ({
        dessertId: item.dessertId,
        name: item.name,
        price: item.price,
        quantity: Math.max(1, Number(item.quantity) || 1),
      })),
    }
    const list = getOrders()
    list.unshift(order)
    saveOrders(list)
    return order
  }

  function updateOrderStatus(id, status) {
    if (!ORDER_STATUSES[status]) return null
    const list = getOrders()
    const order = list.find((o) => o.id === id)
    if (!order) return null
    order.status = status
    order.updatedAt = new Date().toISOString()
    saveOrders(list)
    return order
  }

  function deleteOrder(id) {
    saveOrders(getOrders().filter((o) => o.id !== id))
  }

  function isAdminLoggedIn() {
    return read(KEYS.auth, false) === true
  }

  function login(password) {
    if (String(password) === ADMIN_PASSWORD) {
      write(KEYS.auth, true)
      return true
    }
    return false
  }

  function logout() {
    localStorage.removeItem(KEYS.auth)
  }

  return {
    ORDER_STATUSES,
    ADMIN_PASSWORD_HINT: 'Спросите у владельца сайта',
    getDesserts,
    saveDesserts,
    upsertDessert,
    deleteDessert,
    getOrders,
    createOrder,
    updateOrderStatus,
    deleteOrder,
    isAdminLoggedIn,
    login,
    logout,
  }
})()

/**
 * Хранилище магазина: товары, корзина, заказы (localStorage).
 */
const Store = (() => {
  const KEYS = {
    products: 'izyumka_products_v2',
    legacyDesserts: 'izyumka_desserts',
    cart: 'izyumka_cart',
    orders: 'izyumka_orders',
    auth: 'izyumka_admin_auth',
  }

  const ADMIN = {
    email: 'admin@admin.com',
    password: '147258369',
  }

  const ORDER_STATUSES = {
    new: { label: 'Новый', color: 'blush' },
    processing: { label: 'В работе', color: 'mint' },
    ready: { label: 'Готов к выдаче', color: 'mint' },
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

  function parsePrice(value) {
    if (typeof value === 'number' && Number.isFinite(value)) return Math.max(0, Math.round(value))
    const digits = String(value || '').replace(/[^\d]/g, '')
    return digits ? Number(digits) : 0
  }

  function formatPrice(value) {
    const n = parsePrice(value)
    return `${n.toLocaleString('ru-RU')} ₽`
  }

  function normalizeProduct(raw, index = 0) {
    const price = parsePrice(raw.price)
    return {
      id: raw.id || `dessert_${index + 1}`,
      name: String(raw.name || '').trim() || 'Без названия',
      shortDescription: String(raw.shortDescription || raw.description || '').trim(),
      description: String(raw.description || raw.shortDescription || '').trim(),
      price,
      image: String(raw.image || '').trim() || 'images/hero-desserts.jpg',
      category: String(raw.category || 'Десерты').trim() || 'Десерты',
      weight: String(raw.weight || '').trim(),
      ingredients: String(raw.ingredients || '').trim(),
      inStock: raw.inStock !== false,
      width: Number(raw.width) || 600,
      height: Number(raw.height) || 450,
    }
  }

  function seedFromLegacy() {
    const legacy = read(KEYS.legacyDesserts, null)
    if (Array.isArray(legacy) && legacy.length) {
      return legacy.map((item, i) =>
        normalizeProduct(
          {
            ...item,
            shortDescription: item.shortDescription || item.description,
            description: item.description || item.shortDescription || '',
            price: item.price,
          },
          i
        )
      )
    }
    const seed = typeof SITE_DATA !== 'undefined' ? SITE_DATA.desserts : []
    return seed.map((item, i) => normalizeProduct(item, i))
  }

  function getProducts() {
    const stored = read(KEYS.products, null)
    if (Array.isArray(stored)) {
      return stored.map((item, i) => normalizeProduct(item, i))
    }
    const seeded = seedFromLegacy()
    write(KEYS.products, seeded)
    return seeded
  }

  function saveProducts(list) {
    write(
      KEYS.products,
      list.map((item, i) => normalizeProduct(item, i))
    )
  }

  function getProductById(id) {
    return getProducts().find((p) => p.id === id) || null
  }

  function upsertProduct(product) {
    const list = getProducts()
    const id = product.id || uid('product')
    const item = normalizeProduct({ ...product, id })
    const idx = list.findIndex((p) => p.id === id)
    if (idx >= 0) list[idx] = item
    else list.push(item)
    saveProducts(list)
    return item
  }

  function deleteProduct(id) {
    saveProducts(getProducts().filter((p) => p.id !== id))
    const cart = getCart().filter((item) => item.productId !== id)
    write(KEYS.cart, cart)
  }

  function getCart() {
    const cart = read(KEYS.cart, [])
    return Array.isArray(cart) ? cart : []
  }

  function saveCart(items) {
    write(KEYS.cart, items)
    document.dispatchEvent(new CustomEvent('cart:updated'))
  }

  function addToCart(productId, quantity = 1) {
    const product = getProductById(productId)
    if (!product || !product.inStock) return null
    const cart = getCart()
    const qty = Math.max(1, Number(quantity) || 1)
    const existing = cart.find((item) => item.productId === productId)
    if (existing) existing.quantity += qty
    else cart.push({ productId, quantity: qty })
    saveCart(cart)
    return cart
  }

  function setCartQuantity(productId, quantity) {
    const cart = getCart()
    const item = cart.find((row) => row.productId === productId)
    if (!item) return getCart()
    const qty = Number(quantity)
    if (!Number.isFinite(qty) || qty <= 0) {
      saveCart(cart.filter((row) => row.productId !== productId))
    } else {
      item.quantity = Math.min(99, Math.round(qty))
      saveCart(cart)
    }
    return getCart()
  }

  function removeFromCart(productId) {
    saveCart(getCart().filter((item) => item.productId !== productId))
  }

  function clearCart() {
    saveCart([])
  }

  function getCartDetails() {
    const products = getProducts()
    return getCart()
      .map((item) => {
        const product = products.find((p) => p.id === item.productId)
        if (!product) return null
        return {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: item.quantity,
          lineTotal: product.price * item.quantity,
        }
      })
      .filter(Boolean)
  }

  function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.quantity, 0)
  }

  function getCartTotal() {
    return getCartDetails().reduce((sum, item) => sum + item.lineTotal, 0)
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
    const cartItems = getCartDetails()
    const items =
      payload.items && payload.items.length
        ? payload.items
        : cartItems.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: formatPrice(item.price),
            priceValue: item.price,
            quantity: item.quantity,
          }))

    const order = {
      id: uid('order'),
      createdAt: new Date().toISOString(),
      status: 'new',
      customerName: String(payload.customerName || '').trim(),
      phone: String(payload.phone || '').trim(),
      email: String(payload.email || '').trim(),
      comment: String(payload.comment || '').trim(),
      deliveryMethod: String(payload.deliveryMethod || 'pickup').trim(),
      address: String(payload.address || '').trim(),
      total: items.reduce((sum, item) => {
        const price = item.priceValue != null ? item.priceValue : parsePrice(item.price)
        return sum + price * (item.quantity || 1)
      }, 0),
      items,
    }

    const list = getOrders()
    list.unshift(order)
    saveOrders(list)
    clearCart()
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

  function login(email, password) {
    const normalizedEmail = String(email || '').trim().toLowerCase()
    if (normalizedEmail === ADMIN.email && String(password) === ADMIN.password) {
      write(KEYS.auth, true)
      return true
    }
    return false
  }

  function logout() {
    localStorage.removeItem(KEYS.auth)
  }

  // Совместимость со старым API
  return {
    ORDER_STATUSES,
    parsePrice,
    formatPrice,
    getProducts,
    getProductById,
    upsertProduct,
    deleteProduct,
    getDesserts: getProducts,
    upsertDessert: upsertProduct,
    deleteDessert: deleteProduct,
    getCart,
    getCartDetails,
    getCartCount,
    getCartTotal,
    addToCart,
    setCartQuantity,
    removeFromCart,
    clearCart,
    getOrders,
    createOrder,
    updateOrderStatus,
    deleteOrder,
    isAdminLoggedIn,
    login,
    logout,
  }
})()

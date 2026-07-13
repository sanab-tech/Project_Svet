function renderCart() {
  const items = Store.getCartDetails()
  const layout = document.getElementById('cart-layout')
  const empty = document.getElementById('cart-empty')
  const success = document.getElementById('cart-success')
  const list = document.getElementById('cart-list')
  const aside = document.getElementById('cart-aside')

  if (success && !success.hidden) {
    layout.hidden = true
    empty.hidden = true
    return
  }

  if (!items.length) {
    layout.hidden = true
    empty.hidden = false
    return
  }

  layout.hidden = false
  empty.hidden = true

  list.innerHTML = items
    .map(
      (item) => `
    <article class="cart-item" data-product-id="${escapeHtml(item.productId)}">
      <img src="${escapeHtml(item.image)}" alt="" width="88" height="88">
      <div class="cart-item__info">
        <h2><a href="product.html?id=${encodeURIComponent(item.productId)}">${escapeHtml(item.name)}</a></h2>
        <p>${Store.formatPrice(item.price)}</p>
        <div class="cart-item__controls">
          <button type="button" data-qty="-1" aria-label="Уменьшить">−</button>
          <input type="number" min="1" max="99" value="${item.quantity}" data-qty-input>
          <button type="button" data-qty="1" aria-label="Увеличить">+</button>
          <button type="button" class="cart-item__remove" data-remove>Удалить</button>
        </div>
      </div>
      <p class="cart-item__sum">${Store.formatPrice(item.lineTotal)}</p>
    </article>`
    )
    .join('')

  aside.innerHTML = `
    <h2 class="cart-aside__title">Оформление</h2>
    <p class="cart-aside__total">Итого: <strong>${Store.formatPrice(Store.getCartTotal())}</strong></p>
    <form class="form" id="checkout-form">
      <div class="form-group">
        <label for="checkout-name">Имя</label>
        <input type="text" id="checkout-name" name="customerName" required autocomplete="name" placeholder="Как к вам обращаться?">
      </div>
      <div class="form-group">
        <label for="checkout-phone">Телефон</label>
        <input type="tel" id="checkout-phone" name="phone" required autocomplete="tel" placeholder="+7 (999) 000-00-00">
      </div>
      <div class="form-group">
        <label for="checkout-email">Email <span class="optional">(необязательно)</span></label>
        <input type="email" id="checkout-email" name="email" autocomplete="email" placeholder="mail@example.com">
      </div>
      <div class="form-group">
        <label for="checkout-delivery">Способ получения</label>
        <select id="checkout-delivery" name="deliveryMethod" required>
          <option value="pickup">Самовывоз</option>
          <option value="delivery">Доставка</option>
        </select>
      </div>
      <div class="form-group" id="address-group" hidden>
        <label for="checkout-address">Адрес доставки</label>
        <input type="text" id="checkout-address" name="address" autocomplete="street-address" placeholder="Улица, дом, кв.">
      </div>
      <div class="form-group">
        <label for="checkout-comment">Комментарий</label>
        <textarea id="checkout-comment" name="comment" rows="3" placeholder="Дата, декор, пожелания…"></textarea>
      </div>
      <p class="cart-aside__note">Нажимая кнопку, вы соглашаетесь с <a href="offer.html">офертой</a> и <a href="privacy.html">политикой конфиденциальности</a>.</p>
      <button type="submit" class="btn-primary btn-primary--full">Отправить заявку</button>
    </form>
  `

  const delivery = document.getElementById('checkout-delivery')
  const addressGroup = document.getElementById('address-group')
  const addressInput = document.getElementById('checkout-address')
  delivery.addEventListener('change', () => {
    const needAddress = delivery.value === 'delivery'
    addressGroup.hidden = !needAddress
    addressInput.required = needAddress
  })

  document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const form = e.target
    Store.createOrder({
      customerName: form.customerName.value,
      phone: form.phone.value,
      email: form.email.value,
      deliveryMethod: form.deliveryMethod.value,
      address: form.address.value,
      comment: form.comment.value,
    })
    updateCartBadge()
    layout.hidden = true
    empty.hidden = true
    success.hidden = false
    success.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart()

  document.getElementById('cart-list').addEventListener('click', (e) => {
    const row = e.target.closest('[data-product-id]')
    if (!row) return
    const id = row.dataset.productId

    if (e.target.closest('[data-remove]')) {
      Store.removeFromCart(id)
      renderCart()
      return
    }

    const qtyBtn = e.target.closest('[data-qty]')
    if (qtyBtn) {
      const delta = Number(qtyBtn.dataset.qty)
      const input = row.querySelector('[data-qty-input]')
      Store.setCartQuantity(id, Number(input.value) + delta)
      renderCart()
    }
  })

  document.getElementById('cart-list').addEventListener('change', (e) => {
    const input = e.target.closest('[data-qty-input]')
    if (!input) return
    const row = input.closest('[data-product-id]')
    Store.setCartQuantity(row.dataset.productId, input.value)
    renderCart()
  })
})

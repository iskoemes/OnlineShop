import React from 'react';

export default function Cart({ cart, updateQuantity, removeFromCart, clearCart, onCheckout }) {
  return (
    <div className="fade-in">
      <h2 className="text-large text-bold">Корзина</h2>
      {!cart.items.length && <div className="text-gray">Корзина пуста</div>}
      <div className="space-y">
        {cart.items.map((it, idx) => (
          <div key={idx} className="cart-item">
            <img src={it.imageUrl} alt={it.title} />
            <div style={{ flex: 1 }}>
              <div className="text-bold">{it.title}</div>
              <div className="text-gray text-small">{it.size} / {it.color}</div>
              <div className="flex-gap" style={{ marginTop: '10px' }}>
                <input className="form-input" type="number" value={it.quantity} min={1} onChange={e => updateQuantity(idx, Number(e.target.value))} style={{ width: '80px' }} />
                <div className="price">${it.price * it.quantity}</div>
              </div>
            </div>
            <button className="button-danger" onClick={() => removeFromCart(idx)}>Удалить</button>
          </div>
        ))}
      </div>
      {cart.items.length > 0 && (
        <div className="flex-between" style={{ marginTop: '20px', padding: '15px', background: '#fff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <div className="text-large text-bold price">Итого ${cart.items.reduce((s, it) => s + it.price * it.quantity, 0)}</div>
          <div className="flex-gap">
            <button className="button-secondary" onClick={clearCart}>Очистить</button>
            <button className="button-primary" onClick={onCheckout}>Оформить</button>
          </div>
        </div>
      )}
    </div>
  );
}
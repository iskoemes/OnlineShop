import React from 'react';

export default function Cart({ cart, updateQuantity, removeFromCart, clearCart, onCheckout, onClose }) {
  return (
    <div className="cart-modal-overlay">
      <div 
        className="cart-modal fade-in"
        style={{
          width: "650px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "25px"
        }}
      >
        <button className="cart-modal-close" onClick={onClose}>&times;</button>

        <h2 className="text-large text-bold" style={{ marginBottom: "10px" }}>Корзина</h2>

        {!cart.items.length && <div className="text-gray">Корзина пуста</div>}

        <div className="space-y" style={{ marginBottom: "20px" }}>
          {cart.items.map((it, idx) => (
            <div 
              key={idx} 
              className="cart-item"
              style={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                padding: "12px",
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 3px 10px rgba(0,0,0,0.08)"
              }}
            >
              <img 
                src={it.imageUrl} 
                alt={it.title} 
                style={{ width: "90px", height: "90px", borderRadius: "10px", objectFit: "cover" }}
              />

              <div style={{ flex: 1 }}>
                <div className="text-bold">{it.title}</div>
                <div className="text-gray text-small">{it.size} / {it.color}</div>

                <div 
                  className="flex-gap"
                  style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <input
                    className="form-input"
                    type="number"
                    value={it.quantity}
                    min={1}
                    onChange={e => updateQuantity(idx, Number(e.target.value))}
                    style={{ width: "70px" }}
                  />

                  <div 
                    className="price"
                    style={{ fontSize: "18px", fontWeight: "600", whiteSpace: "nowrap" }}
                  >
                    ${it.price * it.quantity}
                  </div>
                </div>
              </div>

              <button 
                className="button-danger"
                style={{ height: "40px" }}
                onClick={() => removeFromCart(idx)}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>

        {cart.items.length > 0 && (
          <div 
            style={{ 
              marginTop: "20px",
              padding: "18px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div 
              className="text-large text-bold price"
              style={{ fontSize: "22px", fontWeight: "700" }}
            >
              Итого: ${cart.items.reduce((s, it) => s + it.price * it.quantity, 0)}
            </div>

            <div className="flex-gap" style={{ display: "flex", gap: "10px" }}>
              <button className="button-secondary">Очистить</button>
              <button className="button-primary">Оформить</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

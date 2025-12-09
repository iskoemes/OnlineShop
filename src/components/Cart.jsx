import React from "react";

export default function Cart({
  cart = { items: [] },
  updateQuantity = () => {},
  removeFromCart = () => {},
  clearCart = () => {},
  onCheckout = () => {},
  onClose = () => {},
}) {
  const items = Array.isArray(cart.items) ? cart.items : [];

  const total = items.reduce(
    (s, it) =>
      s +
      (Number(it.price) || 0) * (Number(it.quantity) || 0),
    0
  );

  const handleQtyChange = (idx, value) => {
    let v = Number(value);
    if (Number.isNaN(v) || v < 1) v = 1;
    updateQuantity(idx, v);
  };

  // КЛИК ПО ФОНУ ЗАКРЫВАЕТ МОДАЛКУ
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.modal}>
        <button aria-label="close" onClick={onClose} style={styles.closeButton}>
          &times;
        </button>

        <h2 style={styles.title}>Корзина</h2>

        {items.length === 0 ? (
          <div style={styles.empty}>Корзина пуста</div>
        ) : (
          <div style={styles.itemsWrapper}>
            {items.map((it, idx) => (
              <div key={idx} style={styles.item}>
                <img
                  src={it.imageUrl || ""}
                  alt={it.title || "product"}
                  style={styles.itemImage}
                />

                <div style={styles.itemInfo}>
                  <div style={styles.itemTitle}>{it.title || "Товар"}</div>
                  <div style={styles.itemMeta}>
                    {(it.size || "-") + " / " + (it.color || "-")}
                  </div>

                  <div style={styles.itemControls}>
                    <input
                      type="number"
                      min={1}
                      value={it.quantity}
                      onChange={(e) =>
                        handleQtyChange(idx, e.target.value)
                      }
                      style={styles.qtyInput}
                    />

                    <div style={styles.itemPrice}>
                      $
                      {(
                        (Number(it.price) || 0) *
                        (Number(it.quantity) || 0)
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(idx)}
                  style={styles.removeButton}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div style={styles.footer}>
            <div style={styles.total}>
              Итого: ${total.toFixed(2)}
            </div>

            <div style={styles.footerButtons}>
              <button onClick={clearCart} style={styles.secondaryButton}>
                Очистить
              </button>
              <button
                onClick={() => {
                  onCheckout();
                  onClose(); // закрываем после оформления
                }}
                style={styles.primaryButton}
              >
                Оформить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// СТИЛИ — те же, что были, чтобы ты не плакал что всё сломалось
const styles = {
  overlay: {
    position: "fixed",
    zIndex: 1200,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    boxSizing: "border-box",
    cursor: "pointer",
  },
  modal: {
    width: "900px",
    maxWidth: "95%",
    maxHeight: "90vh",
    overflowY: "auto",
    padding: "26px",
    background: "#f6f7fb",
    borderRadius: "14px",
    boxSizing: "border-box",
    position: "relative",
    boxShadow: "0 10px 30px rgba(15,23,42,0.25)",
    cursor: "default",
  },
  closeButton: {
    position: "absolute",
    right: "14px",
    top: "10px",
    border: "none",
    background: "transparent",
    fontSize: "28px",
    lineHeight: "1",
    cursor: "pointer",
  },
  title: {
    margin: 0,
    marginBottom: "12px",
    fontSize: "22px",
    fontWeight: 700,
  },
  empty: {
    padding: "18px",
    color: "#6b7280",
  },
  itemsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "16px",
  },
  item: {
    display: "flex",
    gap: "14px",
    alignItems: "center",
    padding: "12px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 3px 10px rgba(2,6,23,0.06)",
  },
  itemImage: {
    width: "110px",
    height: "110px",
    borderRadius: "10px",
    objectFit: "cover",
    flexShrink: 0,
    background: "#f3f4f6",
  },
  itemInfo: {
    flex: 1,
    minWidth: 0,
  },
  itemTitle: {
    fontWeight: 600,
    marginBottom: "6px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  itemMeta: {
    color: "#6b7280",
    fontSize: "13px",
  },
  itemControls: {
    marginTop: "10px",
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  qtyInput: {
    width: "72px",
    padding: "8px 10px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  },
  itemPrice: {
    fontSize: "17px",
    fontWeight: 700,
  },
  removeButton: {
    marginLeft: "12px",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    background: "transparent",
    color: "#ef4444",
    cursor: "pointer",
    fontWeight: 600,
  },
  footer: {
    marginTop: "18px",
    padding: "16px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 14px rgba(2,6,23,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    flexWrap: "wrap",
  },
  total: {
    fontSize: "20px",
    fontWeight: 800,
  },
  footerButtons: {
    display: "flex",
    gap: "10px",
  },
  secondaryButton: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #c7cbd6",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },
  primaryButton: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  },
};

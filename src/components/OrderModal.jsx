import React from "react";

export default function OrderModal({ order, onClose, onDelete }) {
  return (
     <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
      }}
    >
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          width: "600px",
          background: "#fff",
          borderRadius: "12px",
          padding: "25px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
          animation: "fadeIn 0.25s ease"
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>Заказ #{order.orderId}</h2>

        <div style={{ marginBottom: "10px" }}>
          <strong>Имя:</strong> {order.name}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <strong>Адрес:</strong> {order.address || "Не указан"}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <strong>Статус:</strong> {order.status}
        </div>

        <hr style={{ margin: "15px 0" }} />

        <h3>Список товаров:</h3>

        <div className="space-y" style={{ marginTop: "10px" }}>
          {order.items.map((it, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                gap: "10px",
                padding: "10px",
                borderRadius: "10px",
                background: "#f7f7f7"
              }}
            >
              <img
                src={it.imageUrl}
                alt=""
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "8px",
                  objectFit: "cover"
                }}
              />

              <div>
                <div><strong>{it.title}</strong></div>
                <div>Размер: {it.size}</div>
                <div>Цвет: {it.color}</div>
                <div>Кол-во: {it.quantity}</div>
                <div>Цена: {it.price} сом</div>
              </div>
            </div>
          ))}
        </div>

        <hr style={{ margin: "15px 0" }} />

        <div style={{ fontSize: "18px", fontWeight: "700" }}>
          Итого: {order.items.reduce((s, x) => s + x.price * x.quantity, 0)} сом
        </div>

        <button
          onClick={onClose}
          className="button-secondary"
          style={{ marginTop: "20px" }}
        >
          Закрыть
        </button>

        <button
          className="button-danger"
          style={{
            marginTop: "10px",
            flex: 1,
            padding: "12px",
            borderRadius: "10px",
            fontSize: "15px",
            cursor: "pointer"
          }}
          onClick={() => onDelete(order.orderId)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
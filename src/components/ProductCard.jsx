// ProductCard.jsx
import React, { useState } from 'react';

export default function ProductCard({ product, onSelect, onAdd }) {
  const [size, setSize] = useState(product.sizes?.[0] || '');
  const [color, setColor] = useState(product.colors?.[0] || '');
  const [qty, setQty] = useState(1);

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.title} className="product-img"/>

      <h3>{product.title}</h3>
      <div className="text-gray" style={{ minHeight: '60px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {product.description || ''}
      </div>

      {/* Цена — не трогаю */}
      <div className="price-row">
        <div className="price">${product.price}</div>
      </div>

      {/* Выбор цвета — квадратики */}
      <div className="color-row">
        {product.colors.map(c => (
          <div
            key={c}
            onClick={() => setColor(c)}
            className="color-box"
            style={{
              backgroundColor: c,
              border: color === c ? '3px solid black' : '1px solid #aaa'
            }}
          />
        ))}
      </div>

      {/* Размер + количество */}
      <div className="input-row">
        <select
          className="form-input"
          value={size}
          onChange={e => setSize(e.target.value)}
        >
          {product.sizes.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <input
          className="form-input"
          type="number"
          value={qty}
          min={1}
          onChange={e => setQty(Number(e.target.value))}
        />
      </div>

      {/* Кнопки в один ряд */}
      <div className="action-row">
        <button className="button-secondary" onClick={onSelect}>
          Подробнее
        </button>

        <button
          className="button-primary"
          onClick={() => onAdd(product, { size, color, quantity: qty })}
        >
          Добавить
        </button>
      </div>
    </div>
  );
}
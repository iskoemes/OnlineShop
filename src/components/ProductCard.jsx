import React, { useState } from 'react';

export default function ProductCard({ product, onSelect, onAdd }) {
  const [size, setSize] = useState(product.sizes?.[0] || '');
  const [color, setColor] = useState(product.colors?.[0] || '');
  const [qty, setQty] = useState(1);

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.title} />
      <h3>{product.title}</h3>
      <div className="text-gray">{product.description}</div>
      <div className="flex-between" style={{ marginTop: '10px' }}>
        <div className="price">${product.price}</div>
        <button className="button-secondary" onClick={onSelect} style={{ textDecoration: 'underline' }}>Подробнее</button>
      </div>
      <div className="flex-gap" style={{ marginTop: '10px' }}>
        <select className="form-input" value={size} onChange={e => setSize(e.target.value)} style={{ flex: 1 }}>
          {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="form-input" value={color} onChange={e => setColor(e.target.value)} style={{ flex: 1 }}>
          {product.colors.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input className="form-input" type="number" value={qty} onChange={e => setQty(Number(e.target.value))} min={1} style={{ width: '60px' }} />
      </div>
      <button className="button-primary" onClick={() => onAdd(product, { size, color, quantity: qty })} style={{ marginTop: '10px' }}>Добавить в корзину</button>
    </div>
  );
}
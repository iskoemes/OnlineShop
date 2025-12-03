import React, { useEffect, useState } from 'react';

export default function ProductModal({ product, onClose, onAdd }) {
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setSize(product.sizes?.[0] || '');
      setColor(product.colors?.[0] || '');
      setQty(1);
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="modal fade-in">
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>&times;</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <img src={product.imageUrl} alt={product.title} style={{ width: '50%', objectFit: 'cover', borderRadius: '8px' }} />
          <div style={{ flex: 1 }}>
            <h2 className="text-large">{product.title}</h2>
            <p className="text-gray">{product.description}</p>
            <div style={{ marginTop: '15px' }}>Цена: <span className="price">${product.price}</span></div>
            <div className="flex-gap" style={{ marginTop: '15px' }}>
              <select className="form-input" value={size} onChange={e => setSize(e.target.value)} style={{ flex: 1 }}>
                {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select className="form-input" value={color} onChange={e => setColor(e.target.value)} style={{ flex: 1 }}>
                {product.colors.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input className="form-input" type="number" min={1} value={qty} onChange={e => setQty(Number(e.target.value))} style={{ width: '80px' }} />
            </div>
            <div className="flex-gap" style={{ marginTop: '15px' }}>
              <button className="button-primary" onClick={() => { onAdd(product, { size, color, quantity: qty }); onClose(); }} style={{ flex: 1 }}>Добавить</button>
              <button className="button-secondary" onClick={onClose} style={{ flex: 1 }}>Закрыть</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
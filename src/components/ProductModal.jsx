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
          <img
            src={product.imageUrl}
            alt={product.title}
            style={{
              width: '50%',
              objectFit: 'cover',
              borderRadius: '8px'
            }}
          />

          <div style={{ flex: 1 }}>
            <h2 className="text-large">{product.title}</h2>
            <p className="text-gray">{product.description}</p>

            <div style={{ marginTop: '15px' }}>
              Цена: <span className="price">${product.price}</span>
            </div>

            {/* SIZES — кружочки */}
            <div style={{ marginTop: '20px' }}>
              <div className="text-gray" style={{ marginBottom: '6px' }}>
                Размер
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {product.sizes.map(s => (
                  <div
                    key={s}
                    onClick={() => setSize(s)}
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      border: size === s ? '3px solid #333' : '1px solid #aaa',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      fontSize: '14px',
                      background: '#fff',
                      userSelect: 'none'
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* COLORS — квадраты */}
            <div style={{ marginTop: '20px' }}>
              <div className="text-gray" style={{ marginBottom: '6px' }}>
                Цвет
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {product.colors.map(c => (
                  <div
                    key={c}
                    onClick={() => setColor(c)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      border: color === c ? '3px solid #444' : '1px solid #ccc',
                      background: c
                    }}
                  />
                ))}
              </div>
            </div>

            {/* QTY */}
            <div style={{ marginTop: '20px' }}>
              <div className="text-gray" style={{ marginBottom: '6px' }}>
                Кол-во
              </div>
              <input
                className="form-input"
                type="number"
                min={1}
                value={qty}
                onChange={e => setQty(Number(e.target.value))}
                style={{ width: '90px' }}
              />
            </div>

            {/* Buttons */}
            <div className="flex-gap" style={{ marginTop: '25px' }}>
              <button
                className="button-primary"
                onClick={() => {
                  onAdd(product, { size, color, quantity: qty });
                  onClose();
                }}
                style={{ flex: 1 }}
              >
                Добавить
              </button>

              <button className="button-secondary" onClick={onClose} style={{ flex: 1 }}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

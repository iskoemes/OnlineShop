import React from 'react';
import ProductCard from './ProductCard';

export default function Catalog({ onSearch, products, onSelect, category, setCategory, sort, setSort, query, onAdd }) {
  return (
    <div className="fade-in">
      <div className="flex-between" style={{ marginBottom: '15px' }}>
        <div className="flex-gap">
          <select className="form-input" value={category} onChange={e => setCategory(e.target.value)} style={{ width: 'auto' }}>
            <option value="all">Все</option>
            <option value="men">Мужские</option>
            <option value="women">Женские</option>
            <option value="kids">Детские</option>
          </select>
          <select className="form-input" value={sort} onChange={e => setSort(e.target.value)} style={{ width: 'auto' }}>
            <option value="new">Новые</option>
            <option value="price_asc">Бюджетные</option>
            <option value="price_desc">Дорогие</option>
          </select>
         <input className="form-input"  placeholder="Поиск" onChange={e => onSearch(e.target.value)} />
        </div>
        <div>Найдено {products.length}</div>
      </div>
      <div className="grid-catalog">
        {products.map(p => (
          <ProductCard key={p.id} product={p} onSelect={() => onSelect(p)} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
}
import React, { useState, useRef, useEffect } from 'react';
import AdminUsers from "./AdminUsers.jsx";

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', gap: '5px' }}>
      <button 
        className="button-secondary" 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        style={{ padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', background: currentPage === 1 ? '#f0f0f0' : '#fff' }}
      >
        Предыдущая
      </button>
      {pageNumbers.map(number => (
        <button 
          key={number} 
          onClick={() => onPageChange(number)} 
          className={currentPage === number ? 'active' : ''} 
          style={{ 
            padding: '5px 10px', 
            border: '1px solid #ccc', 
            borderRadius: '4px', 
            background: currentPage === number ? '#007bff' : '#fff', 
            color: currentPage === number ? '#fff' : '#000' 
          }}
        >
          {number}
        </button>
      ))}
      <button 
        className="button-secondary" 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === pageNumbers.length}
        style={{ padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', background: currentPage === pageNumbers.length ? '#f0f0f0' : '#fff' }}
      >
        Следующий
      </button>
    </div>
  );
};

export default function AdminPanel({ isAdmin, products, createProduct, editProduct, deleteProduct, orders, setOrders, user }) {
  const [form, setForm] = useState({ title: '', price: 0, category: 'men', sizes: '', colors: [] });
  const [currentPageProducts, setCurrentPageProducts] = useState(1);
  const [currentPageOrders, setCurrentPageOrders] = useState(1);
  const [searchTitle, setSearchTitle] = useState('');
  const itemsPerPage = 10;
  const productsListRef = useRef(null);
  const ordersListRef = useRef(null);

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  // Pagination for products
  const indexOfLastProduct = currentPageProducts * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Pagination for orders
  const indexOfLastOrder = currentPageOrders * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  useEffect(() => {
    setCurrentPageProducts(1);
    if (productsListRef.current) {
      productsListRef.current.scrollTop = 0;
    }
  }, [searchTitle]);

  const handleProductPageChange = (page) => {
    if (page < 1 || page > Math.ceil(filteredProducts.length / itemsPerPage)) return;
    setCurrentPageProducts(page);
    if (productsListRef.current) {
      productsListRef.current.scrollTop = 0;
    }
  };

  const handleOrderPageChange = (page) => {
    if (page < 1 || page > Math.ceil(orders.length / itemsPerPage)) return;
    setCurrentPageOrders(page);
    if (ordersListRef.current) {
      ordersListRef.current.scrollTop = 0;
    }
  };

  if (!isAdmin) return <div className="text-large text-bold" style={{ color: '#ef4444' }}>Доступ запрещён</div>;

  function toggleSize(size) {
    const sizes = form.sizes ? form.sizes.split(',').map(s => s.trim()) : [];
    const updated = sizes.includes(size)
      ? sizes.filter(s => s !== size)
      : [...sizes, size];
    setForm({ ...form, sizes: updated.join(',') });
  }

  function toggleColor(color) {
    const updated = form.colors.includes(color)
      ? form.colors.filter(c => c !== color)
      : [...form.colors, color];
    setForm({ ...form, colors: updated });
  }

  function submit(e) {
    e.preventDefault();
    const p = {
      id: 'p_' + Math.random().toString(36).slice(2, 9),
      title: form.title,
      description: form.description || '',
      price: Number(form.price),
      category: form.category,
      sizes: form.sizes ? form.sizes.split(',').map(s => s.trim()) : ['M'],
      colors: form.colors.length ? form.colors : ['black'],
      imageUrl: form.imageUrl || 'https://placehold.co/600x400?text=New',
      createdAt: Date.now(),
      isActive: true
    };
    createProduct(p);
    setForm({ title: '', price: 0, category: 'men', sizes: '', colors: [] });
  }

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const allColors = ['black', 'white', 'red', 'blue', 'green', 'yellow'];

  return (
    <div className="fade-in admin-panel-grid">
      <div className="admin-panel-block">
        <h3 className="text-bold text-large">Создать товар</h3>
        <form onSubmit={submit} className="admin-form">
          <input className="form-input" placeholder="Название" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />

          <input className="form-input" placeholder="Цена" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />

<select
  className="form-input"
  value={form.category}
  onChange={e => setForm({ ...form, category: e.target.value })}
>
  <option value="men">Мужские</option>
  <option value="women">Женские</option>
  <option value="kids">Детские</option>
</select>
          {/* --- SIZES: кружочки --- */}
          <div>
            <div className="text-gray" style={{ marginBottom: "6px" }}>Размеры</div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {allSizes.map(size => {
                const enabled = form.sizes.split(',').map(s => s.trim()).includes(size);
                return (
                  <div
                    key={size}
                    onClick={() => toggleSize(size)}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      border: enabled ? "3px solid #333" : "1px solid #aaa",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: "14px",
                      userSelect: "none"
                    }}
                  >
                    {size}
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- COLORS: квадратики --- */}
          <div>
            <div className="text-gray" style={{ margin: "10px 0 6px" }}>Цвета</div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {allColors.map(color => {
                const selected = form.colors.includes(color);
                return (
                  <div
                    key={color}
                    onClick={() => toggleColor(color)}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      border: selected ? "3px solid #444" : "1px solid #ccc",
                      background: color
                    }}
                  ></div>
                );
              })}
            </div>
          </div>

          <input className="form-input" placeholder="Image URL" value={form.imageUrl || ''} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />

          <textarea className="form-input" placeholder="Описание" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} style={{ height: '80px' }} />

          <button className="button-primary" type="submit">Создать</button>
        </form>
      </div>

      <div className="admin-panel-block">
        <h3 className="text-bold text-large">Товары</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input 
            className="form-input" 
            placeholder="Поиск по названию" 
            value={searchTitle} 
            onChange={e => setSearchTitle(e.target.value)} 
          />
        </div>
        <div className="space-y" style={{ maxHeight: '400px', overflowY: 'auto' }} ref={productsListRef}>
          {currentProducts.map(p => (
            <div key={p.id} className="admin-item">
              <div>
                <div className="text-bold">{p.title}</div>
                <div className="text-gray">${p.price}</div>
              </div>
              <div className="flex-gap">
                <button 
                  className="button-secondary" 
                  onClick={() => {
                    const newTitle = prompt('Enter new title:', p.title);
                    const newPrice = prompt('Enter new price:', p.price);
                    if (newTitle !== null && newPrice !== null) {
                      editProduct(p.id, { title: newTitle || p.title, price: newPrice || p.price });
                    }
                  }} 
                  style={{ textDecoration: 'underline' }}
                >
                  Редактировать
                </button>
                <button className="button-danger" onClick={() => deleteProduct(p.id)}>Удалить</button>
              </div>
            </div>
          ))}
        </div>
        <Pagination 
          currentPage={currentPageProducts} 
          totalItems={filteredProducts.length} 
          itemsPerPage={itemsPerPage} 
          onPageChange={handleProductPageChange} 
        />

        <h3 className="text-bold text-large" style={{ marginTop: '20px' }}>Заказы</h3>
        <div className="space-y" style={{ maxHeight: '400px', overflowY: 'auto' }} ref={ordersListRef}>
          {currentOrders.map(o => (
            <div key={o.orderId} className="admin-item">
              <div>#{o.orderId} {o.name}</div>
              <select 
                className="form-input" 
                value={o.status} 
                onChange={e => setOrders(orders.map(x => x.orderId === o.orderId ? { ...x, status: e.target.value } : x))} 
                style={{ width: 'auto' }}
              >
                <option value="pending">в ожидании</option>
                <option value="paid">оплаченный</option>
                <option value="shipped">отправленный</option>
                <option value="cancelled">отменено</option>
              </select>
            </div>
          ))}
        </div>
        <Pagination 
          currentPage={currentPageOrders} 
          totalItems={orders.length} 
          itemsPerPage={itemsPerPage} 
          onPageChange={handleOrderPageChange} 
        />
      </div>

      <AdminUsers currentUser={user} />
    </div>
  );
}
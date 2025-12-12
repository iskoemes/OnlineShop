// AdminPanel.jsx
import React, { useState, useRef, useEffect } from 'react';
import AdminUsers from "./AdminUsers.jsx";
import OrderModal from "./OrderModal.jsx";

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const [pageInput, setPageInput] = useState(currentPage.toString());
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  const handlePageInputChange = (e) => {
    setPageInput(e.target.value);
  };

  const handlePageSubmit = () => {
    const page = parseInt(pageInput);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
    } else {
      setPageInput(currentPage.toString());
    }
  };

  return (
    <div className="pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', gap: '10px' }}>
      <button 
        className="button-secondary" 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        style={{ padding: '5px 10px', borderRadius: '4px' }}
      >
        &lt;
      </button>

      <input
        type="number"
        value={pageInput}
        onChange={handlePageInputChange}
        onKeyDown={(e) => { if (e.key === 'Enter') handlePageSubmit(); }}
        onBlur={handlePageSubmit}
        style={{ width: '50px', textAlign: 'center', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
      />

      <span>/ {totalPages}</span>

      <button 
        className="button-secondary" 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        style={{ padding: '5px 10px', borderRadius: '4px' }}
      >
        &gt;
      </button>
    </div>
  );
};

export default function AdminPanel({ isAdmin, products, createProduct, editProduct, deleteProduct, orders, setOrders, user }) {

  const [form, setForm] = useState({ title: '', price: 0, category: 'men', sizes: '', colors: [], isRecommended: false });
  const [currentPageProducts, setCurrentPageProducts] = useState(1);
  const [currentPageOrders, setCurrentPageOrders] = useState(1);
  const [searchTitle, setSearchTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const itemsPerPage = 10;
  const productsListRef = useRef(null);
  const ordersListRef = useRef(null);

  // МОДАЛКА ЗАКАЗА
  const [selectedOrder, setSelectedOrder] = useState(null);

  // For editing product
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  const filteredOrders = orders.filter(o => filterStatus === 'all' || o.status === filterStatus);

  const indexOfLastProduct = currentPageProducts * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const indexOfLastOrder = currentPageOrders * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  useEffect(() => {
    setCurrentPageProducts(1);
    if (productsListRef.current) {
      productsListRef.current.scrollTop = 0;
    }
  }, [searchTitle]);

  useEffect(() => {
    setCurrentPageOrders(1);
    if (ordersListRef.current) {
      ordersListRef.current.scrollTop = 0;
    }
  }, [filterStatus]);

  const handleProductPageChange = (page) => {
    if (page < 1 || page > Math.ceil(filteredProducts.length / itemsPerPage)) return;
    setCurrentPageProducts(page);
  };

  const handleOrderPageChange = (page) => {
    if (page < 1 || page > Math.ceil(filteredOrders.length / itemsPerPage)) return;
    setCurrentPageOrders(page);
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
      isActive: true,
      isRecommended: form.isRecommended
    };
    createProduct(p);
    setForm({ title: '', price: 0, category: 'men', sizes: '', colors: [], isRecommended: false });
  }

  function editSubmit(e) {
    e.preventDefault();
    const updated = {
      title: form.title,
      description: form.description || '',
      price: Number(form.price),
      category: form.category,
      sizes: form.sizes ? form.sizes.split(',').map(s => s.trim()) : ['M'],
      colors: form.colors.length ? form.colors : ['black'],
      imageUrl: form.imageUrl || 'https://placehold.co/600x400?text=New',
      isRecommended: form.isRecommended
    };
    editProduct(selectedProduct.id, updated);
    setSelectedProduct(null);
    setForm({ title: '', price: 0, category: 'men', sizes: '', colors: [], isRecommended: false });
  }

  useEffect(() => {
    if (selectedProduct) {
      setForm({
        title: selectedProduct.title,
        price: selectedProduct.price,
        category: selectedProduct.category,
        sizes: selectedProduct.sizes ? selectedProduct.sizes.join(',') : '',
        colors: selectedProduct.colors || [],
        imageUrl: selectedProduct.imageUrl || '',
        description: selectedProduct.description || '',
        isRecommended: selectedProduct.isRecommended || false
      });
    }
  }, [selectedProduct]);

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const allColors = ['black', 'white', 'red', 'blue', 'green', 'yellow'];

  const toggleRecommended = (p) => {
    editProduct(p.id, { isRecommended: ! (p.isRecommended || false) });
  };

  return (
    <div className="fade-in admin-panel-grid">

      {/* --- СОЗДАНИЕ ТОВАРА --- */}
      <div className="admin-panel-block" style={{ minHeight: '500px' }}>
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

          {/* sizes */}
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
                      userSelect: "none"
                    }}
                  >
                    {size}
                  </div>
                );
              })}
            </div>
          </div>

          {/* colors */}
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
                      borderRadius: "50%",
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
          <textarea className="form-input" placeholder="Описание" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} />

          <div style={{ marginTop: '10px' }}>
            <label>
              <input
                type="checkbox"
                checked={form.isRecommended}
                onChange={e => setForm({ ...form, isRecommended: e.target.checked })}
              />
              Рекомендованный товар
            </label>
          </div>

          <button className="button-primary" type="submit">Создать</button>
        </form>
      </div>

      {/* --- ТОВАРЫ --- */}
      <div className="admin-panel-block" style={{ minHeight: '500px' }}>
        <h3 className="text-bold text-large">Товары</h3>

        <input 
          className="form-input" 
          placeholder="Поиск по названию" 
          value={searchTitle} 
          onChange={e => setSearchTitle(e.target.value)} 
        />

        <div className="space-y" style={{ maxHeight: "400px", overflowY: "auto" }} ref={productsListRef}>
          {currentProducts.map(p => (
            <div key={p.id} className="admin-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div className="text-bold">{p.title} {p.isRecommended ? '(Рекомендованный)' : ''}</div>
                <div className="text-gray">${p.price}</div>
              </div>

              <div className="flex-gap" style={{ display: 'flex', gap: '10px' }}>
                <button className="button-secondary" onClick={() => setSelectedProduct(p)} style={{ width: '120px' }}>
                  Редактировать
                </button>

                <button 
                  className={p.isRecommended ? "button-danger" : "button-primary"} 
                  onClick={() => toggleRecommended(p)}
                  style={{ width: '220px', textAlign: 'center' }}
                >
                  {p.isRecommended ? 'Убрать из рекомендованных' : 'Добавить в рекомендованные'}
                </button>

                <button className="button-danger" onClick={() => deleteProduct(p.id)} style={{ width: '120px' }}>
                  Удалить
                </button>
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
      </div>

      {/* --- ЗАКАЗЫ --- */}
      {orders.length > 0 && (
        <div className="admin-panel-block" style={{ minHeight: '500px' }}>
          <h3 className="text-bold text-large">Заказы</h3>

          <select
            className="form-input"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            style={{ marginBottom: '10px' }}
          >
            <option value="all">Все</option>
            <option value="pending">В ожидании</option>
            <option value="paid">Оплаченный</option>
            <option value="shipped">Отправленный</option>
            <option value="cancelled">Отменено</option>
          </select>

          <div className="space-y" style={{ maxHeight: "400px", overflowY: "auto" }} ref={ordersListRef}>

            {currentOrders.map(o => (
              <div 
                key={o.orderId} 
                className="admin-item"
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedOrder(o)}
              >
                <div>#{o.orderId} {o.name}</div>

                <select
                  className="form-input"
                  value={o.status}
                  onClick={e => e.stopPropagation()}
                  onChange={e => setOrders(orders.map(x => x.orderId === o.orderId ? { ...x, status: e.target.value } : x))}
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
            totalItems={filteredOrders.length} 
            itemsPerPage={itemsPerPage} 
            onPageChange={handleOrderPageChange} 
          />
        </div>
      )}

      <AdminUsers currentUser={user} />

      {selectedOrder && (
        <OrderModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)}
          onDelete={(id) => {
            setOrders(orders.filter(o => o.orderId !== id));
            setSelectedOrder(null);
          }}
        />
      )}

      {selectedProduct && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '400px' }}>
            <h3>Редактировать товар</h3>
            <form onSubmit={editSubmit} className="admin-form">
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

              {/* sizes */}
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
                          userSelect: "none"
                        }}
                      >
                        {size}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* colors */}
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
              <textarea className="form-input" placeholder="Описание" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} />

              <div style={{ marginTop: '10px' }}>
                <label>
                  <input
                    type="checkbox"
                    checked={form.isRecommended}
                    onChange={e => setForm({ ...form, isRecommended: e.target.checked })}
                  />
                  Рекомендованный товар
                </label>
              </div>

              <button className="button-primary" type="submit">Сохранить</button>
              <button className="button-secondary" type="button" onClick={() => setSelectedProduct(null)}>Отмена</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
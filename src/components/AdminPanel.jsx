import React, { useState } from 'react';
import AdminUsers from "./AdminUsers.jsx";

export default function AdminPanel({ isAdmin, products, createProduct, editProduct, deleteProduct, orders, setOrders, user }) {
  const [form, setForm] = useState({ title: '', price: 0, category: 'men' });

  if (!isAdmin) return <div className="text-large text-bold" style={{ color: '#ef4444' }}>Доступ запрещён</div>;

  function submit(e) {
    e.preventDefault();
    const p = {
      id: 'p_' + Math.random().toString(36).slice(2, 9),
      title: form.title,
      description: form.description || '',
      price: Number(form.price),
      category: form.category,
      sizes: form.sizes ? form.sizes.split(',').map(s => s.trim()) : ['M'],
      colors: form.colors ? form.colors.split(',').map(c => c.trim()) : ['black'],
      imageUrl: form.imageUrl || 'https://placehold.co/600x400?text=New',
      createdAt: Date.now(),
      isActive: true
    };
    createProduct(p);
    setForm({ title: '', price: 0, category: 'men' });
  }

  return (
    <div className="fade-in admin-panel-grid">
      <div className="admin-panel-block">
        <h3 className="text-bold text-large">Создать товар</h3>
        <form onSubmit={submit} className="admin-form">
          <input className="form-input" placeholder="Название" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <input className="form-input" placeholder="Цена" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          <input className="form-input" placeholder="Категория" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
          <input className="form-input" placeholder="Sizes comma separated" value={form.sizes || ''} onChange={e => setForm({ ...form, sizes: e.target.value })} />
          <input className="form-input" placeholder="Colors comma separated" value={form.colors || ''} onChange={e => setForm({ ...form, colors: e.target.value })} />
          <input className="form-input" placeholder="Image URL" value={form.imageUrl || ''} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
          <textarea className="form-input" placeholder="Описание" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} style={{ height: '80px' }} />
          <button className="button-primary" type="submit">Создать</button>
        </form>
      </div>
      <div className="admin-panel-block">
        <h3 className="text-bold text-large">Товары</h3>
        <div className="space-y">
          {products.map(p => (
            <div key={p.id} className="admin-item">
              <div>
                <div className="text-bold">{p.title}</div>
                <div className="text-gray">${p.price}</div>
              </div>
              <div className="flex-gap">
                <button className="button-secondary" onClick={() => editProduct(p.id, { title: p.title + ' (edited)' })} style={{ textDecoration: 'underline' }}>Edit</button>
                <button className="button-danger" onClick={() => deleteProduct(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <h3 className="text-bold text-large" style={{ marginTop: '20px' }}>Заказы</h3>
        <div className="space-y">
          {orders.map(o => (
            <div key={o.orderId} className="admin-item">
              <div>#{o.orderId} {o.name}</div>
              <select className="form-input" value={o.status} onChange={e => setOrders(orders.map(x => x.orderId === o.orderId ? { ...x, status: e.target.value } : x))} style={{ width: 'auto' }}>
                <option value="pending">pending</option>
                <option value="paid">paid</option>
                <option value="shipped">shipped</option>
                <option value="cancelled">cancelled</option>
              </select>
            </div>
          ))}
        </div>
      </div>
      <AdminUsers currentUser={user} />
    </div>
  );
}
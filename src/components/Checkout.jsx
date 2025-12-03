import React, { useState } from 'react';

export default function Checkout({ onPlace, onBack, user }) {
  const [form, setForm] = useState({ name: user.name || '', phone: '', address: '', comment: '' });
  const [errors, setErrors] = useState({});

  function validate() {
    const err = {};
    if (!form.name) err.name = 'Введите имя';
    if (!form.phone) err.phone = 'Введите телефон';
    if (!form.address) err.address = 'Введите адрес';
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  function submit(e) {
    e.preventDefault();
    if (!validate()) return;
    onPlace(form);
  }

  return (
    <div className="fade-in">
      <h2 className="text-large text-bold">Оформление заказа</h2>
      <form onSubmit={submit} style={{ maxWidth: '500px', background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} className="space-y">
        <div>
          <label className="form-label">ФИО</label>
          <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div>
          <label className="form-label">Телефон</label>
          <input className="form-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          {errors.phone && <div className="error">{errors.phone}</div>}
        </div>
        <div>
          <label className="form-label">Адрес</label>
          <input className="form-input" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          {errors.address && <div className="error">{errors.address}</div>}
        </div>
        <div>
          <label className="form-label">Комментарий</label>
          <textarea className="form-input" value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })} style={{ height: '100px' }} />
        </div>
        <div className="flex-gap">
          <button className="button-secondary" type="button" onClick={onBack}>Назад</button>
          <button className="button-primary" type="submit">Подтвердить</button>
        </div>
      </form>
    </div>
  );
}
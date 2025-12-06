import React from 'react';
import EditProfile from './EditProfile';

export default function Account({ user, orders, setUser, onEditProfile }) {
  const isGuest = user.uid === "guest";
  const userOrders = isGuest
    ? []
    : orders.filter(o => o.userId === user.uid || o.email === user.email);

  return (
    <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h3 className="text-bold text-large">Мои данные</h3>
        <div>Имя: {user.name}</div>
        <div>Email: {user.email}</div>
        <EditProfile user={user} onSave={onEditProfile} />
      </div>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h3 className="text-bold text-large">Мои заказы</h3>
        {isGuest ? (
          <div className="text-gray">Гость не может просматривать и оформлять заказы. Зарегистрируйтесь!</div>
        ) : (
          <>
            {!userOrders.length && <div className="text-gray">Нет заказов</div>}
            <div className="space-y">
              {userOrders.map(o => (
                <div key={o.orderId} className="order-card">
                  <div className="flex-between">
                    <div>Заказ {o.orderId}</div>
                    <div className="text-gray">{new Date(o.createdAt).toLocaleString()}</div>
                  </div>
                  <div>Статус: {o.status}</div>
                  <div>Сумма: ${o.total}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
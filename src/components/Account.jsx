import React, { useState } from 'react';

export default function Account({ user, orders = [], onDeleteOrder, onEditProfile }) {
  const isGuest = user?.uid === 'guest';
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deletingOrder, setDeletingOrder] = useState(null);

  const userOrders = isGuest
    ? []
    : orders.filter(o => o.userId === user.uid || o.email === user.email);

  const handleDelete = () => {
    if (deletingOrder && onDeleteOrder) {
      onDeleteOrder(deletingOrder.orderId);
      setDeletingOrder(null);
      // Если удаляем открытый заказ — закрываем модалку
      if (selectedOrder?.orderId === deletingOrder.orderId) {
        setSelectedOrder(null);
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '30px', textAlign: 'center', color: '#111' }}>
        Личный кабинет
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '30px' }}>
        {/* === ПРОФИЛЬ === */}
        <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Мои данные</h3>
          <div style={{ lineHeight: '2', color: '#333' }}>
            <div><strong>Имя:</strong> {user.name || '—'}</div>
            <div><strong>Email:</strong> {user.email}</div>
            {user.phone && <div><strong>Телефон:</strong> {user.phone}</div>}
            {user.address && <div><strong>Адрес:</strong> {user.address}</div>}
          </div>
          {/* <button
            onClick={onEditProfile}
            style={{
              marginTop: '25px',
              width: '100%',
              padding: '14px',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Редактировать профиль
          </button> */}
        </div>

        {/* === ЗАКАЗЫ === */}
        <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '25px' }}>
            Мои заказы ({userOrders.length})
          </h3>

          {isGuest ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
              Гости не могут просматривать заказы.<br />
              <a href="/login" style={{ color: '#2563eb', textDecoration: 'underline' }}>Войти в аккаунт</a>
            </div>
          ) : userOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>
              У вас пока нет заказов
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {userOrders.map(order => (
                <div
                  key={order.orderId}
                  onClick={() => setSelectedOrder(order)}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '20px',
                    cursor: 'pointer',
                    background: '#fff',
                    transition: 'all 0.25s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: '19px', fontWeight: 'bold' }}>Заказ №{order.orderId}</div>
                      <div style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>
                        {new Date(order.createdAt).toLocaleString('ru-RU')}
                      </div>
                      <div style={{ marginTop: '12px' }}>
                        <span style={{
                          padding: '6px 14px',
                          borderRadius: '30px',
                          fontSize: '13px',
                          fontWeight: '600',
                          background:
                            order.status === 'доставлен' ? '#d1fae5' :
                            order.status === 'отменён' ? '#fee2e2' :
                            order.status === 'в обработке' ? '#dbeafe' : '#fef3c7',
                          color:
                            order.status === 'доставлен' ? '#065f46' :
                            order.status === 'отменён' ? '#991b1b' :
                            order.status === 'в обработке' ? '#1e40af' : '#92400e'
                        }}>
                          {order.status || 'в обработке'}
                        </span>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626' }}>
                        ${order.total}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // ГЛАВНОЕ — останавливаем открытие модалки
                          setDeletingOrder(order);
                        }}
                        style={{
                          marginTop: '12px',
                          padding: '8px 16px',
                          background: '#fee2e2',
                          color: '#991b1b',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: '600',
                          fontSize: '14px'
                        }}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* === МОДАЛКА ПОДРОБНОСТЕЙ ЗАКАЗА === */}
      {selectedOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setSelectedOrder(null)}>
          <div style={{ background: 'white', borderRadius: '20px', width: '90%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: '40px', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedOrder(null)} style={{ position: 'absolute', top: '20px', right: '25px', fontSize: '32px', background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>×</button>

            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '25px' }}>Заказ №{selectedOrder.orderId}</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px', fontSize: '17px' }}>
              <div><strong>Дата:</strong> {new Date(selectedOrder.createdAt).toLocaleString('ru-RU')}</div>
              <div><strong>Статус:</strong> <span style={{ marginLeft: '10px', padding: '6px 14px', borderRadius: '30px', background: '#dbeafe', color: '#1e40af', fontWeight: '600' }}>{selectedOrder.status}</span></div>
              <div><strong>Сумма:</strong> <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#dc2626' }}>${selectedOrder.total}</span></div>
              <div><strong>Оплата:</strong> {selectedOrder.paymentMethod || 'При получении'}</div>
            </div>

            {selectedOrder.shippingAddress && (
              <div style={{ marginBottom: '30px' }}>
                <strong>Адрес доставки:</strong>
                <div style={{ marginTop: '10px', padding: '15px', background: '#f8fafc', borderRadius: '10px', color: '#444' }}>
                  {selectedOrder.shippingAddress}
                </div>
              </div>
            )}

            <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>Товары в заказе</h3>
            <div>
              {selectedOrder.items?.length > 0 ? selectedOrder.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    {item.image && <img src={item.image} alt={item.name} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '10px' }} />}
                    <div>
                      <div style={{ fontWeight: '600' }}>{item.name}</div>
                      {item.variant && <div style={{ color: '#666', fontSize: '14px' }}>{item.variant}</div>}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#666' }}>{item.quantity} × ${item.price}</div>
                    <div style={{ fontWeight: 'bold', fontSize: '18px' }}>${item.quantity * item.price}</div>
                  </div>
                </div>
              )) : <div style={{ color: '#888' }}>Товары не указаны</div>}
            </div>

            <div style={{ textAlign: 'right', marginTop: '30px', fontSize: '28px', fontWeight: 'bold', color: '#dc2626' }}>
              Итого: ${selectedOrder.total}
            </div>
          </div>
        </div>
      )}

      {/* === ПОДТВЕРЖДЕНИЕ УДАЛЕНИЯ === */}
      {deletingOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '40px', borderRadius: '16px', width: '90%', maxWidth: '420px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>Удалить заказ?</h3>
            <p style={{ color: '#555', marginBottom: '30px' }}>
              Заказ №{deletingOrder.orderId} будет удалён навсегда.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button
                onClick={() => setDeletingOrder(null)}
                style={{ padding: '12px 24px', border: '1px solid #ddd', borderRadius: '10px', background: '#fff', cursor: 'pointer', fontWeight: '600' }}
              >
                Отмена
              </button>
              <button
                onClick={handleDelete}
                style={{ padding: '12px 24px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}
              >
                Удалить заказ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
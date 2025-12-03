import React from 'react';

export default function AuthButtons({ setUser }) {
  const loginAsUser = () => setUser({ uid: 'u1', name: 'Ryskeldi', email: 'ryskeld@example.com' });
  const loginAsAdmin = () => setUser({ uid: 'admin', name: 'Admin', email: 'admin@example.com', isAdmin: true });

  return (
    <div className="flex-gap">
      <button className="button-secondary" onClick={loginAsUser}>Войти</button>
      <button className="button-secondary" onClick={loginAsAdmin}>Войти как админ</button>
    </div>
  );
}
import React from 'react';
import AuthButtons from './AuthButtons';

export default function Header({ cartCount, onNavigate, onSearch, user, setUser }) {
  const logout = () => {
    setUser({ uid: 'guest', name: 'Гость' });
    localStorage.removeItem('isAdmin');
  };

  return (
    <header className="header">
      <div className="flex-between">
        <div className="flex-gap">
          <h1 onClick={() => onNavigate('catalog')}>Shop</h1>
          <nav className="flex-gap">
            <button onClick={() => onNavigate('catalog')}>Каталог</button>
            <button onClick={() => onNavigate('cart')}>Корзина</button>
            <button onClick={() => onNavigate('account')}>Личный кабинет</button>
            <button onClick={() => onNavigate('admin')}>Админ</button>
          </nav>
        </div>
        <div className="flex-gap">
          <input placeholder="Поиск" onChange={e => onSearch(e.target.value)} />
          <div className="cart-link" onClick={() => onNavigate('cart')}>Корзина ({cartCount})</div>
          {user && user.uid !== 'guest' ? (
            <div className="flex-gap">
              <span>{user.name}</span>
              <button className="button-danger" onClick={logout}>Выйти</button>
            </div>
          ) : (
            <AuthButtons setUser={setUser} />
          )}
        </div>
      </div>
    </header>
  );
}
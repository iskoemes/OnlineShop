import React, { useState } from 'react';
import AuthButtons from './AuthButtons';

export default function Header({ cartCount, onNavigate, onSearch, user, setUser }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    setUser({ uid: 'guest', name: 'Гость', email: '' });
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    onNavigate('catalog');
  };

  const isGuest = !user || user.uid === 'guest';

  return (
      <header className="header">
        <div className="flex-between">
          {/* ЛЕВАЯ ЧАСТЬ */}
          <div className="flex-gap">
            <h1 onClick={() => onNavigate('catalog')}>Shop</h1>

            {/* ДЕСКТОП МЕНЮ */}
            <nav className="nav-desktop flex-gap">
              <button onClick={() => onNavigate('catalog')}>Каталог</button>
              <button onClick={() => onNavigate('cart')}>Корзина</button>
              <button onClick={() => onNavigate('account')}>Личный кабинет</button>
              <button onClick={() => onNavigate('admin')}>Админ</button>
            </nav>

            {/* БУРГЕР */}
            <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          {/* ПРАВАЯ ЧАСТЬ */}
          <div className="right-controls flex-gap">
            <input placeholder="Поиск" onChange={e => onSearch(e.target.value)} />

            <div className="cart-link" onClick={() => onNavigate('cart')}>
              Корзина ({cartCount})
            </div>

            {/* 🔹 ЕСЛИ ГОСТЬ — показываем Вход / Регистрация */}
            {isGuest ? (
                <AuthButtons
                    goToLogin={() => onNavigate('login')}
                    goToRegister={() => onNavigate('register')}
                />
            ) : (
                /* 🔹 ЕСЛИ ВОШЁЛ — только имя + Выйти */
                <div className="flex-gap">
                  <span>{user.name || user.email}</span>
                  <button className="button-secondary" onClick={logout}>
                    Выйти
                  </button>
                </div>
            )}
          </div>
        </div>

        {/* МОБИЛЬНОЕ МЕНЮ */}
        {menuOpen && (
            <nav className="nav-mobile fade-in">
              <button onClick={() => { onNavigate("catalog"); setMenuOpen(false); }}>Каталог</button>
              <button onClick={() => { onNavigate("cart"); setMenuOpen(false); }}>Корзина</button>
              <button onClick={() => { onNavigate("account"); setMenuOpen(false); }}>Личный кабинет</button>
              <button onClick={() => { onNavigate("admin"); setMenuOpen(false); }}>Админ</button>
            </nav>
        )}
      </header>
  );
}
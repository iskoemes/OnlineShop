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
  const isAdmin = !!user?.isAdmin;

  return (
    <header className="header">
      <div className="flex-between">
        {/* ЛЕВАЯ ЧАСТЬ */}
        <div className="flex-gap">
          <h1 onClick={() => onNavigate('catalog')}>Shop</h1>

          {/* ДЕСКТОП МЕНЮ */}
          <nav className="nav-desktop flex-gap">
            <button onClick={() => onNavigate('catalog')}>Каталог</button>
            <button onClick={() => onNavigate('cart')}> <img className='icon' src="basket.svg" alt="корзина" /> ({cartCount})</button>
            {isAdmin && <button onClick={() => onNavigate('admin')}>Админ</button>}
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
          {/* 🔹 ЕСЛИ ГОСТЬ — показываем Вход / Регистрация */}
         {isGuest ? (
  <AuthButtons
    goToLogin={() => onNavigate('login')}
    goToRegister={() => onNavigate('register')}
  />
) : (
  <button onClick={() => onNavigate('account')}>
    <img className="icon" src="personalAccount.svg" alt="" />
  </button>
)}

        </div>
      </div>

      {/* МОБИЛЬНОЕ МЕНЮ */}
      {menuOpen && (
        <nav className="nav-mobile fade-in">
          <button onClick={() => { onNavigate("catalog"); setMenuOpen(false); }}>Каталог</button>
          <button onClick={() => { onNavigate("cart"); setMenuOpen(false); }}><img className='icon' src="basket.svg" alt="" /> ({cartCount})</button>
          <button onClick={() => { onNavigate("account"); setMenuOpen(false); }}> <img className='icon' src="personalAccount.svg" alt="" /></button>
          {isAdmin && <button onClick={() => { onNavigate("admin"); setMenuOpen(false); }}>Админ</button>}
          <div style={{ marginTop: 12 }}>
            {isGuest ? (
              <AuthButtons
                goToLogin={() => { onNavigate('login'); setMenuOpen(false); }}
                goToRegister={() => { onNavigate('register'); setMenuOpen(false); }}
              />
            ) : (
              <button onClick={() => { onNavigate("account"); setMenuOpen(false); }}> <img className='icon' src="personalAccount.svg" alt="" /></button>

            )}
          </div>
        </nav>
      )}
    </header>
  );
}
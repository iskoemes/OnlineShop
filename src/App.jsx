import React, { useEffect, useMemo, useState } from 'react';
import { sampleProducts, save, load } from './utils';
import Toast from './components/Toast';
import Header from './components/Header';
import Catalog from './components/Catalog';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Account from './components/Account';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [products, setProducts] = useState(() => load('products', sampleProducts));
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('new');
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState(() => load('cart', { items: [] }));
  const [toast, setToast] = useState('');
  const [page, setPage] = useState('catalog');
  const [user, setUser] = useState(() => load('user', { uid: 'guest', name: 'Гость', email: '' }));
  const [orders, setOrders] = useState(() => load('orders', []));

  useEffect(() => save('products', products), [products]);
  useEffect(() => save('cart', cart), [cart]);
  useEffect(() => save('orders', orders), [orders]);
  useEffect(() => save('user', user), [user]);

  const filtered = useMemo(() => {
    let list = products.filter(p => p.isActive);
    if (category !== 'all') list = list.filter(p => p.category === category);
    if (query) list = list.filter(p => (p.title + p.description).toLowerCase().includes(query.toLowerCase()));
    if (sort === 'price_asc') list = list.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') list = list.sort((a, b) => b.price - a.price);
    else list = list.sort((a, b) => b.createdAt - a.createdAt);
    return list;
  }, [products, category, query, sort]);

  function addToCart(product, opts) {
    const existing = cart.items.find(i => i.productId === product.id && i.size === opts.size && i.color === opts.color);
    let newItems;
    if (existing) {
      newItems = cart.items.map(i => i === existing ? { ...i, quantity: i.quantity + opts.quantity } : i);
    } else {
      newItems = [...cart.items, {
        productId: product.id,
        title: product.title,
        price: product.price,
        size: opts.size,
        color: opts.color,
        quantity: opts.quantity,
        imageUrl: product.imageUrl
      }];
    }
    setCart({ items: newItems, updatedAt: Date.now() });
    setToast('Добавлено в корзину');
  }

  function updateQuantity(index, qty) {
    const items = [...cart.items];
    items[index].quantity = qty;
    setCart({ ...cart, items });
  }

  function removeFromCart(index) {
    const items = cart.items.filter((_, i) => i !== index);
    setCart({ ...cart, items });
  }

  function clearCart() {
    setCart({ items: [] });
  }

  function placeOrder(form) {
    if (!cart.items.length) {
      setToast('Корзина пуста');
      return;
    }
    const newOrder = {
      orderId: 'o_' + Math.random().toString(36).slice(2, 9),
      userId: user.uid,
      items: cart.items,
      total: cart.items.reduce((s, it) => s + it.price * it.quantity, 0),
      status: 'pending',
      createdAt: Date.now(),
      shippingAddress: form.address,
      name: form.name,
      phone: form.phone,
      comment: form.comment
    };
    setOrders([newOrder, ...orders]);
    clearCart();
    setToast('Заказ создан');
    setPage('account');
  }

  const isAdmin = !!user.isAdmin;

  function createProduct(p) {
    setProducts([p, ...products]);
    setToast('Товар добавлен');
  }

  function editProduct(id, updated) {
    setProducts(products.map(p => p.id === id ? { ...p, ...updated } : p));
    setToast('Товар обновлён');
  }

  function deleteProduct(id) {
    setProducts(products.filter(p => p.id !== id));
    setToast('Товар удалён');
  }

  return (
    <div>
      <Header
        cartCount={cart.items.reduce((s, i) => s + i.quantity, 0)}
        onNavigate={setPage}
        onSearch={setQuery}
        user={user}
        setUser={setUser}
      />
      <main className="container">
        {page === 'catalog' && (
          <Catalog
            products={filtered}
            onSelect={setSelected}
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
            query={query}
            onAdd={addToCart}
          />
        )}
        {page === 'cart' && (
          <Cart
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            onCheckout={() => setPage('checkout')}
          />
        )}
        {page === 'checkout' && (
          <Checkout
            onPlace={placeOrder}
            onBack={() => setPage('cart')}
            user={user}
          />
        )}
        {page === 'account' && (
          <Account
            user={user}
            orders={orders}
            setUser={setUser}
            onEditProfile={(u) => setUser({ ...user, ...u })}
          />
        )}
        {page === 'admin' && (
          <AdminPanel
            isAdmin={isAdmin}
            products={products}
            createProduct={createProduct}
            editProduct={editProduct}
            deleteProduct={deleteProduct}
            orders={orders}
            setOrders={setOrders}
          />
        )}
      </main>
      <footer className="footer">
        Simple frontend demo for Vite + React
      </footer>
      <ProductModal product={selected} onClose={() => setSelected(null)} onAdd={addToCart} />
      <Toast message={toast} onClose={() => setToast('')} />
    </div>
  );
}
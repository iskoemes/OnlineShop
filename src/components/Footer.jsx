// Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Online shop</p>
        <p>Email: ryskeldimyrzaliev20@icloud.com</p>
        {/* <div className="footer-links">
          <a href="#">политика конфиденциальности</a> | <a href="/terms">Условия предоставления услуг</a>
        </div> */}
      </div>
    </footer>
  );
}
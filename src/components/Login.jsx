import React, { useState } from "react";
import { loginUser } from "./LoginApi";

export default function Login({ onSuccess, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const userData = await loginUser(email, password);
      setMessage("Успешный вход");
      onSuccess && onSuccess(userData);  
    } catch (err) {
      setMessage("Ошибка: " + err.message);
    }
  };

  return (
    <div style={{ width: 300, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Вход</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <button onClick={handleLogin} style={{ width: "100%", padding: 10 }}>
        Войти
      </button>

      <button onClick={onBack} style={{ width: "100%", padding: 10, marginTop: 10 }}>
        Назад
      </button>

      <p style={{ marginTop: 15 }}>{message}</p>
    </div>
  );
}

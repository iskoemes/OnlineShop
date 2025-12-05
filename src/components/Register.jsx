
import React, { useState } from "react";
import { registerUser } from "./RegisterApi";

export default function Register({ onSuccess, onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const user = await registerUser(name, email, password);
      setMessage("Успешная регистрация");
      onSuccess &&
        onSuccess({
          uid: user.uid,
          name,
          email: user.email,
          isAdmin: false
        });
    } catch (err) {
      setMessage("Ошибка: " + err.message);
    }
  };

  return (
    <div style={{ width: 300, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Регистрация</h2>

      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

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

      <button onClick={handleRegister} style={{ width: "100%", padding: 10 }}>
        Зарегистрироваться
      </button>

      <button onClick={onBack} style={{ width: "100%", padding: 10, marginTop: 10 }}>
        Назад
      </button>

      <p style={{ marginTop: 15 }}>{message}</p>
    </div>
  );
}
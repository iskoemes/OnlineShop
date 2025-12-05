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

            if (onSuccess) onSuccess(userData);
        } catch (err) {
            console.error("LOGIN ERROR:", err.code, err.message);
            setMessage("Ошибка: " + err.message);
        }
    };

    return (
        <div className="login-form">
            <h2 className="login-title">Вход</h2>

            <label className="form-label">Email</label>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="form-input"
            />

            <label className="form-label">Пароль</label>
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-input"
            />

            <button onClick={handleLogin} className="button-primary">
                Войти
            </button>

            <button onClick={onBack} className="button-secondary" style={{ marginTop: 10 }}>
                Назад
            </button>

            <p className="login-message">{message}</p>
        </div>
    );
}
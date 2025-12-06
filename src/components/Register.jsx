import React, { useState } from "react";
import { registerUser } from "./RegisterApi";

export default function Register({ onSuccess, onBack }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async () => {
        console.log("Данные, которые отправляем:", { name, email, password, passwordLength: password.length });
        if (!name.trim() || !email.trim() || !password.trim()) {
            setMessage("Заполните все поля");
            setMessage("Заполните все поля");
            return;
        }

        setMessage("Регистрируем...");

        try {
            await registerUser(name, email, password);

            setName("");
            setEmail("");
            setPassword("");
            setMessage("Успешно! Перенаправляем...");

            setTimeout(() => onSuccess?.(), 800);

            // переходим на страницу логина
            if (onSuccess) onSuccess();
        } catch (err) {
            const msg = {
                "auth/email-already-in-use": "Этот email уже занят",
                "auth/weak-password": "Пароль должен быть ≥ 6 символов",
                "auth/invalid-email": "Неверный email",
            }[err.code] || `Ошибка: ${err.message}`;

            setMessage(msg);
        }
    };

    return (
        <div className="register-form">
            <h2 className="register-title">Регистрация</h2>

            <label className="form-label">Имя</label>
            <input
                type="text"
                placeholder="Имя"
                value={name}
                onChange={e => setName(e.target.value)}
                className="form-input"
            />

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

            <button onClick={handleRegister} className="button-primary">
                Зарегистрироваться
            </button>

            <button onClick={onBack} className="button-secondary" style={{ marginTop: 10 }}>
                Назад
            </button>

            <p className="register-message">{message}</p>
        </div>
    );
}
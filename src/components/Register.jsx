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

            <button
                onClick={onBack}
                style={{ width: "100%", padding: 10, marginTop: 10 }}
            >
                Назад
            </button>

            <p style={{ marginTop: 15 }}>{message}</p>
        </div>
    );
}
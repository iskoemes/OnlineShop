import React, { useState } from "react";
import { registerUser } from "./RegisterApi";

export default function Register({ onSuccess, onBack }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async () => {
        try {
            await registerUser(name, email, password);

            setMessage("Успешная регистрация, теперь войдите");
            setName("");
            setEmail("");
            setPassword("");

            // переходим на страницу логина
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error("REGISTER ERROR:", err.code, err.message);

            if (err.code === "auth/email-already-in-use") {
                setMessage("Такой email уже зарегистрирован. Попробуйте войти.");
            } else if (err.code === "auth/weak-password") {
                setMessage("Пароль должен быть не менее 6 символов.");
            } else if (err.code === "auth/invalid-email") {
                setMessage("Некорректный email.");
            } else {
                setMessage("Ошибка: " + err.message);
            }
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
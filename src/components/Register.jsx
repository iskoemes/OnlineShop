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
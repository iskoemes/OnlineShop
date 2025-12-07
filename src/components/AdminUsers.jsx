import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function AdminUsers({ currentUser }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const load = async () => {
            const snap = await getDocs(collection(db, "users"));
            setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        };
        load();
    }, []);

    const toggleAdmin = async (userId, makeAdmin) => {
        await updateDoc(doc(db, "users", userId), { admin: makeAdmin });
        setUsers(users.map(u =>
            u.uid === userId ? { ...u, admin: makeAdmin } : u
        ));
    };

    if (!currentUser?.isAdmin) {
        return <p className="text-gray" style={{ margin: 40 }}>Нет доступа</p>;
    }

    return (
        <div className="admin-users">
            <h2 className="text-large text-bold" style={{ marginBottom: 18 }}>Пользователи</h2>
            <table className="admin-table">
                <thead>
                <tr>
                    <th>Email</th>
                    <th>Имя</th>
                    <th>Админ</th>
                    <th>Действие</th>
                </tr>
                </thead>
                <tbody>
                {users.map(u => (
                    <tr key={u.uid}>
                        <td>{u.email}</td>
                        <td>{u.name}</td>
                        <td>{u.admin ? "Да" : "Нет"}</td>
                        <td>
                            {u.uid === currentUser.uid ? (
                                <span className="text-gray">Это вы</span>
                            ) : u.admin ? (
                                <button className="button-secondary" onClick={() => toggleAdmin(u.uid, false)}>
                                    Убрать админа
                                </button>
                            ) : (
                                <button className="button-primary" onClick={() => toggleAdmin(u.uid, true)}>
                                    Сделать админом
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
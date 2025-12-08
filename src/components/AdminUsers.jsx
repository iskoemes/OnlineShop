import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function AdminUsers({ currentUser }) {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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

    const filteredUsers = users.filter(u => {
        const matchesSearch = !searchTerm ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesRole = filterRole === 'all' ||
            (filterRole === 'users' && !u.admin) ||
            (filterRole === 'admins' && u.admin);
        return matchesSearch && matchesRole;
    });

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    if (!currentUser?.isAdmin) {
        return <p className="text-gray" style={{ margin: 40 }}>Нет доступа</p>;
    }

    return (
        <div className="admin-users">
            <h2 className="text-large text-bold" style={{ marginBottom: 18 }}>Пользователи</h2>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input
                    className="form-input"
                    placeholder="Поиск по email или имени"
                    value={searchTerm}
                    onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                />
                <select
                    className="form-input"
                    value={filterRole}
                    onChange={e => { setFilterRole(e.target.value); setCurrentPage(1); }}
                    style={{ width: 'auto' }}
                >
                    <option value="all">Все</option>
                    <option value="users">Пользователи</option>
                    <option value="admins">Админы</option>
                </select>
            </div>

            <div style={{
                maxHeight: "400px",
                overflowY: "auto",
                border: "1px solid #ccc",
                borderRadius: "8px"
            }}>
                <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead style={{ position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
                        <tr>
                            <th>Email</th>
                            <th>Имя</th>
                            <th>Админ</th>
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentUsers.map(u => (
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

            <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "15px",
                gap: "8px"
            }}>
                <button 
                    className="button-secondary"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Назад
                </button>

                <span style={{ padding: "6px 12px" }}>
                    {currentPage} / {totalPages}
                </span>

                <button 
                    className="button-secondary"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Вперед
                </button>
            </div>
        </div>
    );
}

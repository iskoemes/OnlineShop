import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', gap: '5px' }}>
      <button 
        className="button-secondary" 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        style={{ padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', background: currentPage === 1 ? '#f0f0f0' : '#fff' }}
      >
        Предыдущая
      </button>
      {pageNumbers.map(number => (
        <button 
          key={number} 
          onClick={() => onPageChange(number)} 
          className={currentPage === number ? 'active' : ''} 
          style={{ 
            padding: '5px 10px', 
            border: '1px solid #ccc', 
            borderRadius: '4px', 
            background: currentPage === number ? '#007bff' : '#fff', 
            color: currentPage === number ? '#fff' : '#000' 
          }}
        >
          {number}
        </button>
      ))}
      <button 
        className="button-secondary" 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === pageNumbers.length}
        style={{ padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', background: currentPage === pageNumbers.length ? '#f0f0f0' : '#fff' }}
      >
        Следующий
      </button>
    </div>
  );
};

export default function AdminUsers({ currentUser }) {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const usersListRef = useRef(null);

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

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        setCurrentPage(1);
        if (usersListRef.current) {
          usersListRef.current.scrollTop = 0;
        }
    }, [searchTerm, filterRole]);

    const handlePageChange = (page) => {
        if (page < 1 || page > Math.ceil(filteredUsers.length / itemsPerPage)) return;
        setCurrentPage(page);
        if (usersListRef.current) {
          usersListRef.current.scrollTop = 0;
        }
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
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <select
                    className="form-input"
                    value={filterRole}
                    onChange={e => setFilterRole(e.target.value)}
                    style={{ width: 'auto' }}
                >
                    <option value="all">Все</option>
                    <option value="users">Пользователи</option>
                    <option value="admins">Админы</option>
                </select>
            </div>
            <div style={{ 
                maxHeight: '400px', 
                overflowY: 'auto', 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                gap: '20px' 
            }} ref={usersListRef}>
                {currentUsers.map(u => (
                    <div key={u.uid} style={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '16px',
                        width: '300px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        backgroundColor: '#fff',
                        textAlign: 'center'
                    }}>
                        <div style={{ marginBottom: '8px' }}><strong>Email:</strong> {u.email}</div>
                        <div style={{ marginBottom: '8px' }}><strong>Имя:</strong> {u.name}</div>
                        <div style={{ marginBottom: '8px' }}><strong>Админ:</strong> {u.admin ? "Да" : "Нет"}</div>
                        <div>
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
                        </div>
                    </div>
                ))}
            </div>
            <Pagination 
                currentPage={currentPage} 
                totalItems={filteredUsers.length} 
                itemsPerPage={itemsPerPage} 
                onPageChange={handlePageChange} 
            />
        </div>
    );
}
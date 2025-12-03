import React, { useState } from 'react';

export default function EditProfile({ user, onSave }) {
  const [name, setName] = useState(user.name || '');

  return (
    <div className="flex-gap" style={{ marginTop: '15px' }}>
      <input className="form-input" value={name} onChange={e => setName(e.target.value)} style={{ flex: 1 }} />
      <button className="button-primary" onClick={() => onSave({ name })}>Сохранить</button>
    </div>
  );
}
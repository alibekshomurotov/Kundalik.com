import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard({ admin }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'student',
    password: '',
    grade: '9',
    classLetter: 'A',
    subject: ''
  });

  // Demo ma'lumotlar
  useEffect(() => {
    // Admin tomonidan qo'shilgan foydalanuvchilar
    const storedUsers = JSON.parse(localStorage.getItem('adminUsers') || '[]');
    if (storedUsers.length > 0) {
      setUsers(storedUsers);
    } else {
      // Boshlang'ich foydalanuvchilar
      const initialUsers = [
        { id: 1, name: 'Ali Aliyev', email: 'ali@maktab.uz', role: 'student', password: '123456', grade: '9', classLetter: 'E', status: 'active', createdBy: 'Bosh Admin', createdAt: '2024-01-15' },
        { id: 2, name: 'Olim Karimov', email: 'teacher@maktab.uz', role: 'teacher', password: '123456', subject: 'Matematika', status: 'active', createdBy: 'Bosh Admin', createdAt: '2024-01-10' }
      ];
      setUsers(initialUsers);
      localStorage.setItem('adminUsers', JSON.stringify(initialUsers));
    }

    // Kutilayotgan so'rovlar
    const requests = JSON.parse(localStorage.getItem('pendingRequests') || '[]');
    setPendingRequests(requests);
  }, []);

  // Yangi foydalanuvchi qo'shish
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert('Barcha maydonlarni to\'ldiring!');
      return;
    }

    const newUserObj = {
      id: Date.now(),
      ...newUser,
      status: 'active',
      createdBy: admin?.name || 'Admin',
      createdAt: new Date().toLocaleDateString()
    };

    const updatedUsers = [...users, newUserObj];
    setUsers(updatedUsers);
    localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));
    
    alert(`${newUser.name} muvaffaqiyatli qo'shildi!`);
    
    // Formani tozalash
    setNewUser({
      name: '',
      email: '',
      role: 'student',
      password: '',
      grade: '9',
      classLetter: 'A',
      subject: ''
    });
  };

  // Foydalanuvchini o'chirish
  const handleDeleteUser = (id) => {
    if (window.confirm('Foydalanuvchini o\'chirishni tasdiqlaysizmi?')) {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));
      alert('Foydalanuvchi o\'chirildi!');
    }
  };

  // Statusni o'zgartirish
  const handleToggleStatus = (id) => {
    const updatedUsers = users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));
  };

  // So'rovni tasdiqlash
  const handleApproveRequest = (id) => {
    const request = pendingRequests.find(r => r.id === id);
    if (request) {
      // Foydalanuvchi qo'shish
      const newUserObj = {
        id: Date.now(),
        name: request.name,
        email: request.email,
        role: 'student',
        password: '123456', // Default parol
        status: 'active',
        createdBy: 'Admin (Request)',
        createdAt: new Date().toLocaleDateString()
      };

      const updatedUsers = [...users, newUserObj];
      setUsers(updatedUsers);
      localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));

      // So'rovni o'chirish
      const updatedRequests = pendingRequests.filter(r => r.id !== id);
      setPendingRequests(updatedRequests);
      localStorage.setItem('pendingRequests', JSON.stringify(updatedRequests));

      alert('So\'rov tasdiqlandi va foydalanuvchi qo\'shildi!');
    }
  };

  // So'rovni rad etish
  const handleRejectRequest = (id) => {
    const updatedRequests = pendingRequests.filter(r => r.id !== id);
    setPendingRequests(updatedRequests);
    localStorage.setItem('pendingRequests', JSON.stringify(updatedRequests));
    alert('So\'rov rad etildi!');
  };

  // Barcha foydalanuvchilarni o'chirish (faqat admin)
  const handleClearAllUsers = () => {
    if (window.confirm('BARCHA foydalanuvchilarni o\'chirishni tasdiqlaysizmi?')) {
      setUsers([]);
      localStorage.removeItem('adminUsers');
      alert('Barcha foydalanuvchilar o\'chirildi!');
    }
  };

  // Statistika
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    students: users.filter(u => u.role === 'student').length,
    teachers: users.filter(u => u.role === 'teacher').length,
    pendingRequests: pendingRequests.length
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f9ff',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(90deg, #1a1a2e, #16213e)',
        color: 'white',
        padding: '25px',
        borderRadius: '15px',
        marginBottom: '30px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>👑 Admin Boshqaruv Paneli</h1>
            <p style={{ margin: '5px 0 0 0', opacity: 0.8 }}>Xush kelibsiz, {admin?.name}</p>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem('isAdmin');
              navigate('/admin/login');
            }}
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.background = 'rgba(255,255,255,0.2)'}
          >
            Chiqish
          </button>
        </div>
      </div>

      {/* Statistikalar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '36px', fontWeight: '700', color: '#4361ee' }}>{stats.totalUsers}</div>
          <div style={{ color: '#666', fontSize: '14px' }}>Jami foydalanuvchilar</div>
        </div>
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '36px', fontWeight: '700', color: '#28a745' }}>{stats.activeUsers}</div>
          <div style={{ color: '#666', fontSize: '14px' }}>Faol foydalanuvchilar</div>
        </div>
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '36px', fontWeight: '700', color: '#ff6b6b' }}>{stats.pendingRequests}</div>
          <div style={{ color: '#666', fontSize: '14px' }}>Kutilayotgan so'rovlar</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '30px',
        background: 'white',
        padding: '15px',
        borderRadius: '12px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
      }}>
        <button 
          onClick={() => setActiveTab('users')}
          style={{
            flex: 1,
            padding: '15px',
            background: activeTab === 'users' ? '#4361ee' : '#f8f9fa',
            color: activeTab === 'users' ? 'white' : '#333',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          👥 Foydalanuvchilar
        </button>
        <button 
          onClick={() => setActiveTab('add')}
          style={{
            flex: 1,
            padding: '15px',
            background: activeTab === 'add' ? '#28a745' : '#f8f9fa',
            color: activeTab === 'add' ? 'white' : '#333',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          ➕ Yangi qo'shish
        </button>
        <button 
          onClick={() => setActiveTab('requests')}
          style={{
            flex: 1,
            padding: '15px',
            background: activeTab === 'requests' ? '#ffc107' : '#f8f9fa',
            color: activeTab === 'requests' ? '#333' : '#333',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          ⏳ So'rovlar ({stats.pendingRequests})
        </button>
      </div>

      {/* Content */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        {/* Foydalanuvchilar ro'yxati */}
        {activeTab === 'users' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ margin: 0 }}>Barcha foydalanuvchilar</h3>
              <button 
                onClick={handleClearAllUsers}
                style={{
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                🗑️ Barchasini o'chirish
              </button>
            </div>
            
            {users.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>👤</div>
                <h4>Foydalanuvchilar yo'q</h4>
                <p>Yangi foydalanuvchi qo'shing</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f8f9fa' }}>
                      <th style={{ padding: '15px', textAlign: 'left' }}>ID</th>
                      <th style={{ padding: '15px', textAlign: 'left' }}>Ism</th>
                      <th style={{ padding: '15px', textAlign: 'left' }}>Email</th>
                      <th style={{ padding: '15px', textAlign: 'left' }}>Rol</th>
                      <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
                      <th style={{ padding: '15px', textAlign: 'left' }}>Yaratilgan</th>
                      <th style={{ padding: '15px', textAlign: 'left' }}>Harakatlar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '15px' }}>#{user.id}</td>
                        <td style={{ padding: '15px' }}>{user.name}</td>
                        <td style={{ padding: '15px' }}>{user.email}</td>
                        <td style={{ padding: '15px' }}>
                          <span style={{
                            padding: '5px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            background: user.role === 'teacher' ? '#ffc107' : '#17a2b8',
                            color: user.role === 'teacher' ? '#333' : 'white'
                          }}>
                            {user.role === 'teacher' ? 'O\'qituvchi' : 'O\'quvchi'}
                          </span>
                        </td>
                        <td style={{ padding: '15px' }}>
                          <span style={{
                            padding: '5px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            background: user.status === 'active' ? '#28a745' : '#dc3545',
                            color: 'white'
                          }}>
                            {user.status === 'active' ? 'Faol' : 'Nofaol'}
                          </span>
                        </td>
                        <td style={{ padding: '15px' }}>{user.createdAt}</td>
                        <td style={{ padding: '15px' }}>
                          <button 
                            onClick={() => handleToggleStatus(user.id)}
                            style={{
                              background: user.status === 'active' ? '#dc3545' : '#28a745',
                              color: 'white',
                              border: 'none',
                              padding: '8px 15px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              marginRight: '10px'
                            }}
                          >
                            {user.status === 'active' ? '❌ Bloklash' : '✅ Faollashtirish'}
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            style={{
                              background: '#6c757d',
                              color: 'white',
                              border: 'none',
                              padding: '8px 15px',
                              borderRadius: '6px',
                              cursor: 'pointer'
                            }}
                          >
                            🗑️ O'chirish
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Yangi foydalanuvchi qo'shish */}
        {activeTab === 'add' && (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ marginBottom: '25px' }}>Yangi foydalanuvchi qo'shish</h3>
            
            <div style={{ display: 'grid', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Ism va Familiya</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="Ali Aliyev"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="ali@maktab.uz"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Parol</label>
                <input
                  type="text"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  placeholder="123456"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Rol</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '16px',
                    background: 'white'
                  }}
                >
                  <option value="student">O'quvchi</option>
                  <option value="teacher">O'qituvchi</option>
                </select>
              </div>
              
              {newUser.role === 'student' ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Sinf</label>
                    <select
                      value={newUser.grade}
                      onChange={(e) => setNewUser({...newUser, grade: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    >
                      {[1,2,3,4,5,6,7,8,9,10,11].map(num => (
                        <option key={num} value={num}>{num}-sinf</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Sinf harfi</label>
                    <select
                      value={newUser.classLetter}
                      onChange={(e) => setNewUser({...newUser, classLetter: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    >
                      {['A','B','D','E','F'].map(letter => (
                        <option key={letter} value={letter}>{letter}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Fan</label>
                  <input
                    type="text"
                    value={newUser.subject}
                    onChange={(e) => setNewUser({...newUser, subject: e.target.value})}
                    placeholder="Matematika"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                </div>
              )}
              
              <button 
                onClick={handleAddUser}
                style={{
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '15px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '20px'
                }}
              >
                ✅ Foydalanuvchini qo'shish
              </button>
            </div>
          </div>
        )}

        {/* So'rovlar */}
        {activeTab === 'requests' && (
          <>
            <h3 style={{ marginBottom: '25px' }}>Kutilayotgan ro'yxatdan o'tish so'rovlari</h3>
            
            {pendingRequests.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>📭</div>
                <h4>So'rovlar yo'q</h4>
                <p>Hozircha yangi so'rovlar kelmagan</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '20px' }}>
                {pendingRequests.map(request => (
                  <div key={request.id} style={{
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0' }}>{request.name}</h4>
                      <p style={{ margin: '0 0 5px 0', color: '#666' }}>{request.email}</p>
                      <small style={{ color: '#999' }}>So'rov vaqti: {request.timestamp}</small>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        onClick={() => handleApproveRequest(request.id)}
                        style={{
                          background: '#28a745',
                          color: 'white',
                          border: 'none',
                          padding: '10px 20px',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        ✅ Tasdiqlash
                      </button>
                      <button 
                        onClick={() => handleRejectRequest(request.id)}
                        style={{
                          background: '#dc3545',
                          color: 'white',
                          border: 'none',
                          padding: '10px 20px',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        ❌ Rad etish
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '40px',
        padding: '20px',
        color: '#666',
        fontSize: '14px'
      }}>
        <p>© 2024 Maktab Admin Tizimi. Faqat admin tomonidan boshqariladi.</p>
      </div>
    </div>
  );
}

export default AdminDashboard;
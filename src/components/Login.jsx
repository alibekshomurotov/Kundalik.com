import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Demo foydalanuvchilar (o'quvchi, o'qituvchi, admin)
    const demoUsers = [
      { 
        id: 1, 
        email: 'ali@maktab.uz', 
        password: '123456', 
        name: 'Ali Aliyev', 
        role: 'student', 
        grade: '9', 
        classLetter: 'E'
      },
      { 
        id: 2, 
        email: 'vali@maktab.uz', 
        password: '123456', 
        name: 'Vali Valiyev', 
        role: 'student', 
        grade: '10', 
        classLetter: 'B'
      },
      { 
        id: 3, 
        email: 'teacher@maktab.uz', 
        password: '123456', 
        name: 'Olim Karimov', 
        role: 'teacher', 
        subject: 'Matematika'
      },
      { 
        id: 4, 
        email: 'admin@maktab.uz', 
        password: 'admin123', 
        name: 'Admin Adminov', 
        role: 'admin'
      }
    ];

    localStorage.setItem('schoolUsers', JSON.stringify(demoUsers));

    const user = demoUsers.find(u => 
      u.email === formData.email && u.password === formData.password
    );

    if (user) {
      onLogin(user);
      setTimeout(() => {
        // Role bo'yicha yo'naltirish
        switch(user.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'teacher':
            navigate('/teacher');
            break;
          default:
            navigate('/dashboard');
        }
      }, 300);
    } else {
      setError('Noto\'g\'ri email yoki parol!');
    }
    
    setLoading(false);
  };

  const quickLogin = (type) => {
    let email, password;
    
    switch(type) {
      case 'student':
        email = 'ali@maktab.uz';
        password = '123456';
        break;
      case 'teacher':
        email = 'teacher@maktab.uz';
        password = '123456';
        break;
      case 'admin':
        email = 'admin@maktab.uz';
        password = 'admin123';
        break;
      default:
        return;
    }
    
    setFormData({ email, password });
    setLoading(true);
    
    const demoUsers = [
      { 
        id: 1, 
        email: 'ali@maktab.uz', 
        password: '123456', 
        name: 'Ali Aliyev', 
        role: 'student', 
        grade: '9', 
        classLetter: 'E'
      },
      { 
        id: 3, 
        email: 'teacher@maktab.uz', 
        password: '123456', 
        name: 'Olim Karimov', 
        role: 'teacher', 
        subject: 'Matematika'
      },
      { 
        id: 4, 
        email: 'admin@maktab.uz', 
        password: 'admin123', 
        name: 'Admin Adminov', 
        role: 'admin'
      }
    ];
    
    localStorage.setItem('schoolUsers', JSON.stringify(demoUsers));
    
    const user = demoUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      onLogin(user);
      setTimeout(() => {
        switch(user.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'teacher':
            navigate('/teacher');
            break;
          default:
            navigate('/dashboard');
        }
      }, 300);
    }
    
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '500px',
        background: 'white',
        borderRadius: '15px',
        padding: '30px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: '800', 
            margin: '0 0 10px 0',
            color: '#4361ee'
          }}>
            Maktab Tizimi
          </h1>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Tizimga kirish (Admin: admin@maktab.uz / admin123)
          </p>
        </div>
        
        {error && (
          <div style={{ 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '20px', 
            backgroundColor: 'rgba(220, 53, 69, 0.1)',
            color: '#dc3545',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="email@maktab.uz"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 15px',
                fontSize: '16px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                background: '#f8f9fa'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
              Parol
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Parolingiz"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 15px',
                  fontSize: '16px',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  background: '#f8f9fa'
                }}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ 
                  position: 'absolute', 
                  right: '10px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  background: 'none', 
                  border: 'none', 
                  color: '#999', 
                  cursor: 'pointer'
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%',
              background: '#4361ee',
              color: 'white',
              border: 'none',
              padding: '14px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            {loading ? 'Kirilmoqda...' : 'Kirish'}
          </button>
        </form>
        
        <div style={{ marginBottom: '20px' }}>
          <p style={{ color: '#666', marginBottom: '10px', textAlign: 'center' }}>Tezkor kirish:</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => quickLogin('student')}
              style={{
                flex: 1,
                padding: '10px',
                background: '#4361ee',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              O'quvchi
            </button>
            <button 
              onClick={() => quickLogin('teacher')}
              style={{
                flex: 1,
                padding: '10px',
                background: '#7209b7',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              O'qituvchi
            </button>
            <button 
              onClick={() => quickLogin('admin')}
              style={{
                flex: 1,
                padding: '10px',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Admin
            </button>
          </div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <Link to="/register" style={{ color: '#4361ee', textDecoration: 'none' }}>
            Hisobingiz yo'qmi? Ro'yxatdan o'ting
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
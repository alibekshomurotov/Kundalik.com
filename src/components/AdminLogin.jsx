import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin({ onAdminLogin }) {
  const navigate = useNavigate();
  const [adminCode, setAdminCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Adminlar ro'yxati (faqat admin tomonidan qo'shilgan)
  const admins = [
    { id: 1, name: 'Bosh Admin', code: 'ADMIN123' },
    { id: 2, name: 'Direktor', code: 'DIRECTOR2024' },
    { id: 3, name: 'IT Admin', code: 'TECH456' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Koddan adminni topish
    const admin = admins.find(a => a.code === adminCode.trim());

    if (admin) {
      // Admin ma'lumotlarini saqlash
      const adminData = {
        ...admin,
        role: 'admin',
        email: 'admin@maktab.uz',
        permissions: ['all']
      };
      
      localStorage.setItem('adminData', JSON.stringify(adminData));
      localStorage.setItem('isAdmin', 'true');
      
      onAdminLogin(adminData);
      
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 300);
    } else {
      setError('Noto\'g\'ri admin kodi!');
    }
    
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '15px',
        padding: '40px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(45deg, #ff0080, #ff8c00)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '24px',
            color: 'white'
          }}>
            👑
          </div>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: '700', 
            color: 'white',
            marginBottom: '10px'
          }}>
            Admin Panel
          </h1>
          <p style={{ color: '#aaa', fontSize: '14px' }}>
            Faqat admin kod orqali kirish mumkin
          </p>
        </div>
        
        {error && (
          <div style={{ 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '20px', 
            backgroundColor: 'rgba(220, 53, 69, 0.2)',
            color: '#ff6b6b',
            fontSize: '14px',
            textAlign: 'center',
            border: '1px solid rgba(220, 53, 69, 0.3)'
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '10px', 
              fontWeight: '600', 
              color: '#fff',
              fontSize: '14px'
            }}>
              🔐 Admin Kodi
            </label>
            <input
              type="password"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              placeholder="Masalan: ADMIN123"
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '16px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '10px',
                color: 'white',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#ff0080'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
            />
            <p style={{ color: '#888', fontSize: '12px', marginTop: '8px' }}>
              Demo kod: ADMIN123, DIRECTOR2024, TECH456
            </p>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%',
              background: 'linear-gradient(45deg, #ff0080, #ff8c00)',
              color: 'white',
              border: 'none',
              padding: '15px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            {loading ? (
              <>
                <span style={{
                  display: 'inline-block',
                  width: '16px',
                  height: '16px',
                  border: '2px solid white',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: '8px'
                }}></span>
                Tekshirilmoqda...
              </>
            ) : (
              'Kirish'
            )}
          </button>
        </form>
        
        <div style={{ 
          marginTop: '30px', 
          paddingTop: '20px', 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)' 
        }}>
          <button 
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              background: 'transparent',
              color: '#aaa',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#aaa';
            }}
          >
            ← Asosiy tizimga qaytish
          </button>
        </div>
        
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            ::placeholder {
              color: #888;
            }
          `}
        </style>
      </div>
    </div>
  );
}

export default AdminLogin;
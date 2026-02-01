import { useState, useRef } from 'react';

function Profile({ user, showNotification }) {
  const [profileData, setProfileData] = useState({
    name: 'Ali Aliyev',
    email: 'ali@maktab.uz',
    grade: '9',
    classLetter: 'E',
    phone: '+998 90 123 45 67',
    address: 'Toshkent',
    avatar: null,
    pendingAvatar: null // Admin tasdiqini kutilayotgan rasm
  });

  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Agar admin bo'lsa, darhol saqlash
    if (user?.role === 'admin') {
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      showNotification('Profil muvaffaqiyatli saqlandi!', 'success');
      setIsEditing(false);
    } else {
      // Admin bo'lmagan foydalanuvchilar uchun admin tasdiqini kutish
      showNotification('Profil o\'zgarishlari admin tasdiqini kutmoqda...', 'info');
      
      // Bu yerda API ga so'rov yuboriladi yoki localStorage'ga saqlanadi
      const pendingUpdates = JSON.parse(localStorage.getItem('pendingUpdates') || '[]');
      pendingUpdates.push({
        userId: user?.id,
        name: profileData.name,
        email: profileData.email,
        timestamp: new Date().toISOString(),
        type: 'profile_update'
      });
      localStorage.setItem('pendingUpdates', JSON.stringify(pendingUpdates));
      
      setIsEditing(false);
    }
  };

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showNotification('Rasm hajmi 2MB dan oshmasligi kerak!', 'warning');
      return;
    }

    if (!file.type.startsWith('image/')) {
      showNotification('Faqat rasm fayllarini yuklash mumkin!', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (user?.role === 'admin') {
        // Admin uchun darhol o'zgartirish
        setProfileData(prev => ({
          ...prev,
          avatar: event.target.result
        }));
        showNotification('Rasm muvaffaqiyatli yuklandi!', 'success');
      } else {
        // Oddiy foydalanuvchi uchun admin tasdiqini kutish
        setProfileData(prev => ({
          ...prev,
          pendingAvatar: event.target.result
        }));
        
        // Admin tasdiqi uchun saqlash
        const pendingAvatars = JSON.parse(localStorage.getItem('pendingAvatars') || '[]');
        pendingAvatars.push({
          userId: user?.id,
          avatar: event.target.result,
          name: user?.name,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('pendingAvatars', JSON.stringify(pendingAvatars));
        
        showNotification('Rasm yuklandi! Admin tasdiqini kuting...', 'info');
      }
    };
    reader.readAsDataURL(file);
  };

  // Admin uchun ruxsat berish funksiyasi
  const approvePendingAvatar = () => {
    if (profileData.pendingAvatar && user?.role === 'admin') {
      setProfileData(prev => ({
        ...prev,
        avatar: prev.pendingAvatar,
        pendingAvatar: null
      }));
      showNotification('Rasm tasdiqlandi va yangilandi!', 'success');
    }
  };

  return (
    <div className="container py-5">
      {/* Admin holati uchun xabar */}
      {user?.role === 'admin' && (
        <div className="alert alert-success mb-4">
          <strong>Admin rejimi:</strong> Sizning barcha o'zgarishlaringiz darhol amalga oshiriladi.
        </div>
      )}
      
      {/* Kutilayotgan rasm mavjud bo'lsa (faqat admin uchun) */}
      {profileData.pendingAvatar && user?.role === 'admin' && (
        <div className="alert alert-warning mb-4">
          <strong>Kutilayotgan rasm tasdiqlash:</strong>
          <div className="d-flex align-items-center mt-2">
            <img 
              src={profileData.pendingAvatar} 
              alt="Kutilayotgan rasm" 
              style={{width: '80px', height: '80px', borderRadius: '50%', marginRight: '15px'}}
            />
            <div>
              <button className="btn btn-success btn-sm me-2" onClick={approvePendingAvatar}>
                ✅ Tasdiqlash
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => setProfileData(prev => ({...prev, pendingAvatar: null}))}>
                ❌ Rad etish
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <div className="mb-3" style={{ cursor: isEditing ? 'pointer' : 'default' }}>
                <div 
                  className="rounded-circle bg-primary d-inline-flex align-items-center justify-content-center position-relative"
                  style={{ 
                    width: '150px', 
                    height: '150px',
                    overflow: 'hidden',
                    border: isEditing ? '3px dashed #0d6efd' : 'none'
                  }}
                  onClick={handleAvatarClick}
                >
                  {profileData.avatar ? (
                    <img 
                      src={profileData.avatar} 
                      alt="Profil rasmi" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span className="text-white fs-1">{profileData.name.charAt(0)}</span>
                  )}
                  
                  {isEditing && (
                    <div className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-2">
                      <i className="bi bi-camera text-white"></i>
                    </div>
                  )}
                </div>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
              
              <h4>{profileData.name}</h4>
              <p className="text-muted">
                {profileData.grade}-{profileData.classLetter} sinf
                {user?.role === 'admin' && <span className="badge bg-danger ms-2">Admin</span>}
              </p>
              
              <div className="mt-4">
                <button 
                  className={`btn ${isEditing ? 'btn-secondary' : 'btn-primary'} w-100 mb-2`}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Bekor qilish' : 'Tahrirlash'}
                </button>
                
                {isEditing && (
                  <button className="btn btn-success w-100" onClick={handleSave}>
                    {user?.role === 'admin' ? 'Saqlash' : 'Adminga yuborish'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Shaxsiy ma'lumotlar</h5>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Ism va Familiya</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={profileData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Telefon</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Sinf</label>
                    <select
                      className="form-select"
                      name="grade"
                      value={profileData.grade}
                      onChange={handleChange}
                      disabled={!isEditing}
                    >
                      {[9,10,11].map(num => (
                        <option key={num} value={num}>{num}-sinf</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Sinf harfi</label>
                    <select
                      className="form-select"
                      name="classLetter"
                      value={profileData.classLetter}
                      onChange={handleChange}
                      disabled={!isEditing}
                    >
                      {['A','B','D','E','F'].map(letter => (
                        <option key={letter} value={letter}>{letter}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Manzil</label>
                  <textarea
                    className="form-control"
                    name="address"
                    rows="2"
                    value={profileData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                  ></textarea>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
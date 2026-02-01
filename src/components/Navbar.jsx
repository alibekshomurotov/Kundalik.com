// src/components/Navbar.jsx - ZAMONAVIY VERSIYA
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll effekti
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Demo bildirishnomalar
  useEffect(() => {
    const demoNotifications = [
      { 
        id: 1, 
        text: "Yangi dars jadvali mavjud", 
        time: "5 daqiqa oldin", 
        read: false,
        icon: "bi-calendar-week",
        color: "primary"
      },
      { 
        id: 2, 
        text: "Matematika testi natijalari chiqdi", 
        time: "1 soat oldin", 
        read: false,
        icon: "bi-journal-check",
        color: "success"
      },
      { 
        id: 3, 
        text: "Kutubxonadan yangi kitob qo'shildi", 
        time: "Kecha", 
        read: true,
        icon: "bi-book",
        color: "info"
      },
      { 
        id: 4, 
        text: "Yangi video dars qo'shildi", 
        time: "3 kun oldin", 
        read: true,
        icon: "bi-camera-video",
        color: "warning"
      }
    ];
    
    setNotifications(demoNotifications);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const handleLogout = () => {
    if (window.confirm("Tizimdan chiqishni xohlaysizmi?")) {
      onLogout();
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      alert(`Qidiruv: ${searchTerm}`);
      setSearchTerm('');
    }
  };

  const navItems = [
    { path: '/dashboard', label: 'Bosh sahifa', icon: 'bi-house' },
    { path: '/timetable', label: 'Dars Jadvali', icon: 'bi-calendar-week' },
    { path: '/library', label: 'Kutubxona', icon: 'bi-book' },
    { path: '/videos', label: 'Video Darslar', icon: 'bi-camera-video' },
    { path: '/gallery', label: 'Galereya', icon: 'bi-images' },
  ];

  if (user?.role === 'teacher') {
    navItems.splice(1, 0, { path: '/teacher', label: 'O\'qituvchi Paneli', icon: 'bi-speedometer2' });
  }

  if (user?.role === 'student') {
    navItems.splice(2, 0, { path: '/grades', label: 'Mening Baholarim', icon: 'bi-journal-check' });
  }

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-modern ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          {/* Logo va Brand */}
          <Link className="navbar-brand-modern d-flex align-items-center" to="/dashboard">
            <div className="logo-icon me-2">
              <i className="bi bi-journal-bookmark-fill"></i>
            </div>
            <div>
              <div className="brand-text">Maktab</div>
              <div className="brand-subtext">Dars Jadvali</div>
            </div>
          </Link>
          
          {/* Mobile Toggle */}
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          {/* Main Navigation */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              {navItems.map((item) => (
                <li className="nav-item" key={item.path}>
                  <Link 
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`} 
                    to={item.path}
                  >
                    <i className={`bi ${item.icon} me-2`}></i>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Search Bar */}
            <form className="d-flex me-3" onSubmit={handleSearch}>
              <div className="input-group input-search-modern">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Qidirish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-modern" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
            
            {/* Right Side Actions */}
            <ul className="navbar-nav ms-auto">
              {/* Notifications */}
              <li className="nav-item dropdown">
                <a 
                  className="nav-link notification-bell position-relative" 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setShowNotifications(!showNotifications);
                  }}
                >
                  <i className="bi bi-bell"></i>
                  {unreadCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </a>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="notification-dropdown">
                    <div className="notification-header">
                      <h6>Bildirishnomalar</h6>
                      <div className="actions">
                        {unreadCount > 0 && (
                          <button className="btn-link" onClick={markAllAsRead}>
                            Barchasini o'qilgan qilish
                          </button>
                        )}
                        {notifications.length > 0 && (
                          <button className="btn-link text-danger" onClick={clearNotifications}>
                            Tozalash
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="notification-list">
                      {notifications.length > 0 ? (
                        notifications.map(notif => (
                          <div 
                            key={notif.id} 
                            className={`notification-item ${!notif.read ? 'unread' : ''}`}
                            onClick={() => markAsRead(notif.id)}
                          >
                            <div className={`notification-icon bg-${notif.color}`}>
                              <i className={`bi ${notif.icon}`}></i>
                            </div>
                            <div className="notification-content">
                              <p className="mb-1">{notif.text}</p>
                              <small className="text-muted">{notif.time}</small>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-3">
                          <i className="bi bi-bell-slash display-6 text-muted mb-3"></i>
                          <p className="text-muted mb-0">Bildirishnomalar yo'q</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </li>
              
              {/* User Profile */}
              <li className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle d-flex align-items-center user-profile" 
                  href="#" 
                  id="navbarDropdown" 
                  role="button" 
                  data-bs-toggle="dropdown"
                >
                  <div className="user-avatar me-2">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      <div className="avatar-placeholder">
                        {user?.name?.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>
                  <div className="user-info">
                    <div className="user-name">{user?.name || 'Foydalanuvchi'}</div>
                    <div className="user-role">
                      {user?.role === 'teacher' ? 'O\'qituvchi' : 'O\'quvchi'}
                    </div>
                  </div>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      <i className="bi bi-person me-2"></i>
                      Profil
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      <i className="bi bi-gear me-2"></i>
                      Sozlamalar
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  {user?.role === 'teacher' && (
                    <li>
                      <Link className="dropdown-item" to="/teacher">
                        <i className="bi bi-speedometer2 me-2"></i>
                        O'qituvchi paneli
                      </Link>
                    </li>
                  )}
                  {user?.role === 'student' && (
                    <li>
                      <Link className="dropdown-item" to="/grades">
                        <i className="bi bi-journal-check me-2"></i>
                        Mening baholarim
                      </Link>
                    </li>
                  )}
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Chiqish
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Navbar Styles */}
      <style>
        {`
          .navbar-modern {
            background: rgba(255, 255, 255, 0.98) !important;
            backdrop-filter: blur(20px);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            padding: 15px 0;
            transition: all 0.3s ease;
            border-bottom: 3px solid;
            border-image: linear-gradient(90deg, #4361ee, #3a0ca3, #7209b7) 1;
          }
          
          .navbar-modern.scrolled {
            padding: 10px 0;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          }
          
          .navbar-brand-modern {
            font-weight: 800;
            font-size: 24px;
            color: transparent;
            background: linear-gradient(90deg, #4361ee, #3a0ca3, #7209b7);
            -webkit-background-clip: text;
            background-clip: text;
            text-decoration: none;
          }
          
          .logo-icon {
            font-size: 32px;
            background: linear-gradient(90deg, #4361ee, #3a0ca3);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          
          .brand-text {
            font-size: 18px;
            line-height: 1;
            font-weight: 800;
          }
          
          .brand-subtext {
            font-size: 12px;
            opacity: 0.8;
            line-height: 1;
            font-weight: 600;
          }
          
          .nav-link {
            font-weight: 600;
            padding: 10px 15px !important;
            margin: 0 5px;
            border-radius: 10px;
            transition: all 0.3s ease;
            color: #555 !important;
            position: relative;
          }
          
          .nav-link:hover {
            background: linear-gradient(90deg, rgba(67, 97, 238, 0.1), rgba(58, 12, 163, 0.1));
            color: #4361ee !important;
            transform: translateY(-2px);
          }
          
          .nav-link.active {
            background: linear-gradient(90deg, #4361ee, #3a0ca3);
            color: white !important;
            box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);
          }
          
          .nav-link.active::before {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 6px;
            height: 6px;
            background: #4361ee;
            border-radius: 50%;
          }
          
          .input-search-modern {
            width: 300px;
          }
          
          .input-search-modern .form-control {
            border: 2px solid #e0e0e0;
            border-radius: 10px 0 0 10px;
            padding: 10px 15px;
            font-size: 14px;
            transition: all 0.3s ease;
          }
          
          .input-search-modern .form-control:focus {
            border-color: #4361ee;
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
          }
          
          .input-search-modern .btn {
            border-radius: 0 10px 10px 0;
            background: linear-gradient(90deg, #4361ee, #3a0ca3);
            border: none;
            padding: 10px 20px;
          }
          
          .notification-bell {
            font-size: 20px;
            color: #555;
            padding: 10px !important;
            border-radius: 10px;
            transition: all 0.3s ease;
          }
          
          .notification-bell:hover {
            background: rgba(67, 97, 238, 0.1);
            color: #4361ee;
            transform: scale(1.1);
          }
          
          .notification-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            width: 400px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            overflow: hidden;
            animation: slideDown 0.3s ease;
          }
          
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .notification-header {
            padding: 20px;
            background: linear-gradient(90deg, #4361ee, #3a0ca3);
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .notification-header h6 {
            margin: 0;
            font-weight: 600;
          }
          
          .notification-header .btn-link {
            color: white;
            text-decoration: none;
            font-size: 14px;
            opacity: 0.9;
            transition: opacity 0.3s ease;
          }
          
          .notification-header .btn-link:hover {
            opacity: 1;
          }
          
          .notification-list {
            max-height: 400px;
            overflow-y: auto;
          }
          
          .notification-item {
            padding: 15px 20px;
            border-bottom: 1px solid #f0f0f0;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .notification-item:hover {
            background: #f8f9ff;
          }
          
          .notification-item.unread {
            background: #f0f4ff;
          }
          
          .notification-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            color: white;
            font-size: 18px;
          }
          
          .notification-content {
            flex: 1;
          }
          
          .notification-content p {
            margin: 0;
            font-weight: 500;
          }
          
          .user-profile {
            padding: 5px 15px;
            border-radius: 15px;
            background: rgba(67, 97, 238, 0.1);
            transition: all 0.3s ease;
          }
          
          .user-profile:hover {
            background: rgba(67, 97, 238, 0.2);
          }
          
          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
          }
          
          .user-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .avatar-placeholder {
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #4361ee, #3a0ca3);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: 600;
          }
          
          .user-info {
            line-height: 1.3;
          }
          
          .user-name {
            font-weight: 600;
            font-size: 14px;
            color: #333;
          }
          
          .user-role {
            font-size: 12px;
            color: #666;
          }
          
          .dropdown-menu {
            border: none;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            padding: 10px;
            min-width: 250px;
          }
          
          .dropdown-item {
            padding: 10px 15px;
            border-radius: 10px;
            margin: 2px 0;
            font-weight: 500;
            transition: all 0.3s ease;
          }
          
          .dropdown-item:hover {
            background: linear-gradient(90deg, #4361ee, #3a0ca3);
            color: white !important;
            transform: translateX(5px);
          }
          
          @media (max-width: 992px) {
            .input-search-modern {
              width: 100%;
              margin: 10px 0;
            }
            
            .notification-dropdown {
              position: fixed;
              top: 70px;
              left: 20px;
              right: 20px;
              width: auto;
            }
            
            .navbar-nav {
              padding: 10px 0;
            }
          }
          
          @media (max-width: 768px) {
            .navbar-brand-modern {
              font-size: 20px;
            }
            
            .nav-link {
              padding: 8px 12px !important;
              margin: 2px 0;
            }
          }
        `}
      </style>
    </>
  );
}

export default Navbar;
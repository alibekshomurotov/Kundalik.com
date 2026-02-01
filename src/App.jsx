// src/App.jsx - TO'LIQ VERSIYA
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Timetable from "./components/Timetable";
import Library from "./components/Library";
import BookDetail from "./components/BookDetail";
import BookReader from "./components/BookReader";
import Gallery from "./components/Gallery";
import VideoLessons from "./components/VideoLessons";
import Profile from "./components/Profile";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentGrades from "./components/StudentGrades";
import Footer from "./components/Footer";
import './App.css';
import './styles/modern-styles.css';
import AdminDashboard from "./components/AdminDashboard"; // Yangi import

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Foydalanuvchi ma'lumotlarini localStorage'dan olish
  useEffect(() => {
    const savedUser = localStorage.getItem('schoolUser');
    const savedAuth = localStorage.getItem('isAuthenticated');
    
    if (savedUser && savedAuth === 'true') {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    
    setLoading(false);
    
    // Loading screen efekti
    const timer = setTimeout(() => {
      document.body.classList.add('loaded');
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('schoolUser', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
    
    // Notification efekti
    showNotification(`Xush kelibsiz, ${userData.name}!`, 'success');
  };

  const handleLogout = () => {
    if (window.confirm("Tizimdan chiqishni xohlaysizmi?")) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('schoolUser');
      localStorage.removeItem('isAuthenticated');
      showNotification('Tizimdan muvaffaqiyatli chiqdingiz!', 'info');
    }
  };

  // Notification funksiyasi
  const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
      </div>
      <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Ko'rinish efekti
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Yopish
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.onclick = () => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    };
    
    // Avtomatik yopish
    setTimeout(() => {
      if (notification.parentNode) {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }
    }, 3000);
  };

  // Loading spinner
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="spinner-modern"></div>
          <h3>Maktab Dars Jadvali</h3>
          <p>Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Navbar user={user} onLogout={handleLogout} />}
        
        <div className="main-content">
          <Routes>
            {/* Asosiy sahifa - agar autentifikatsiya bo'lsa dashboard, bo'lmasa login */}
            <Route 
              path="/" 
              element={
                isAuthenticated ? 
                <Navigate to="/dashboard" /> : 
                <Navigate to="/login" />
              } 
            />
            
            {/* Login sahifasi */}
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/dashboard" /> : 
                <Login onLogin={handleLogin} />
              } 
            />
            
            {/* Register sahifasi */}
            <Route 
              path="/register" 
              element={
                isAuthenticated ? 
                <Navigate to="/dashboard" /> : 
                <Register />
              } 
            />
            
            {/* Autentifikatsiya talab qiladigan sahifalar */}
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? 
                <Dashboard user={user} showNotification={showNotification} /> : 
                <Navigate to="/login" />
              } 
            />
            
            {/* O'qituvchi paneli */}
            <Route 
              path="/teacher" 
              element={
                isAuthenticated && user?.role === 'teacher' ? 
                <TeacherDashboard user={user} showNotification={showNotification} /> : 
                <Navigate to="/dashboard" />
              } 
            />
            
            {/* O'quvchi baholari */}
            <Route 
              path="/grades" 
              element={
                isAuthenticated && user?.role === 'student' ? 
                <StudentGrades user={user} /> : 
                <Navigate to="/dashboard" />
              } 
            />
            
            <Route 
              path="/timetable" 
              element={
                isAuthenticated ? 
                <Timetable user={user} /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/library" 
              element={
                isAuthenticated ? 
                <Library user={user} showNotification={showNotification} /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/library/book/:id" 
              element={
                isAuthenticated ? 
                <BookDetail user={user} showNotification={showNotification} /> : 
                <Navigate to="/login" />
              } 
            />
<Route 
  path="/admin" 
  element={
    isAuthenticated && user?.role === 'admin' ? 
    <AdminDashboard user={user} /> : 
    <Navigate to="/dashboard" />
  } 
/>

            <Route 
              path="/reader/:id" 
              element={
                isAuthenticated ? 
                <BookReader user={user} /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/gallery" 
              element={
                isAuthenticated ? 
                <Gallery user={user} showNotification={showNotification} /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/videos" 
              element={
                isAuthenticated ? 
                <VideoLessons user={user} showNotification={showNotification} /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/profile" 
              element={
                isAuthenticated ? 
                <Profile user={user} showNotification={showNotification} /> : 
                <Navigate to="/login" />
              } 
            />
            
            {/* Barcha notogri yo'llar uchun */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        
        {isAuthenticated && <Footer />}
        
        {/* Notification container uchun CSS */}
        <style>
          {`
            .notification {
              position: fixed;
              top: 100px;
              right: 20px;
              background: white;
              border-radius: 10px;
              padding: 15px 20px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.1);
              transform: translateX(150%);
              transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
              z-index: 9999;
              min-width: 300px;
              border-left: 4px solid #4361ee;
            }
            
            .notification.show {
              transform: translateX(0);
            }
            
            .notification-success {
              border-left-color: #28a745;
            }
            
            .notification-error {
              border-left-color: #dc3545;
            }
            
            .notification-info {
              border-left-color: #17a2b8;
            }
            
            .notification-content {
              display: flex;
              align-items: center;
              gap: 10px;
            }
            
            .notification-content i {
              font-size: 20px;
            }
            
            .notification-success .notification-content i {
              color: #28a745;
            }
            
            .notification-error .notification-content i {
              color: #dc3545;
            }
            
            .notification-info .notification-content i {
              color: #17a2b8;
            }
            
            .notification-close {
              position: absolute;
              top: 10px;
              right: 10px;
              background: none;
              border: none;
              font-size: 20px;
              cursor: pointer;
              color: #999;
              transition: color 0.3s ease;
            }
            
            .notification-close:hover {
              color: #333;
            }
            
            .loading-screen {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 9999;
              opacity: 1;
              transition: opacity 0.5s ease;
            }
            
            .loading-screen.loaded {
              opacity: 0;
              pointer-events: none;
            }
            
            .loading-content {
              text-align: center;
              color: white;
              animation: fadeInUp 0.6s ease-out;
            }
            
            .loading-content h3 {
              margin-top: 20px;
              margin-bottom: 10px;
              font-size: 28px;
              font-weight: 700;
            }
            
            .loading-content p {
              font-size: 16px;
              opacity: 0.8;
            }
            
            .spinner-modern {
              width: 50px;
              height: 50px;
              border: 3px solid white;
              border-top-color: transparent;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}
        </style>
      </div>
    </Router>
  );
}

export default App;
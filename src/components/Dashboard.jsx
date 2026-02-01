// src/components/Dashboard.jsx - ZAMONAVIY VERSIYA
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard({ user, showNotification }) {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalVideos: 0,
    averageGrade: 0,
    attendance: 0
  });
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    // Demo statistikalar
    setStats({
      totalBooks: 24,
      totalVideos: 15,
      averageGrade: user?.role === 'student' ? 4.5 : 0,
      attendance: user?.role === 'student' ? 92 : 0
    });

    // Demo darslar
    const demoClasses = [
      { id: 1, subject: 'Matematika', time: '08:00 - 08:45', teacher: 'O. Karimov', room: '302' },
      { id: 2, subject: 'Ona tili', time: '09:00 - 09:45', teacher: 'G. Husanova', room: '304' },
      { id: 3, subject: 'Ingliz tili', time: '10:00 - 10:45', teacher: 'M. Yusupova', room: '401' },
      { id: 4, subject: 'Fizika', time: '11:00 - 11:45', teacher: 'R. Jo\'rayev', room: '307' },
    ];
    setUpcomingClasses(demoClasses);

    // Demo faoliyatlar
    const demoActivities = [
      { id: 1, action: 'Yangi kitob yukladi', user: 'Ali Aliyev', time: '2 soat oldin', type: 'library' },
      { id: 2, action: 'Video dars qo\'shdi', user: 'Olim Karimov', time: '4 soat oldin', type: 'video' },
      { id: 3, action: 'Baholarni yangiladi', user: 'G. Husanova', time: 'Kecha', type: 'grades' },
      { id: 4, action: 'Galereyaga rasm qo\'shdi', user: 'Sara Sarayeva', time: '2 kun oldin', type: 'gallery' },
    ];
    setRecentActivities(demoActivities);
  }, [user]);

  const quickActions = user?.role === 'teacher' ? [
    { icon: 'bi-journal-plus', label: 'Yangi test', color: '#4361ee', path: '/teacher' },
    { icon: 'bi-chat-left-text', label: 'Xabar yuborish', color: '#7209b7', path: '/teacher' },
    { icon: 'bi-calendar-plus', label: 'Dars qo\'shish', color: '#4cc9f0', path: '/timetable' },
    { icon: 'bi-upload', label: 'Material yuklash', color: '#f72585', path: '/library' },
  ] : [
    { icon: 'bi-journal-text', label: 'Dars jadvali', color: '#4361ee', path: '/timetable' },
    { icon: 'bi-book', label: 'Kitob o\'qish', color: '#7209b7', path: '/library' },
    { icon: 'bi-camera-video', label: 'Video darslar', color: '#4cc9f0', path: '/videos' },
    { icon: 'bi-images', label: 'Galereya', color: '#f72585', path: '/gallery' },
  ];

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Xayrli tong';
    if (hour < 18) return 'Xayrli kun';
    return 'Xayrli kech';
  };

  return (
    <div className="dashboard-page">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="container">
          <div className="welcome-content">
            <h1>{greeting()}, <span className="highlight">{user?.name}</span>! 👋</h1>
            <p>
              {user?.role === 'teacher' 
                ? `Bugun ${user?.subject} fanidan qancha o'quvchi baholadingiz?` 
                : `Bugun ${user?.grade}-${user?.classLetter} sinfda qanday darslar bor?`}
            </p>
          </div>
        </div>
      </div>

      <div className="container dashboard-content">
        {/* Stats Cards */}
        <div className="stats-section">
          <div className="row g-4">
            {user?.role === 'student' ? (
              <>
                <div className="col-md-3 col-sm-6">
                  <div className="stats-card" style={{background: 'linear-gradient(135deg, #4361ee, #3a0ca3)'}}>
                    <div className="stats-icon">
                      <i className="bi bi-journal-check"></i>
                    </div>
                    <div className="stats-value">{stats.averageGrade}</div>
                    <div className="stats-label">O'rtacha baho</div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="stats-card" style={{background: 'linear-gradient(135deg, #7209b7, #f72585)'}}>
                    <div className="stats-icon">
                      <i className="bi bi-calendar-check"></i>
                    </div>
                    <div className="stats-value">{stats.attendance}%</div>
                    <div className="stats-label">Davomat</div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="stats-card" style={{background: 'linear-gradient(135deg, #4cc9f0, #4895ef)'}}>
                    <div className="stats-icon">
                      <i className="bi bi-book"></i>
                    </div>
                    <div className="stats-value">{stats.totalBooks}</div>
                    <div className="stats-label">Kitoblar</div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="stats-card" style={{background: 'linear-gradient(135deg, #ff006e, #d00000)'}}>
                    <div className="stats-icon">
                      <i className="bi bi-camera-video"></i>
                    </div>
                    <div className="stats-value">{stats.totalVideos}</div>
                    <div className="stats-label">Video darslar</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-md-3 col-sm-6">
                  <div className="stats-card" style={{background: 'linear-gradient(135deg, #4361ee, #3a0ca3)'}}>
                    <div className="stats-icon">
                      <i className="bi bi-people"></i>
                    </div>
                    <div className="stats-value">24</div>
                    <div className="stats-label">O'quvchilar</div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="stats-card" style={{background: 'linear-gradient(135deg, #7209b7, #f72585)'}}>
                    <div className="stats-icon">
                      <i className="bi bi-journal-text"></i>
                    </div>
                    <div className="stats-value">18</div>
                    <div className="stats-label">Testlar</div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="stats-card" style={{background: 'linear-gradient(135deg, #4cc9f0, #4895ef)'}}>
                    <div className="stats-icon">
                      <i className="bi bi-chat-left-text"></i>
                    </div>
                    <div className="stats-value">42</div>
                    <div className="stats-label">Xabarlar</div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="stats-card" style={{background: 'linear-gradient(135deg, #ff006e, #d00000)'}}>
                    <div className="stats-icon">
                      <i className="bi bi-calendar-week"></i>
                    </div>
                    <div className="stats-value">12</div>
                    <div className="stats-label">Darslar</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h3 className="section-title">Tezkor harakatlar</h3>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <Link 
                key={index} 
                to={action.path}
                className="quick-action-card"
                style={{ '--action-color': action.color }}
                onClick={() => showNotification(`${action.label} sahifasiga o'tildi`, 'info')}
              >
                <div className="action-icon" style={{background: action.color}}>
                  <i className={`bi ${action.icon}`}></i>
                </div>
                <div className="action-label">{action.label}</div>
                <div className="action-arrow">
                  <i className="bi bi-arrow-right"></i>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="row mt-4">
          {/* Upcoming Classes */}
          <div className="col-lg-8">
            <div className="modern-card">
              <div className="card-header-modern">
                <h4>
                  <i className="bi bi-calendar-week me-2"></i>
                  Bugungi darslar
                </h4>
                <Link to="/timetable" className="view-all">
                  Barchasini ko'rish <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
              <div className="card-body-modern">
                <div className="classes-timeline">
                  {upcomingClasses.map((cls, index) => (
                    <div key={cls.id} className="class-item">
                      <div className="class-time">
                        <div className="time">{cls.time}</div>
                        <div className="class-index">#{index + 1}</div>
                      </div>
                      <div className="class-details">
                        <div className="subject">{cls.subject}</div>
                        <div className="teacher">
                          <i className="bi bi-person me-1"></i>
                          {cls.teacher}
                        </div>
                        <div className="room">
                          <i className="bi bi-geo-alt me-1"></i>
                          {cls.room}
                        </div>
                      </div>
                      <div className="class-status">
                        {index === 0 ? (
                          <span className="status-badge current">Joriy</span>
                        ) : (
                          <span className="status-badge upcoming">Keyingi</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="col-lg-4">
            <div className="modern-card">
              <div className="card-header-modern">
                <h4>
                  <i className="bi bi-clock-history me-2"></i>
                  Oxirgi faoliyatlar
                </h4>
              </div>
              <div className="card-body-modern">
                <div className="activities-list">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-icon">
                        <i className={`bi bi-${activity.type === 'library' ? 'book' : 
                                          activity.type === 'video' ? 'camera-video' : 
                                          activity.type === 'grades' ? 'journal-check' : 'images'}`}></i>
                      </div>
                      <div className="activity-content">
                        <div className="activity-action">{activity.action}</div>
                        <div className="activity-user">{activity.user}</div>
                      </div>
                      <div className="activity-time">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Cards */}
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="modern-card">
              <div className="card-header-modern bg-warning">
                <h4 className="text-white">
                  <i className="bi bi-megaphone me-2"></i>
                  Yangiliklar va E'lonlar
                </h4>
              </div>
              <div className="card-body-modern">
                <ul className="announcements-list">
                  <li>
                    <div className="announcement-date">1-fevral</div>
                    <div className="announcement-text">Yangi dars jadvali amal qiladi</div>
                  </li>
                  <li>
                    <div className="announcement-date">3-fevral</div>
                    <div className="announcement-text">Matematika olimpiadasi bo'lib o'tadi</div>
                  </li>
                  <li>
                    <div className="announcement-date">7-fevral</div>
                    <div className="announcement-text">Umumiy yig'ilish bo'ladi</div>
                  </li>
                  <li>
                    <div className="announcement-date">10-fevral</div>
                    <div className="announcement-text">Kutubxonaga yangi kitoblar qo'shildi</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="modern-card">
              <div className="card-header-modern bg-success">
                <h4 className="text-white">
                  <i className="bi bi-lightbulb me-2"></i>
                  Maslahatlar
                </h4>
              </div>
              <div className="card-body-modern">
                <div className="tips-list">
                  <div className="tip-item">
                    <div className="tip-icon">
                      <i className="bi bi-check-circle"></i>
                    </div>
                    <div className="tip-text">Har bir darsga tayyorgarlik bilan keling</div>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">
                      <i className="bi bi-check-circle"></i>
                    </div>
                    <div className="tip-text">O'qituvchi bergan vazifalarni o'z vaqtida bajaring</div>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">
                      <i className="bi bi-check-circle"></i>
                    </div>
                    <div className="tip-text">Agar tushunmagan bo'lsangiz, so'raganingizda</div>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">
                      <i className="bi bi-check-circle"></i>
                    </div>
                    <div className="tip-text">Har hafta kamida 2-3 soat qo'shimcha o'qing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Styles */}
      <style>
        {`
          .dashboard-page {
            background: #f8f9ff;
            min-height: calc(100vh - 70px);
            padding-bottom: 50px;
          }
          
          .welcome-section {
            background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
            color: white;
            padding: 60px 0 40px;
            margin-bottom: -20px;
            border-radius: 0 0 40px 40px;
            position: relative;
            overflow: hidden;
          }
          
          .welcome-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
            opacity: 0.3;
          }
          
          .welcome-content {
            position: relative;
            z-index: 2;
            text-align: center;
          }
          
          .welcome-content h1 {
            font-size: 42px;
            font-weight: 800;
            margin-bottom: 15px;
            color: white;
          }
          
          .welcome-content .highlight {
            color: #ffd700;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          
          .welcome-content p {
            font-size: 18px;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
          }
          
          .dashboard-content {
            padding-top: 40px;
          }
          
          .stats-section {
            margin-bottom: 40px;
          }
          
          .stats-card {
            border-radius: 20px;
            padding: 30px;
            color: white;
            text-align: center;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            height: 100%;
          }
          
          .stats-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          }
          
          .stats-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 100%;
            background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
            transform: translateX(-100%);
          }
          
          .stats-card:hover::before {
            animation: shimmer 2s infinite;
          }
          
          .stats-icon {
            font-size: 40px;
            margin-bottom: 15px;
            opacity: 0.9;
          }
          
          .stats-value {
            font-size: 48px;
            font-weight: 800;
            margin-bottom: 5px;
            line-height: 1;
          }
          
          .stats-label {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 500;
          }
          
          .section-title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 25px;
            color: #333;
            position: relative;
            padding-left: 15px;
          }
          
          .section-title::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 6px;
            height: 24px;
            background: linear-gradient(180deg, #4361ee, #3a0ca3);
            border-radius: 3px;
          }
          
          .quick-actions-section {
            margin-bottom: 40px;
          }
          
          .quick-actions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
          }
          
          .quick-action-card {
            background: white;
            border-radius: 15px;
            padding: 25px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            text-decoration: none;
            color: #333;
            transition: all 0.3s ease;
            border: 2px solid transparent;
            position: relative;
            overflow: hidden;
          }
          
          .quick-action-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.1);
            border-color: var(--action-color);
          }
          
          .quick-action-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--action-color);
          }
          
          .action-icon {
            width: 60px;
            height: 60px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
            color: white;
            font-size: 24px;
          }
          
          .action-label {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
            flex: 1;
          }
          
          .action-arrow {
            color: #999;
            font-size: 20px;
            transition: all 0.3s ease;
          }
          
          .quick-action-card:hover .action-arrow {
            color: var(--action-color);
            transform: translateX(5px);
          }
          
          .modern-card {
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            height: 100%;
            transition: all 0.3s ease;
          }
          
          .modern-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.12);
          }
          
          .card-header-modern {
            padding: 25px;
            border-bottom: 1px solid #f0f0f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .card-header-modern h4 {
            margin: 0;
            font-weight: 700;
            color: #333;
          }
          
          .view-all {
            color: #4361ee;
            text-decoration: none;
            font-weight: 500;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 5px;
            transition: all 0.3s ease;
          }
          
          .view-all:hover {
            color: #3a0ca3;
            gap: 8px;
          }
          
          .card-body-modern {
            padding: 25px;
          }
          
          .classes-timeline {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }
          
          .class-item {
            display: flex;
            align-items: center;
            gap: 20px;
            padding: 20px;
            background: #f8f9ff;
            border-radius: 15px;
            transition: all 0.3s ease;
          }
          
          .class-item:hover {
            background: #eef1ff;
            transform: translateX(5px);
          }
          
          .class-time {
            text-align: center;
            min-width: 100px;
          }
          
          .class-time .time {
            font-size: 18px;
            font-weight: 700;
            color: #4361ee;
            margin-bottom: 5px;
          }
          
          .class-time .class-index {
            font-size: 14px;
            color: #666;
            background: #e0e0e0;
            padding: 2px 10px;
            border-radius: 10px;
            display: inline-block;
          }
          
          .class-details {
            flex: 1;
          }
          
          .class-details .subject {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin-bottom: 5px;
          }
          
          .class-details .teacher,
          .class-details .room {
            font-size: 14px;
            color: #666;
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .class-status {
            margin-left: auto;
          }
          
          .status-badge {
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
          }
          
          .status-badge.current {
            background: #28a745;
            color: white;
          }
          
          .status-badge.upcoming {
            background: #17a2b8;
            color: white;
          }
          
          .activities-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }
          
          .activity-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 12px;
            transition: all 0.3s ease;
          }
          
          .activity-item:hover {
            background: #f0f1f8;
          }
          
          .activity-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background: #4361ee;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
          }
          
          .activity-content {
            flex: 1;
          }
          
          .activity-action {
            font-weight: 600;
            color: #333;
            margin-bottom: 2px;
          }
          
          .activity-user {
            font-size: 12px;
            color: #666;
          }
          
          .activity-time {
            font-size: 12px;
            color: #999;
            white-space: nowrap;
          }
          
          .announcements-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          
          .announcements-list li {
            padding: 15px 0;
            border-bottom: 1px solid #f0f0f0;
            display: flex;
            gap: 15px;
          }
          
          .announcements-list li:last-child {
            border-bottom: none;
          }
          
          .announcement-date {
            min-width: 70px;
            background: #ffc107;
            color: #333;
            padding: 5px 10px;
            border-radius: 8px;
            text-align: center;
            font-weight: 600;
            font-size: 12px;
          }
          
          .announcement-text {
            flex: 1;
            color: #333;
            font-weight: 500;
          }
          
          .tips-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }
          
          .tip-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
          }
          
          .tip-icon {
            color: #28a745;
            font-size: 18px;
            margin-top: 2px;
          }
          
          .tip-text {
            flex: 1;
            color: #333;
            line-height: 1.5;
          }
          
          /* Responsive */
          @media (max-width: 768px) {
            .welcome-content h1 {
              font-size: 32px;
            }
            
            .welcome-content p {
              font-size: 16px;
            }
            
            .stats-value {
              font-size: 36px;
            }
            
            .quick-actions-grid {
              grid-template-columns: repeat(2, 1fr);
            }
            
            .class-item {
              flex-direction: column;
              text-align: center;
              gap: 10px;
            }
            
            .class-time {
              min-width: auto;
            }
          }
          
          @media (max-width: 576px) {
            .quick-actions-grid {
              grid-template-columns: 1fr;
            }
            
            .stats-card {
              padding: 20px;
            }
            
            .card-header-modern {
              flex-direction: column;
              align-items: flex-start;
              gap: 10px;
            }
            
            .view-all {
              align-self: flex-end;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Dashboard;
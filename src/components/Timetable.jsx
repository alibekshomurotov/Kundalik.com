// src/components/Timetable.jsx - ZAMONAVIY VERSIYA
import { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Timetable({ user }) {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState('all');
  const [isExporting, setIsExporting] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'calendar'
  
  const timetableData = {
    1: {
      Monday: [
        { time: "08:00-08:45", subject: "Matematika", teacher: "O. Karimov", room: "302", color: "#4361ee" },
        { time: "09:00-09:45", subject: "Ona tili", teacher: "G. Husanova", room: "304", color: "#7209b7" },
        { time: "10:00-10:45", subject: "Tabiiy fan", teacher: "S. Rajabov", room: "305", color: "#4cc9f0" },
        { time: "11:00-11:45", subject: "Tarbiya", teacher: "J. Qodirov", room: "Sport zal", color: "#f72585" }
      ],
      Tuesday: [
        { time: "08:00-08:45", subject: "Matematika", teacher: "O. Karimov", room: "302", color: "#4361ee" },
        { time: "09:00-09:45", subject: "Ingliz tili", teacher: "M. Yusupova", room: "401", color: "#ff006e" },
        { time: "10:00-10:45", subject: "Tasviriy san'at", teacher: "L. Abdullaeva", room: "303", color: "#ff9e00" },
        { time: "11:00-11:45", subject: "Jismoniy tarbiya", teacher: "A. Tursunov", room: "Sport zal", color: "#f72585" }
      ],
      Wednesday: [
        { time: "08:00-08:45", subject: "Ona tili", teacher: "G. Husanova", room: "304", color: "#7209b7" },
        { time: "09:00-09:45", subject: "Matematika", teacher: "O. Karimov", room: "302", color: "#4361ee" },
        { time: "10:00-10:45", subject: "Musiqa", teacher: "F. Sobirova", room: "306", color: "#9d4edd" },
        { time: "11:00-11:45", subject: "Texnologiya", teacher: "R. Ismoilov", room: "Workshop", color: "#ff9e00" }
      ],
      Thursday: [
        { time: "08:00-08:45", subject: "Tabiiy fan", teacher: "S. Rajabov", room: "305", color: "#4cc9f0" },
        { time: "09:00-09:45", subject: "Ingliz tili", teacher: "M. Yusupova", room: "401", color: "#ff006e" },
        { time: "10:00-10:45", subject: "Ona tili", teacher: "G. Husanova", room: "304", color: "#7209b7" },
        { time: "11:00-11:45", subject: "Jismoniy tarbiya", teacher: "A. Tursunov", room: "Sport zal", color: "#f72585" }
      ],
      Friday: [
        { time: "08:00-08:45", subject: "Matematika", teacher: "O. Karimov", room: "302", color: "#4361ee" },
        { time: "09:00-09:45", subject: "Tarbiya", teacher: "J. Qodirov", room: "304", color: "#2a9d8f" },
        { time: "10:00-10:45", subject: "Texnologiya", teacher: "R. Ismoilov", room: "Workshop", color: "#ff9e00" },
        { time: "11:00-11:45", subject: "Tasviriy san'at", teacher: "L. Abdullaeva", room: "303", color: "#e9c46a" }
      ],
      Saturday: [
        { time: "08:00-08:45", subject: "Ona tili", teacher: "G. Husanova", room: "304", color: "#7209b7" },
        { time: "09:00-09:45", subject: "Musiqa", teacher: "F. Sobirova", room: "306", color: "#9d4edd" },
        { time: "10:00-10:45", subject: "Tabiiy fan", teacher: "S. Rajabov", room: "305", color: "#4cc9f0" },
        { time: "11:00-11:45", subject: "Ingliz tili", teacher: "M. Yusupova", room: "401", color: "#ff006e" }
      ]
    },
    2: {
      Monday: [
        { time: "08:00-08:45", subject: "Algebra", teacher: "T. Aliyev", room: "302", color: "#4361ee" },
        { time: "09:00-09:45", subject: "Ona tili", teacher: "G. Husanova", room: "304", color: "#7209b7" },
        { time: "10:00-10:45", subject: "Fizika", teacher: "R. Jo'rayev", room: "307", color: "#ff006e" },
        { time: "11:00-11:45", subject: "Informatika", teacher: "D. Sattorov", room: "405", color: "#ff9e00" }
      ],
      Tuesday: [
        { time: "08:00-08:45", subject: "Geometriya", teacher: "T. Aliyev", room: "302", color: "#4361ee" },
        { time: "09:00-09:45", subject: "Ingliz tili", teacher: "M. Yusupova", room: "401", color: "#ff006e" },
        { time: "10:00-10:45", subject: "Kimyo", teacher: "G. Toshmatova", room: "308", color: "#9d4edd" },
        { time: "11:00-11:45", subject: "Jismoniy tarbiya", teacher: "A. Tursunov", room: "Sport zal", color: "#f72585" }
      ],
      Wednesday: [
        { time: "08:00-08:45", subject: "Ona tili", teacher: "G. Husanova", room: "304", color: "#7209b7" },
        { time: "09:00-09:45", subject: "Algebra", teacher: "T. Aliyev", room: "302", color: "#4361ee" },
        { time: "10:00-10:45", subject: "Biologiya", teacher: "L. Karimova", room: "309", color: "#2a9d8f" },
        { time: "11:00-11:45", subject: "Texnologiya", teacher: "R. Ismoilov", room: "Workshop", color: "#ff9e00" }
      ],
      Thursday: [
        { time: "08:00-08:45", subject: "Fizika", teacher: "R. Jo'rayev", room: "307", color: "#ff006e" },
        { time: "09:00-09:45", subject: "Ingliz tili", teacher: "M. Yusupova", room: "401", color: "#ff006e" },
        { time: "10:00-10:45", subject: "Geografiya", teacher: "Z. Usmonov", room: "310", color: "#4cc9f0" },
        { time: "11:00-11:45", subject: "Jismoniy tarbiya", teacher: "A. Tursunov", room: "Sport zal", color: "#f72585" }
      ],
      Friday: [
        { time: "08:00-08:45", subject: "Geometriya", teacher: "T. Aliyev", room: "302", color: "#4361ee" },
        { time: "09:00-09:45", subject: "Tarix", teacher: "B. Qosimov", room: "311", color: "#e76f51" },
        { time: "10:00-10:45", subject: "Informatika", teacher: "D. Sattorov", room: "405", color: "#ff9e00" },
        { time: "11:00-11:45", subject: "Tasviriy san'at", teacher: "L. Abdullaeva", room: "303", color: "#e9c46a" }
      ],
      Saturday: [
        { time: "08:00-08:45", subject: "Adabiyot", teacher: "H. Yo'ldosheva", room: "304", color: "#7209b7" },
        { time: "09:00-09:45", subject: "Kimyo", teacher: "G. Toshmatova", room: "308", color: "#9d4edd" },
        { time: "10:00-10:45", subject: "Biologiya", teacher: "L. Karimova", room: "309", color: "#2a9d8f" },
        { time: "11:00-11:45", subject: "Chaqiriqqa tayyorgarlik", teacher: "K. Murodov", room: "312", color: "#f72585" }
      ]
    }
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayNames = {
    'Monday': { uz: 'Dushanba', short: 'Dush' },
    'Tuesday': { uz: 'Seshanba', short: 'Sesh' },
    'Wednesday': { uz: 'Chorshanba', short: 'Chor' },
    'Thursday': { uz: 'Payshanba', short: 'Pay' },
    'Friday': { uz: 'Juma', short: 'Jum' },
    'Saturday': { uz: 'Shanba', short: 'Shan' }
  };

  const currentDayIndex = new Date().getDay();
  const currentDayName = days[currentDayIndex === 0 ? 6 : currentDayIndex - 1];

  const exportToPDF = () => {
    setIsExporting(true);
    const input = document.getElementById('timetable-content');
    
    html2canvas(input, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgWidth = 280;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      // PDF sarlavhasi
      pdf.setFontSize(18);
      pdf.setTextColor(40);
      pdf.text('Maktab Dars Jadvali', 140, 15, { align: 'center' });
      pdf.setFontSize(12);
      pdf.text(`${user?.grade}-${user?.classLetter} sinf - ${selectedWeek}-hafta`, 140, 22, { align: 'center' });
      pdf.text(`Tayyorlangan sana: ${new Date().toLocaleDateString()}`, 140, 29, { align: 'center' });
      
      // Rasmni joylash
      pdf.addImage(imgData, 'PNG', 10, 40, imgWidth, imgHeight);
      
      // Footer qo'shish
      pdf.setFontSize(10);
      pdf.setTextColor(150);
      pdf.text('© Maktab Dars Jadvali Tizimi', 140, 200, { align: 'center' });
      
      pdf.save(`dars-jadvali-${user?.grade}${user?.classLetter}-hafta${selectedWeek}.pdf`);
      setIsExporting(false);
      
      // Notification
      alert('PDF fayli muvaffaqiyatli yuklab olindi!');
    }).catch(error => {
      console.error('PDF export error:', error);
      setIsExporting(false);
      alert('PDF export qilishda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
    });
  };

  const printTimetable = () => {
    const printWindow = window.open('', '_blank');
    const timetableHTML = document.getElementById('timetable-content').outerHTML;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Dars Jadvali - ${user?.grade}-${user?.classLetter} sinf</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .print-header { text-align: center; margin-bottom: 30px; }
            .print-header h1 { color: #333; margin-bottom: 10px; }
            .print-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .print-table th { background: #4361ee; color: white; padding: 15px; text-align: left; }
            .print-table td { padding: 15px; border-bottom: 1px solid #ddd; }
            .subject-badge { padding: 5px 10px; border-radius: 5px; color: white; font-weight: bold; }
            @media print {
              body { padding: 0; margin: 0; }
              .print-table th { color: black; -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="print-header">
            <h1>Maktab Dars Jadvali</h1>
            <h3>${user?.grade}-${user?.classLetter} sinf - ${selectedWeek}-hafta</h3>
            <p>Tayyorlangan sana: ${new Date().toLocaleDateString()}</p>
          </div>
          ${timetableHTML}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => window.close(), 1000);
            }
          </script>
        </body>
      </html>
    `);
  };

  const shareTimetable = () => {
    if (navigator.share) {
      navigator.share({
        title: `Dars Jadvali - ${user?.grade}-${user?.classLetter} sinf`,
        text: `${user?.grade}-${user?.classLetter} sinfning dars jadvali`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Havola nusxalandi!');
    }
  };

  const filteredDays = selectedDay === 'all' 
    ? days 
    : [selectedDay];

  return (
    <div className="timetable-page">
      <div className="container">
        {/* Header */}
        <div className="timetable-header">
          <div className="header-content">
            <h1>
              <i className="bi bi-calendar-week me-2"></i>
              Dars Jadvali
            </h1>
            <p className="class-info">
              {user?.grade}-{user?.classLetter} sinf - {selectedWeek}-hafta
            </p>
          </div>
          
          <div className="header-actions">
            <button className="btn-modern btn-modern-success" onClick={shareTimetable}>
              <i className="bi bi-share me-1"></i>
              Ulashish
            </button>
            <button className="btn-modern btn-modern-outline" onClick={printTimetable}>
              <i className="bi bi-printer me-1"></i>
              Chop etish
            </button>
            <button 
              className="btn-modern btn-modern-primary" 
              onClick={exportToPDF}
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Yuklanmoqda...
                </>
              ) : (
                <>
                  <i className="bi bi-file-earmark-pdf me-1"></i>
                  PDF yuklash
                </>
              )}
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="timetable-controls">
          <div className="controls-left">
            <div className="btn-group view-toggle">
              <button 
                className={`btn ${viewMode === 'grid' ? 'btn-modern-primary' : 'btn-modern-outline'}`}
                onClick={() => setViewMode('grid')}
              >
                <i className="bi bi-grid-3x3-gap"></i>
              </button>
              <button 
                className={`btn ${viewMode === 'list' ? 'btn-modern-primary' : 'btn-modern-outline'}`}
                onClick={() => setViewMode('list')}
              >
                <i className="bi bi-list-ul"></i>
              </button>
              <button 
                className={`btn ${viewMode === 'calendar' ? 'btn-modern-primary' : 'btn-modern-outline'}`}
                onClick={() => setViewMode('calendar')}
              >
                <i className="bi bi-calendar-date"></i>
              </button>
            </div>
            
            <div className="week-selector">
              <button 
                className={`week-btn ${selectedWeek === 1 ? 'active' : ''}`}
                onClick={() => setSelectedWeek(1)}
              >
                1-hafta
              </button>
              <button 
                className={`week-btn ${selectedWeek === 2 ? 'active' : ''}`}
                onClick={() => setSelectedWeek(2)}
              >
                2-hafta
              </button>
            </div>
          </div>
          
          <div className="controls-right">
            <select 
              className="day-selector"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              <option value="all">Barcha kunlar</option>
              {days.map(day => (
                <option key={day} value={day}>
                  {dayNames[day].uz}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Current Day Highlight */}
        {selectedDay === 'all' && (
          <div className="current-day-alert">
            <i className="bi bi-info-circle me-2"></i>
            Bugun: <strong>{dayNames[currentDayName]?.uz}</strong> - {timetableData[selectedWeek]?.[currentDayName]?.length || 0} ta dars
          </div>
        )}

        {/* Timetable Content */}
        <div id="timetable-content">
          {viewMode === 'grid' ? (
            <div className="timetable-grid">
              {filteredDays.map(day => (
                <div key={day} className={`day-column ${day === currentDayName ? 'current-day' : ''}`}>
                  <div className="day-header">
                    <div className="day-name">{dayNames[day].uz}</div>
                    <div className="day-short">{dayNames[day].short}</div>
                    <div className="lesson-count">
                      {timetableData[selectedWeek]?.[day]?.length || 0} dars
                    </div>
                  </div>
                  
                  <div className="lessons-list">
                    {timetableData[selectedWeek]?.[day]?.map((lesson, index) => (
                      <div 
                        key={index} 
                        className="lesson-card"
                        style={{ borderLeft: `4px solid ${lesson.color}` }}
                      >
                        <div className="lesson-time">{lesson.time}</div>
                        <div className="lesson-subject">{lesson.subject}</div>
                        <div className="lesson-teacher">
                          <i className="bi bi-person me-1"></i>
                          {lesson.teacher}
                        </div>
                        <div className="lesson-room">
                          <i className="bi bi-geo-alt me-1"></i>
                          {lesson.room}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : viewMode === 'list' ? (
            <div className="timetable-list">
              <div className="table-responsive">
                <table className="table-modern">
                  <thead>
                    <tr>
                      <th>Kun</th>
                      <th>Vaqt</th>
                      <th>Fan</th>
                      <th>O'qituvchi</th>
                      <th>Xona</th>
                      <th>Harakat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDays.map(day => (
                      timetableData[selectedWeek]?.[day]?.map((lesson, index) => (
                        <tr key={`${day}-${index}`}>
                          <td>
                            <div className={`day-badge ${day === currentDayName ? 'current' : ''}`}>
                              {dayNames[day].uz}
                            </div>
                          </td>
                          <td>
                            <div className="time-cell">{lesson.time}</div>
                          </td>
                          <td>
                            <div className="subject-cell">
                              <span 
                                className="subject-color" 
                                style={{ backgroundColor: lesson.color }}
                              ></span>
                              {lesson.subject}
                            </div>
                          </td>
                          <td>{lesson.teacher}</td>
                          <td>{lesson.room}</td>
                          <td>
                            <button className="btn-modern-outline btn-sm">
                              <i className="bi bi-bell"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="calendar-view">
              <div className="calendar-grid">
                {days.map(day => (
                  <div key={day} className={`calendar-day ${day === currentDayName ? 'today' : ''}`}>
                    <div className="calendar-day-header">
                      <h4>{dayNames[day].uz}</h4>
                      <span className="date">-</span>
                    </div>
                    <div className="calendar-lessons">
                      {timetableData[selectedWeek]?.[day]?.map((lesson, index) => (
                        <div 
                          key={index} 
                          className="calendar-lesson"
                          style={{ backgroundColor: `${lesson.color}20`, borderColor: lesson.color }}
                        >
                          <div className="calendar-lesson-time">{lesson.time.split('-')[0]}</div>
                          <div className="calendar-lesson-subject">{lesson.subject}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Teachers Contact */}
        <div className="teachers-section">
          <h3>
            <i className="bi bi-telephone me-2"></i>
            O'qituvchilar bilan aloqa
          </h3>
          <div className="teachers-grid">
            <div className="teacher-card">
              <div className="teacher-avatar" style={{ background: '#4361ee' }}>
                OK
              </div>
              <div className="teacher-info">
                <h5>O. Karimov</h5>
                <p>Matematika</p>
                <div className="teacher-contact">
                  <i className="bi bi-telephone"></i>
                  +998 90 123 45 67
                </div>
              </div>
            </div>
            <div className="teacher-card">
              <div className="teacher-avatar" style={{ background: '#7209b7' }}>
                GH
              </div>
              <div className="teacher-info">
                <h5>G. Husanova</h5>
                <p>Ona tili</p>
                <div className="teacher-contact">
                  <i className="bi bi-telephone"></i>
                  +998 91 234 56 78
                </div>
              </div>
            </div>
            <div className="teacher-card">
              <div className="teacher-avatar" style={{ background: '#ff006e' }}>
                MY
              </div>
              <div className="teacher-info">
                <h5>M. Yusupova</h5>
                <p>Ingliz tili</p>
                <div className="teacher-contact">
                  <i className="bi bi-telephone"></i>
                  +998 93 345 67 89
                </div>
              </div>
            </div>
            <div className="teacher-card">
              <div className="teacher-avatar" style={{ background: '#f72585' }}>
                AT
              </div>
              <div className="teacher-info">
                <h5>A. Tursunov</h5>
                <p>Jismoniy tarbiya</p>
                <div className="teacher-contact">
                  <i className="bi bi-telephone"></i>
                  +998 94 456 78 90
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timetable Styles */}
      <style>
        {`
          .timetable-page {
            padding: 40px 0;
            background: #f8f9ff;
            min-height: 100vh;
          }
          
          .timetable-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
            flex-wrap: wrap;
            gap: 20px;
          }
          
          .header-content h1 {
            font-size: 36px;
            font-weight: 800;
            color: #333;
            margin-bottom: 10px;
            background: linear-gradient(90deg, #4361ee, #3a0ca3);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          
          .class-info {
            font-size: 18px;
            color: #666;
            margin: 0;
          }
          
          .header-actions {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
          }
          
          .timetable-controls {
            background: white;
            border-radius: 20px;
            padding: 20px;
            margin-bottom: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
          }
          
          .controls-left, .controls-right {
            display: flex;
            align-items: center;
            gap: 20px;
            flex-wrap: wrap;
          }
          
          .view-toggle {
            display: flex;
            gap: 5px;
          }
          
          .view-toggle .btn {
            padding: 10px 15px;
            border-radius: 10px;
          }
          
          .week-selector {
            display: flex;
            gap: 10px;
          }
          
          .week-btn {
            padding: 10px 25px;
            border: 2px solid #e0e0e0;
            background: white;
            border-radius: 10px;
            font-weight: 600;
            color: #666;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .week-btn.active {
            background: linear-gradient(90deg, #4361ee, #3a0ca3);
            color: white;
            border-color: transparent;
            box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
          }
          
          .week-btn:hover:not(.active) {
            border-color: #4361ee;
            color: #4361ee;
          }
          
          .day-selector {
            padding: 12px 20px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 500;
            color: #333;
            background: white;
            min-width: 200px;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .day-selector:focus {
            border-color: #4361ee;
            outline: none;
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
          }
          
          .current-day-alert {
            background: linear-gradient(90deg, #4361ee, #3a0ca3);
            color: white;
            padding: 15px 25px;
            border-radius: 15px;
            margin-bottom: 30px;
            display: flex;
            align-items: center;
          }
          
          /* Grid View */
          .timetable-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            margin-bottom: 40px;
          }
          
          .day-column {
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
          }
          
          .day-column.current-day {
            box-shadow: 0 15px 40px rgba(67, 97, 238, 0.2);
            transform: translateY(-5px);
          }
          
          .day-column.current-day .day-header {
            background: linear-gradient(90deg, #4361ee, #3a0ca3);
            color: white;
          }
          
          .day-header {
            background: #f8f9ff;
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid #f0f0f0;
          }
          
          .day-name {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 5px;
            color: #333;
          }
          
          .day-column.current-day .day-name {
            color: white;
          }
          
          .day-short {
            font-size: 14px;
            color: #666;
            margin-bottom: 10px;
          }
          
          .day-column.current-day .day-short {
            color: rgba(255, 255, 255, 0.8);
          }
          
          .lesson-count {
            font-size: 12px;
            background: rgba(255, 255, 255, 0.2);
            color: #4361ee;
            padding: 3px 10px;
            border-radius: 10px;
            display: inline-block;
          }
          
          .day-column.current-day .lesson-count {
            background: rgba(255, 255, 255, 0.3);
            color: white;
          }
          
          .lessons-list {
            padding: 20px;
          }
          
          .lesson-card {
            background: #f8f9ff;
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 15px;
            transition: all 0.3s ease;
          }
          
          .lesson-card:hover {
            transform: translateX(5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          }
          
          .lesson-time {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
          }
          
          .lesson-subject {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin-bottom: 10px;
          }
          
          .lesson-teacher,
          .lesson-room {
            font-size: 14px;
            color: #666;
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          /* List View */
          .timetable-list {
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            margin-bottom: 40px;
          }
          
          .day-badge {
            display: inline-block;
            padding: 5px 15px;
            background: #f0f0f0;
            color: #666;
            border-radius: 20px;
            font-weight: 600;
            font-size: 12px;
          }
          
          .day-badge.current {
            background: linear-gradient(90deg, #4361ee, #3a0ca3);
            color: white;
          }
          
          .time-cell {
            font-weight: 600;
            color: #4361ee;
          }
          
          .subject-cell {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          .subject-color {
            width: 12px;
            height: 12px;
            border-radius: 3px;
          }
          
          /* Calendar View */
          .calendar-view {
            background: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            margin-bottom: 40px;
          }
          
          .calendar-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
          }
          
          .calendar-day {
            background: #f8f9ff;
            border-radius: 15px;
            padding: 20px;
            transition: all 0.3s ease;
          }
          
          .calendar-day.today {
            background: linear-gradient(135deg, #4361ee, #3a0ca3);
            color: white;
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(67, 97, 238, 0.3);
 
        `}
      </style>
    </div>
  );
}

export default Timetable;
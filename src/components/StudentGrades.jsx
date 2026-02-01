// src/components/StudentGrades.jsx - Yangilangan versiya
import { useState, useEffect } from 'react';

function StudentGrades({ user }) {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // LocalStorage'dan baholarni olish
    const allGrades = JSON.parse(localStorage.getItem('grades') || '{}');
    
    // Demo baholar (agar bo'sh bo'lsa)
    if (Object.keys(allGrades).length === 0) {
      // Demo o'qituvchilar
      const demoTeachers = [
        { id: 3, name: 'Olim Karimov', subject: 'Matematika' },
        { id: 4, name: 'Gulnora Husanova', subject: 'Ona tili' },
        { id: 5, name: 'Madina Yusupova', subject: 'Ingliz tili' },
        { id: 6, name: 'Rustam Jo\'rayev', subject: 'Fizika' }
      ];
      
      // Demo baholar
      const demoGrades = {};
      demoTeachers.forEach(teacher => {
        const grade = Math.floor(Math.random() * 3) + 3; // 3-5 oralig'ida
        demoGrades[user?.id || 1] = {
          [teacher.subject]: grade,
          date: '2024-01-' + (15 + Math.floor(Math.random() * 10)),
          teacher: teacher.name,
          comment: grade >= 4 ? 'Yaxshi ishladingiz' : 'Yaxshilash kerak'
        };
      });
      
      localStorage.setItem('grades', JSON.stringify(demoGrades));
      processGrades(demoGrades);
    } else {
      processGrades(allGrades);
    }
  }, [user?.id]);

  const processGrades = (allGrades) => {
    const userGrades = allGrades[user?.id || 1] || {};
    const gradesArray = [];
    
    // Fanlar ro'yxati
    const subjects = ['Matematika', 'Ona tili', 'Ingliz tili', 'Fizika', 'Kimyo', 'Biologiya', 'Tarix'];
    
    subjects.forEach(subject => {
      if (userGrades[subject]) {
        gradesArray.push({
          id: Date.now() + Math.random(),
          subject,
          grade: userGrades[subject],
          date: userGrades.date || '2024-01-15',
          teacher: userGrades.teacher || 'Noma\'lum o\'qituvchi',
          comment: userGrades.comment || 'Izoh yo\'q'
        });
      }
    });
    
    setGrades(gradesArray);
    setLoading(false);
  };

  const averageGrade = grades.length > 0 
    ? (grades.reduce((acc, grade) => acc + parseInt(grade.grade), 0) / grades.length).toFixed(1)
    : 0;

  const getGradeColor = (grade) => {
    if (grade >= 4.5) return 'success';
    if (grade >= 3.5) return 'primary';
    if (grade >= 3) return 'warning';
    return 'danger';
  };

  const getGradeIcon = (grade) => {
    if (grade >= 4.5) return 'bi-star-fill';
    if (grade >= 4) return 'bi-star-half';
    return 'bi-star';
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Yuklanmoqda...</span>
        </div>
        <p className="mt-2">Baholar yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-md-8">
          <h1>📊 Mening Baholarim</h1>
          <p className="lead">
            {user?.name} - {user?.grade}-{user?.classLetter} sinf o'quvchisi
          </p>
        </div>
        <div className="col-md-4 text-end">
          <button 
            className="btn btn-outline-primary"
            onClick={() => window.print()}
          >
            <i className="bi bi-printer me-1"></i>
            Chop etish
          </button>
        </div>
      </div>

      {/* Statistikalar */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center py-4">
              <div className="display-4 mb-2">{averageGrade}</div>
              <h6>O'rtacha baho</h6>
              <small>
                {averageGrade >= 4.5 ? "A'lo" : 
                 averageGrade >= 3.5 ? "Yaxshi" : 
                 averageGrade >= 3 ? "Qoniqarli" : "Qoniqarsiz"}
              </small>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center py-4">
              <div className="display-4 mb-2">{grades.length}</div>
              <h6>Baholangan fanlar</h6>
              <small>Jami {grades.length} ta fan</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center py-4">
              <div className="display-4 mb-2">
                {grades.filter(g => g.grade >= 4).length}
              </div>
              <h6>Yaxshi baholar</h6>
              <small>4 va 5 baholar</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center py-4">
              <div className="display-4 mb-2">
                {new Set(grades.map(g => g.teacher)).size}
              </div>
              <h6>O'qituvchilar</h6>
              <small>Baholagan ustozlar</small>
            </div>
          </div>
        </div>
      </div>

      {/* Baholar jadvali */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">
            <i className="bi bi-list-check me-2"></i>
            Fanlar bo'yicha baholar
          </h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Fan</th>
                  <th>Baho</th>
                  <th>Ustoz</th>
                  <th>Sana</th>
                  <th>Izoh</th>
                  <th>Daraja</th>
                </tr>
              </thead>
              <tbody>
                {grades.length > 0 ? (
                  grades.map((grade, index) => (
                    <tr key={grade.id}>
                      <td>{index + 1}</td>
                      <td>
                        <strong>{grade.subject}</strong>
                      </td>
                      <td>
                        <span className={`badge bg-${getGradeColor(grade.grade)} fs-6`}>
                          <i className={`bi ${getGradeIcon(grade.grade)} me-1`}></i>
                          {grade.grade}
                        </span>
                      </td>
                      <td>{grade.teacher}</td>
                      <td>{grade.date}</td>
                      <td>
                        <span className={grade.comment ? 'text-primary' : 'text-muted'}>
                          {grade.comment}
                        </span>
                      </td>
                      <td>
                        <span className={`badge bg-${getGradeColor(grade.grade)}`}>
                          {grade.grade >= 4.5 ? 'A\'lo' : 
                           grade.grade >= 3.5 ? 'Yaxshi' : 
                           grade.grade >= 3 ? 'Qoniqarli' : 'Qoniqarsiz'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="display-1 text-muted mb-3">📊</div>
                      <h4>Hozircha baholar yo'q</h4>
                      <p className="text-muted">O'qituvchilar sizni baholaguncha kuting</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Grafik va qo'shimcha ma'lumotlar */}
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h6 className="mb-0">
                <i className="bi bi-trophy me-2"></i>
                Eng yaxshi fanlar
              </h6>
            </div>
            <div className="card-body">
              {grades.filter(g => g.grade >= 4).length > 0 ? (
                <div className="list-group">
                  {grades
                    .filter(g => g.grade >= 4)
                    .sort((a, b) => b.grade - a.grade)
                    .map(grade => (
                      <div key={grade.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{grade.subject}</strong>
                          <div className="small text-muted">{grade.teacher}</div>
                        </div>
                        <div>
                          <span className={`badge bg-${getGradeColor(grade.grade)} fs-6`}>
                            {grade.grade}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <i className="bi bi-emoji-frown display-4 text-muted"></i>
                  <p className="mt-3">Hozircha yaxshi baholar yo'q</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-info text-white">
              <h6 className="mb-0">
                <i className="bi bi-lightbulb me-2"></i>
                Maslahatlar
              </h6>
            </div>
            <div className="card-body">
              <ul className="mb-0">
                <li className="mb-2">Har bir darsga tayyorgarlik bilan keling</li>
                <li className="mb-2">O'qituvchi bergan vazifalarni o'z vaqtida bajaring</li>
                <li className="mb-2">Agar tushunmagan bo'lsangiz, so'raganingizda</li>
                <li className="mb-2">Har hafta kamida 2-3 soat qo'shimcha o'qing</li>
                <li>Guruhdoshlaringiz bilan bilim almashing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Print uchun stillar */}
      <style>
        {`
          @media print {
            .navbar, .btn, footer, .card-header, .row:not(:first-child) {
              display: none !important;
            }
            
            .container {
              max-width: 100% !important;
              padding: 0 !important;
            }
            
            .table {
              border: 2px solid #000 !important;
            }
            
            .table th, .table td {
              border: 1px solid #000 !important;
              color: #000 !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default StudentGrades;
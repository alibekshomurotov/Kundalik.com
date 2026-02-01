// src/components/TeacherDashboard.jsx - Yangilangan versiya
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TeacherDashboard({ user }) {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [grades, setGrades] = useState({}); // { studentId: { subject: grade } }

  // Demo o'quvchilar ma'lumotlari
  useEffect(() => {
    const demoStudents = [
      { id: 1, name: 'Ali Aliyev', grade: '9', classLetter: 'E', email: 'ali@maktab.uz', phone: '+998 90 123 45 67' },
      { id: 2, name: 'Vali Valiyev', grade: '9', classLetter: 'E', email: 'vali@maktab.uz', phone: '+998 91 234 56 78' },
      { id: 3, name: 'Sara Sarayeva', grade: '9', classLetter: 'E', email: 'sara@maktab.uz', phone: '+998 92 345 67 89' },
      { id: 4, name: 'Malika Malikova', grade: '10', classLetter: 'A', email: 'malika@maktab.uz', phone: '+998 93 456 78 90' },
      { id: 5, name: 'Dilshod Dilshodov', grade: '10', classLetter: 'B', email: 'dilshod@maktab.uz', phone: '+998 94 567 89 01' },
      { id: 6, name: 'Jamol Jamolov', grade: '11', classLetter: 'F', email: 'jamol@maktab.uz', phone: '+998 95 678 90 12' }
    ];
    
    setStudents(demoStudents);
    
    // LocalStorage'dan baholarni yuklash
    const savedGrades = JSON.parse(localStorage.getItem('grades') || '{}');
    setGrades(savedGrades);
  }, []);

  // Baholarni saqlash
  const saveGradesToStorage = (updatedGrades) => {
    localStorage.setItem('grades', JSON.stringify(updatedGrades));
  };

  // Bahoni o'zgartirish
  const handleGradeChange = (studentId, newGrade) => {
    const updatedGrades = {
      ...grades,
      [studentId]: {
        ...grades[studentId],
        [user.subject]: newGrade,
        date: new Date().toLocaleDateString(),
        teacher: user.name
      }
    };
    
    setGrades(updatedGrades);
    saveGradesToStorage(updatedGrades);
  };

  // Izoh qo'shish
  const addComment = (studentId) => {
    const comment = prompt("O'quvchi uchun izoh kiriting:");
    if (comment) {
      const updatedGrades = {
        ...grades,
        [studentId]: {
          ...grades[studentId],
          comment: comment,
          commentDate: new Date().toLocaleDateString()
        }
      };
      
      setGrades(updatedGrades);
      saveGradesToStorage(updatedGrades);
      alert(`"${students.find(s => s.id === studentId)?.name}" uchun izoh saqlandi`);
    }
  };

  // Baholarni yuklab olish (CSV formatda)
  const downloadGrades = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "O'quvchi, Sinf, Email, Telefon, Baho, Sana, Izoh\n";
    
    students.forEach(student => {
      const studentGrade = grades[student.id] || {};
      const grade = studentGrade[user.subject] || 'Baholanmagan';
      const date = studentGrade.date || '';
      const comment = studentGrade.comment || '';
      
      csvContent += `${student.name},${student.grade}-${student.classLetter},${student.email},${student.phone},${grade},${date},"${comment}"\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `baholar_${user.subject}_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredStudents = students.filter(student => {
    const matchesClass = selectedClass === 'all' || `${student.grade}${student.classLetter}` === selectedClass;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const classes = ['all', '9E', '10A', '10B', '11F'];

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-md-8">
          <h1>
            <i className="bi bi-person-workspace text-success me-2"></i>
            O'qituvchi Boshqaruv Paneli
          </h1>
          <p className="lead">
            Xush kelibsiz, {user?.name}! Siz {user?.subject} fani o'qituvchisisiz
          </p>
        </div>
        <div className="col-md-4 text-end">
          <div className="btn-group">
            <button className="btn btn-success" onClick={downloadGrades}>
              <i className="bi bi-download me-1"></i>
              Baholarni yuklab olish
            </button>
            <Link to="/dashboard" className="btn btn-outline-primary">
              Bosh sahifa
            </Link>
          </div>
        </div>
      </div>

      {/* Statistika */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h3>{students.length}</h3>
              <p className="mb-0">O'quvchilar</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h3>
                {(() => {
                  const gradedStudents = students.filter(s => grades[s.id]?.[user.subject]);
                  return gradedStudents.length > 0 
                    ? (gradedStudents.reduce((acc, s) => acc + (grades[s.id][user.subject] || 0), 0) / gradedStudents.length).toFixed(1)
                    : 0;
                })()}
              </h3>
              <p className="mb-0">O'rtacha baho</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h3>
                {students.filter(s => grades[s.id]?.[user.subject]).length}
              </h3>
              <p className="mb-0">Baholanganlar</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h3>
                {students.filter(s => grades[s.id]?.[user.subject] >= 4).length}
              </h3>
              <p className="mb-0">Yaxshi (4+)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtrlar */}
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="O'quvchi ismi yoki email bo'yicha qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="form-select"
              style={{ width: '150px' }}
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {classes.map(cls => (
                <option key={cls} value={cls}>
                  {cls === 'all' ? 'Barcha sinflar' : cls + ' sinf'}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-4 text-end">
          <button className="btn btn-info">
            <i className="bi bi-filter me-1"></i>
            Filtrlash
          </button>
        </div>
      </div>

      {/* O'quvchilar va baholar jadvali */}
      <div className="card">
        <div className="card-header bg-dark text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <i className="bi bi-people me-2"></i>
              O'quvchilar va Baholash ({user?.subject})
            </h5>
            <span className="badge bg-light text-dark">
              {filteredStudents.length} ta o'quvchi
            </span>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>№</th>
                  <th>O'quvchi</th>
                  <th>Sinf</th>
                  <th>Email</th>
                  <th>Telefon</th>
                  <th>Baho (2-5)</th>
                  <th>Sana</th>
                  <th>Izoh</th>
                  <th>Harakatlar</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => {
                  const studentGrade = grades[student.id] || {};
                  const gradeValue = studentGrade[user.subject];
                  
                  return (
                    <tr key={student.id}>
                      <td>{index + 1}</td>
                      <td>
                        <strong>{student.name}</strong>
                      </td>
                      <td>
                        <span className="badge bg-secondary">
                          {student.grade}-{student.classLetter}
                        </span>
                      </td>
                      <td>
                        <small>{student.email}</small>
                      </td>
                      <td>
                        <small>{student.phone}</small>
                      </td>
                      
                      {/* Baho tanlash */}
                      <td>
                        <select
                          className={`form-select form-select-sm ${gradeValue ? 'fw-bold' : ''}`}
                          style={{ width: '100px' }}
                          value={gradeValue || ''}
                          onChange={(e) => handleGradeChange(student.id, e.target.value)}
                        >
                          <option value="">Tanlang</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </td>
                      
                      <td>
                        <small className="text-muted">
                          {studentGrade.date || '-'}
                        </small>
                      </td>
                      
                      <td>
                        <small className={studentGrade.comment ? 'text-primary' : 'text-muted'}>
                          {studentGrade.comment || 'Izoh yo\'q'}
                        </small>
                      </td>
                      
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button 
                            className="btn btn-outline-primary"
                            onClick={() => addComment(student.id)}
                            title="Izoh qo'shish"
                          >
                            <i className="bi bi-chat"></i>
                          </button>
                          <button 
                            className="btn btn-outline-info"
                            title="Batafsil ma'lumot"
                            onClick={() => {
                              alert(`O'quvchi: ${student.name}\nSinf: ${student.grade}-${student.classLetter}\nEmail: ${student.email}\nTelefon: ${student.phone}\nBaho: ${gradeValue || 'Baholanmagan'}\nIzoh: ${studentGrade.comment || 'Yo\'q'}`);
                            }}
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          <button 
                            className="btn btn-outline-success"
                            title="Xabar yuborish"
                            onClick={() => {
                              window.location.href = `mailto:${student.email}`;
                            }}
                          >
                            <i className="bi bi-send"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Qo'shimcha funksiyalar */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-warning">
              <h6 className="mb-0">
                <i className="bi bi-bell me-2"></i>
                Barchaga xabar yuborish
              </h6>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Xabar matni:</label>
                <textarea 
                  className="form-control" 
                  rows="3" 
                  placeholder="O'quvchilar uchun xabar..."
                ></textarea>
              </div>
              <button className="btn btn-warning w-100">
                <i className="bi bi-send me-1"></i>
                Xabar yuborish
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-info text-white">
              <h6 className="mb-0">
                <i className="bi bi-bar-chart me-2"></i>
                Baholar statistikasi
              </h6>
            </div>
            <div className="card-body">
              <div className="text-center">
                <div className="mb-3">
                  <h5>{user?.subject} bo'yicha baholar taqsimoti</h5>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>5 baho:</span>
                  <span className="badge bg-success">
                    {students.filter(s => grades[s.id]?.[user.subject] == 5).length}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>4 baho:</span>
                  <span className="badge bg-primary">
                    {students.filter(s => grades[s.id]?.[user.subject] == 4).length}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>3 baho:</span>
                  <span className="badge bg-warning">
                    {students.filter(s => grades[s.id]?.[user.subject] == 3).length}
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>2 baho:</span>
                  <span className="badge bg-danger">
                    {students.filter(s => grades[s.id]?.[user.subject] == 2).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
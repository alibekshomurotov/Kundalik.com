import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    grade: '',
    classLetter: '',
    phone: '',
    subject: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setFormData({
      ...formData,
      role: role
    });
    setStep(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Parol kuchini hisoblash
    if (name === 'password') {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
    
    // Xatoni tozalash
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const goBack = () => {
    setStep(1);
    setSelectedRole('');
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Ism va familiya talab qilinadi';
    if (!formData.email.trim()) newErrors.email = 'Email talab qilinadi';
    if (!formData.password) newErrors.password = 'Parol talab qilinadi';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Parollar mos kelmadi';
    if (formData.password.length < 6) newErrors.password = 'Parol kamida 6 belgi bo\'lishi kerak';
    
    if (formData.role === 'student') {
      if (!formData.grade) newErrors.grade = 'Sinf raqami talab qilinadi';
      if (!formData.classLetter) newErrors.classLetter = 'Sinf harfi talab qilinadi';
    }
    
    if (formData.role === 'teacher') {
      if (!formData.subject) newErrors.subject = 'Fan nomi talab qilinadi';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Foydalanuvchi ma'lumotlarini yaratish
    const userData = {
      ...formData,
      id: Date.now(),
      registeredDate: new Date().toISOString(),
      avatar: null,
      isActive: true
    };

    // Barcha foydalanuvchilarni bitta massivda saqlaymiz
    const allUsers = JSON.parse(localStorage.getItem('schoolUsers') || '[]');
    allUsers.push(userData);
    localStorage.setItem('schoolUsers', JSON.stringify(allUsers));

    // O'qituvchi yoki o'quvchi ro'yxatiga alohida saqlash
    const key = formData.role === 'teacher' ? 'teachers' : 'students';
    const existingData = JSON.parse(localStorage.getItem(key) || '[]');
    existingData.push(userData);
    localStorage.setItem(key, JSON.stringify(existingData));

    // Formani tozalash
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      grade: '',
      classLetter: '',
      phone: '',
      subject: ''
    });
    
    setSelectedRole('');
    setStep(1);
    setErrors({});
    
    // Muvaffaqiyat xabari va login sahifasiga yo'naltirish
    setTimeout(() => {
      alert(`Tabriklaymiz! ${formData.role === 'teacher' ? 'O\'qituvchi' : 'O\'quvchi'} sifatida muvaffaqiyatli ro'yxatdan o'tdingiz!`);
      navigate('/login');
    }, 500);
    
    setLoading(false);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return '#dc3545';
    if (passwordStrength < 50) return '#ffc107';
    if (passwordStrength < 75) return '#17a2b8';
    return '#28a745';
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Progress Steps */}
        <div className="progress-steps">
          <div className="step-item active">
            <div className="step-number">1</div>
            <div className="step-label">Rol tanlash</div>
          </div>
          <div className="step-divider"></div>
          <div className={`step-item ${step === 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Ma'lumotlarni to'ldirish</div>
          </div>
        </div>
        
        {/* Registration Card */}
        <div className="register-card">
          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div className="role-selection">
              <div className="register-header">
                <h2>Ro'yxatdan o'tish</h2>
                <p>Kim sifatida ro'yxatdan o'tmoqchisiz?</p>
              </div>
              
              <div className="role-cards">
                <div 
                  className={`role-card ${selectedRole === 'student' ? 'selected' : ''}`}
                  onClick={() => handleRoleSelect('student')}
                >
                  <div className="role-icon student">
                    <i className="bi bi-mortarboard-fill"></i>
                  </div>
                  <h3>O'quvchi</h3>
                  <p>Maktab o'quvchisi sifatida ro'yxatdan o'tish</p>
                  <div className="role-features">
                    <span><i className="bi bi-check-circle"></i> Dars jadvali</span>
                    <span><i className="bi bi-check-circle"></i> Baholarni ko'rish</span>
                    <span><i className="bi bi-check-circle"></i> Kutubxona</span>
                  </div>
                  <div className="select-btn">
                    Tanlash <i className="bi bi-arrow-right"></i>
                  </div>
                </div>
                
                <div 
                  className={`role-card ${selectedRole === 'teacher' ? 'selected' : ''}`}
                  onClick={() => handleRoleSelect('teacher')}
                >
                  <div className="role-icon teacher">
                    <i className="bi bi-person-workspace"></i>
                  </div>
                  <h3>O'qituvchi</h3>
                  <p>Maktab o'qituvchisi sifatida ro'yxatdan o'tish</p>
                  <div className="role-features">
                    <span><i className="bi bi-check-circle"></i> O'quvchilarni boshqarish</span>
                    <span><i className="bi bi-check-circle"></i> Baholash tizimi</span>
                    <span><i className="bi bi-check-circle"></i> Dars jadvali</span>
                  </div>
                  <div className="select-btn">
                    Tanlash <i className="bi bi-arrow-right"></i>
                  </div>
                </div>
              </div>
              
              <div className="register-footer">
                <p>
                  Allaqachon hisobingiz bormi?{' '}
                  <Link to="/login" className="login-link">
                    Tizimga kiring
                  </Link>
                </p>
              </div>
            </div>
          )}
          
          {/* Step 2: Form */}
          {step === 2 && (
            <div className="form-step">
              <div className="form-header">
                <button className="back-btn" onClick={goBack}>
                  <i className="bi bi-arrow-left"></i>
                </button>
                <h2>
                  {selectedRole === 'teacher' ? "O'qituvchi" : "O'quvchi"} ma'lumotlari
                </h2>
                <p>Iltimos, barcha maydonlarni to'ldiring</p>
              </div>
              
              <form onSubmit={handleSubmit} className="register-form">
                <div className="form-grid">
                  {/* Name */}
                  <div className="form-group">
                    <label htmlFor="name">
                      <i className="bi bi-person me-2"></i>
                      Ism va Familiya *
                    </label>
                    <input
                      type="text"
                      id="name"
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      name="name"
                      placeholder="Ali Aliyev"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    {errors.name && <div className="error-message">{errors.name}</div>}
                  </div>
                  
                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="bi bi-envelope me-2"></i>
                      Elektron pochta *
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      name="email"
                      placeholder="ali@maktab.uz"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                  </div>
                  
                  {/* Phone */}
                  <div className="form-group">
                    <label htmlFor="phone">
                      <i className="bi bi-telephone me-2"></i>
                      Telefon raqam
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="form-input"
                      name="phone"
                      placeholder="+998 90 123 45 67"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  {/* Role-specific fields */}
                  {selectedRole === 'student' ? (
                    <>
                      <div className="form-group">
                        <label htmlFor="grade">
                          <i className="bi bi-mortarboard me-2"></i>
                          Sinf raqami *
                        </label>
                        <select
                          id="grade"
                          className={`form-input ${errors.grade ? 'error' : ''}`}
                          name="grade"
                          value={formData.grade}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Tanlang</option>
                          {[1,2,3,4,5,6,7,8,9,10,11].map(num => (
                            <option key={num} value={num}>{num}-sinf</option>
                          ))}
                        </select>
                        {errors.grade && <div className="error-message">{errors.grade}</div>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="classLetter">
                          <i className="bi bi-fonts me-2"></i>
                          Sinf harfi *
                        </label>
                        <select
                          id="classLetter"
                          className={`form-input ${errors.classLetter ? 'error' : ''}`}
                          name="classLetter"
                          value={formData.classLetter}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Tanlang</option>
                          {['A', 'B', 'D', 'E', 'F'].map(letter => (
                            <option key={letter} value={letter}>{letter}</option>
                          ))}
                        </select>
                        {errors.classLetter && <div className="error-message">{errors.classLetter}</div>}
                      </div>
                    </>
                  ) : (
                    <div className="form-group full-width">
                      <label htmlFor="subject">
                        <i className="bi bi-book me-2"></i>
                        O'qitadigan fan(lar) *
                      </label>
                      <select
                        id="subject"
                        className={`form-input ${errors.subject ? 'error' : ''}`}
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Fan tanlang</option>
                        <option value="Matematika">Matematika</option>
                        <option value="Ona tili">Ona tili</option>
                        <option value="Ingliz tili">Ingliz tili</option>
                        <option value="Fizika">Fizika</option>
                        <option value="Kimyo">Kimyo</option>
                        <option value="Biologiya">Biologiya</option>
                        <option value="Tarix">Tarix</option>
                        <option value="Geografiya">Geografiya</option>
                        <option value="Informatika">Informatika</option>
                        <option value="Jismoniy tarbiya">Jismoniy tarbiya</option>
                      </select>
                      {errors.subject && <div className="error-message">{errors.subject}</div>}
                    </div>
                  )}
                  
                  {/* Password */}
                  <div className="form-group">
                    <label htmlFor="password">
                      <i className="bi bi-lock me-2"></i>
                      Parol *
                    </label>
                    <input
                      type="password"
                      id="password"
                      className={`form-input ${errors.password ? 'error' : ''}`}
                      name="password"
                      placeholder="Kamida 6 belgi"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    {errors.password && <div className="error-message">{errors.password}</div>}
                    <div className="password-strength">
                      <div className="strength-bar">
                        <div 
                          className="strength-fill"
                          style={{
                            width: `${passwordStrength}%`,
                            backgroundColor: getPasswordStrengthColor()
                          }}
                        ></div>
                      </div>
                      <div className="strength-label">
                        Parol kuchi: {passwordStrength < 25 ? 'Juda zaif' : 
                                    passwordStrength < 50 ? 'Zaif' : 
                                    passwordStrength < 75 ? 'Yaxshi' : 'Kuchli'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Confirm Password */}
                  <div className="form-group">
                    <label htmlFor="confirmPassword">
                      <i className="bi bi-lock-fill me-2"></i>
                      Parolni tasdiqlash *
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                      name="confirmPassword"
                      placeholder="Parolni takrorlang"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    {errors.confirmPassword && (
                      <div className="error-message">{errors.confirmPassword}</div>
                    )}
                  </div>
                </div>
                
                {/* Terms and Conditions */}
                <div className="terms-agreement">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                  />
                  <label htmlFor="terms">
                    Men <Link to="/terms">foydalanish shartlari</Link> bilan tanishdim va roziman
                  </label>
                </div>
                
                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="btn-modern btn-register w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Ro'yxatdan o'tilmoqda...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-person-plus me-2"></i>
                      Ro'yxatdan o'tish
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Register Page Styles */}
      <style>
        {`
          .register-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
          }
          
          .register-container {
            width: 100%;
            max-width: 1000px;
            z-index: 2;
          }
          
          .progress-steps {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 40px;
            gap: 20px;
          }
          
          .step-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }
          
          .step-number {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #e0e0e0;
            color: #999;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 20px;
            transition: all 0.3s ease;
          }
          
          .step-item.active .step-number {
            background: linear-gradient(90deg, #4361ee, #3a0ca3);
            color: white;
            box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
          }
          
          .step-label {
            font-size: 14px;
            color: #999;
            font-weight: 500;
          }
          
          .step-item.active .step-label {
            color: #4361ee;
            font-weight: 600;
          }
          
          .step-divider {
            width: 100px;
            height: 2px;
            background: #e0e0e0;
          }
          
          .register-card {
            background: white;
            border-radius: 30px;
            padding: 50px;
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
            animation: fadeInUp 0.6s ease-out;
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
          
          .register-header {
            text-align: center;
            margin-bottom: 50px;
          }
          
          .register-header h2 {
            font-size: 36px;
            font-weight: 800;
            background: linear-gradient(90deg, #4361ee, #3a0ca3);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            margin-bottom: 10px;
          }
          
          .register-header p {
            font-size: 18px;
            color: #666;
          }
          
          .role-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
          }
          
          .role-card {
            background: #f8f9ff;
            border-radius: 20px;
            padding: 40px 30px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid transparent;
            position: relative;
            overflow: hidden;
          }
          
          .role-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }
          
          .role-card.selected {
            border-color: #4361ee;
            background: linear-gradient(135deg, #f0f4ff 0%, #ffffff 100%);
            box-shadow: 0 20px 40px rgba(67, 97, 238, 0.15);
          }
          
          .role-card.selected::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 60px;
            height: 60px;
            background: #4361ee;
            border-radius: 0 0 0 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
          }
          
          .role-card.selected::after {
            content: '✓';
            position: absolute;
            top: 10px;
            right: 10px;
            color: white;
            font-size: 20px;
            font-weight: bold;
          }
          
          .role-icon {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
          }
          
          .role-icon.student {
            background: linear-gradient(135deg, #4361ee, #3a0ca3);
            color: white;
          }
          
          .role-icon.teacher {
            background: linear-gradient(135deg, #7209b7, #f72585);
            color: white;
          }
          
          .role-card h3 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 10px;
            color: #333;
          }
          
          .role-card p {
            color: #666;
            margin-bottom: 20px;
            line-height: 1.6;
          }
          
          .role-features {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 30px;
          }
          
          .role-features span {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #555;
            font-size: 14px;
          }
          
          .role-features i {
            color: #28a745;
          }
          
          .select-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 30px;
            background: linear-gradient(90deg, #4361ee, #3a0ca3);
            color: white;
            border-radius: 25px;
            font-weight: 600;
            transition: all 0.3s ease;
          }
          
          .role-card:hover .select-btn {
            transform: translateX(5px);
          }
          
          .register-footer {
            text-align: center;
            padding-top: 30px;
            border-top: 1px solid #e0e0e0;
          }
          
          .register-footer p {
            color: #666;
            margin: 0;
          }
          
          .login-link {
            color: #4361ee;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
          }
          
          .login-link:hover {
            color: #3a0ca3;
            text-decoration: underline;
          }
          
          /* Step 2 Styles */
          .form-header {
            margin-bottom: 40px;
            position: relative;
          }
          
          .back-btn {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #f0f0f0;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .back-btn:hover {
            background: #4361ee;
            color: white;
          }
          
          .form-header h2 {
            text-align: center;
            font-size: 28px;
            font-weight: 700;
            color: #333;
            margin-bottom: 10px;
          }
          
          .form-header p {
            text-align: center;
            color: #666;
            margin: 0;
          }
          
          .form-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 25px;
            margin-bottom: 30px;
          }
          
          .form-group.full-width {
            grid-column: 1 / -1;
          }
          
          .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #555;
            font-size: 14px;
          }
          
          .form-input {
            width: 100%;
            padding: 15px 20px !important;
            font-size: 16px;
            border: 2px solid #e0e0e0;
            border-radius: 15px;
            background: #f8f9fa;
            transition: all 0.3s ease;
          }
          
          .form-input:focus {
            border-color: #4361ee;
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
            background: white;
            outline: none;
          }
          
          .form-input.error {
            border-color: #dc3545;
          }
          
          .error-message {
            color: #dc3545;
            font-size: 14px;
            margin-top: 5px;
          }
          
          .password-strength {
            margin-top: 10px;
          }
          
          .strength-bar {
            height: 6px;
            background: #e0e0e0;
            border-radius: 3px;
            overflow: hidden;
            margin-bottom: 5px;
          }
          
          .strength-fill {
            height: 100%;
            transition: all 0.3s ease;
          }
          
          .strength-label {
            font-size: 12px;
            color: #666;
          }
          
          .terms-agreement {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 15px;
          }
          
          .terms-agreement input {
            width: 20px;
            height: 20px;
            cursor: pointer;
          }
          
          .terms-agreement label {
            margin: 0;
            color: #666;
          }
          
          .terms-agreement a {
            color: #4361ee;
            text-decoration: none;
          }
          
          .terms-agreement a:hover {
            text-decoration: underline;
          }
          
          .btn-register {
            background: linear-gradient(90deg, #4361ee, #3a0ca3);
            color: white;
            border: none;
            padding: 18px;
            border-radius: 15px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .btn-register:hover:not(:disabled) {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(67, 97, 238, 0.3);
          }
          
          .btn-register:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
          
          /* Responsive */
          @media (max-width: 768px) {
            .register-card {
              padding: 30px 20px;
            }
            
            .role-cards {
              grid-template-columns: 1fr;
            }
            
            .form-grid {
              grid-template-columns: 1fr;
            }
            
            .register-header h2 {
              font-size: 28px;
            }
          }
          
          @media (max-width: 576px) {
            .progress-steps {
              flex-direction: column;
              gap: 10px;
            }
            
            .step-divider {
              width: 2px;
              height: 30px;
            }
            
            .form-header h2 {
              font-size: 24px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Register;
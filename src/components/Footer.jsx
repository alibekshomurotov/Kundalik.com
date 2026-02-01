// src/components/Footer.jsx
function Footer() {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Maktab Dars Jadvali</h5>
            <p>
              O'quvchilar va o'qituvchilar uchun qulay dars jadvali tizimi.
              Barcha sinflar uchun dars jadvallarini boshqarish.
            </p>
          </div>
          
          <div className="col-md-4">
            <h5>Tez havolalar</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Bosh sahifa</a></li>
              <li><a href="/timetable" className="text-white text-decoration-none">Dars jadvali</a></li>
              <li><a href="/library" className="text-white text-decoration-none">Kutubxona</a></li>
              <li><a href="/profile" className="text-white text-decoration-none">Profil</a></li>
            </ul>
          </div>
          
          <div className="col-md-4">
            <h5>Aloqa</h5>
            <p>
              <i className="bi bi-telephone me-2"></i>
              +998 90 000 00 00
            </p>
            <p>
              <i className="bi bi-envelope me-2"></i>
              info@maktabdars.uz
            </p>
            <p>
              <i className="bi bi-geo-alt me-2"></i>
              Toshkent sh., Yunusobod tumani
            </p>
          </div>
        </div>
        
        <hr className="bg-light" />
        
        <div className="text-center">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Maktab Dars Jadvali. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
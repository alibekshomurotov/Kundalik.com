import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { booksData } from '../data/books'; // books.js faylidan import qilish kerak

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    // Demo ma'lumotlar (aslida API dan olinadi)
    const foundBook = booksData.find(b => b.id === parseInt(id));
    
    if (foundBook) {
      setBook(foundBook);
      
      // Tegishli kitoblarni topish
      const related = booksData
        .filter(b => b.category === foundBook.category && b.id !== foundBook.id)
        .slice(0, 3);
      setRelatedBooks(related);
      
      // Sevimlilarni tekshirish
      const favorites = JSON.parse(localStorage.getItem('libraryFavorites') || '[]');
      setIsFavorite(favorites.includes(foundBook.id));
    }
  }, [id]);

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('libraryFavorites') || '[]');
    
    if (!isFavorite) {
      favorites.push(book.id);
    } else {
      const index = favorites.indexOf(book.id);
      if (index > -1) {
        favorites.splice(index, 1);
      }
    }
    
    localStorage.setItem('libraryFavorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  const handleBorrow = () => {
    const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks') || '[]');
    
    if (!borrowedBooks.includes(book.id)) {
      borrowedBooks.push({
        id: book.id,
        title: book.title,
        borrowDate: new Date().toISOString(),
        returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // 2 hafta
      });
      
      localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
      alert(`"${book.title}" kitobi 2 haftaga sizga berildi!`);
    } else {
      alert('Siz bu kitobni allaqachon olgansiz!');
    }
  };

  if (!book) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Yuklanmoqda...</span>
        </div>
        <p className="mt-2">Kitob ma'lumotlari yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <button 
        className="btn btn-outline-primary mb-4"
        onClick={() => navigate('/library')}
      >
        <i className="bi bi-arrow-left me-1"></i>
        Kutubxonaga qaytish
      </button>

      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <img 
              src={book.cover} 
              className="card-img-top" 
              alt={book.title}
              style={{ height: '400px', objectFit: 'cover' }}
            />
            <div className="card-body text-center">
              <button 
                className={`btn ${isFavorite ? 'btn-warning' : 'btn-outline-warning'} w-100 mb-2`}
                onClick={handleFavorite}
              >
                <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'} me-1`}></i>
                {isFavorite ? 'Sevimlidan o\'chirish' : 'Sevimliga qo\'shish'}
              </button>
              
              <div className="d-grid gap-2">
                <button 
                  className={`btn ${book.available ? 'btn-success' : 'btn-secondary'}`}
                  onClick={handleBorrow}
                  disabled={!book.available}
                >
                  <i className="bi bi-book me-1"></i>
                  {book.available ? 'Kitobni olish' : 'Mavjud emas'}
                </button>
                
                <button className="btn btn-outline-primary">
                  <i className="bi bi-download me-1"></i>
                  PDF yuklab olish
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h1 className="card-title">{book.title}</h1>
                  <h4 className="card-subtitle text-muted">{book.author}</h4>
                </div>
                <div className="text-end">
                  <div className="badge bg-primary fs-6 mb-2">{book.category}</div>
                  <div>
                    <span className="text-warning fs-5">
                      <i className="bi bi-star-fill"></i> {book.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <p><strong>Nashr yili:</strong> {book.year}</p>
                  <p><strong>Sahifalar soni:</strong> {book.pages}</p>
                  <p><strong>Mavjudligi:</strong> 
                    <span className={`badge ms-2 ${book.available ? 'bg-success' : 'bg-danger'}`}>
                      {book.available ? 'Mavjud' : 'Mavjud emas'}
                    </span>
                  </p>
                </div>
                <div className="col-md-6">
                  <p><strong>Mos sinflar:</strong> {book.grade}</p>
                  <p><strong>Format:</strong> PDF, EPUB</p>
                  <p><strong>Til:</strong> O'zbek</p>
                </div>
              </div>

              <div className="mb-4">
                <h5>Kitob haqida</h5>
                <p>
                  {showFullDescription ? book.description : `${book.description.substring(0, 300)}...`}
                  {book.description.length > 300 && (
                    <button 
                      className="btn btn-link p-0 ms-1"
                      onClick={() => setShowFullDescription(!showFullDescription)}
                    >
                      {showFullDescription ? 'Kamroq' : 'To\'liq o\'qish'}
                    </button>
                  )}
                </p>
              </div>

              <div className="mb-4">
                <h5>Kitob xususiyatlari</h5>
                <ul>
                  <li>Rangli rasmlar va diagrammalar</li>
                  <li>Har bir bob oxirida mashqlar</li>
                  <li>Testlar va nazorat ishlari</li>
                  <li>QR kod orqali qo'shimcha materiallar</li>
                </ul>
              </div>

              <div className="alert alert-info">
                <h6><i className="bi bi-info-circle me-2"></i>Eslatma</h6>
                <p className="mb-0">
                  Kitobni olish uchun "Kitobni olish" tugmasini bosing. Kitob 2 hafta muddatga 
                  sizga beriladi. Muddati o'tgach, avtomatik ravishda kutubxonaga qaytariladi.
                </p>
              </div>
            </div>
          </div>

          {relatedBooks.length > 0 && (
            <div className="mt-4">
              <h4>Shu kategoriyadagi boshqa kitoblar</h4>
              <div className="row">
                {relatedBooks.map(relatedBook => (
                  <div key={relatedBook.id} className="col-md-4">
                    <div className="card">
                      <img 
                        src={relatedBook.cover} 
                        className="card-img-top" 
                        alt={relatedBook.title}
                        style={{ height: '150px', objectFit: 'cover' }}
                      />
                      <div className="card-body">
                        <h6 className="card-title">{relatedBook.title}</h6>
                        <p className="card-text small text-muted">{relatedBook.author}</p>
                        <button 
                          className="btn btn-sm btn-outline-primary w-100"
                          onClick={() => navigate(`/library/book/${relatedBook.id}`)}
                        >
                          Ko'rish
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
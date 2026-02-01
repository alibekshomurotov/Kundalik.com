import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';

function Favorites() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Demo kitoblar ma'lumotlari
    const demoBooks = [
      {
        id: 1,
        title: "O'tgan kunlar",
        author: "Abdulla Qodiriy",
        category: "Adabiyot",
        grade: "9-11",
        pages: 320,
        year: 1926,
        description: "O'zbek adabiyotining durdona asari",
        cover: "https://via.placeholder.com/150x200?text=O'tgan+kunlar",
        available: true,
        rating: 4.8
      },
      // ... boshqa kitoblar (yuqoridagi booksData dan)
    ];

    setBooksData(demoBooks);
    
    // Sevimlilarni olish
    const favorites = JSON.parse(localStorage.getItem('libraryFavorites') || '[]');
    const favBooks = demoBooks.filter(book => favorites.includes(book.id));
    
    setFavoriteBooks(favBooks);
    setLoading(false);
  }, []);

  const removeFavorite = (bookId) => {
    const favorites = JSON.parse(localStorage.getItem('libraryFavorites') || '[]');
    const updatedFavorites = favorites.filter(id => id !== bookId);
    localStorage.setItem('libraryFavorites', JSON.stringify(updatedFavorites));
    
    setFavoriteBooks(prev => prev.filter(book => book.id !== bookId));
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Yuklanmoqda...</span>
        </div>
        <p className="mt-2">Sevimli kitoblar yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-md-8">
          <h1>❤️ Sevimli Kitoblarim</h1>
          <p className="lead">Siz saqlagan va keyinroq o'qish uchun belgilagan kitoblaringiz</p>
        </div>
        <div className="col-md-4 text-end">
          <Link to="/library" className="btn btn-outline-primary">
            <i className="bi bi-arrow-left me-1"></i>
            Kutubxonaga qaytish
          </Link>
        </div>
      </div>

      {favoriteBooks.length === 0 ? (
        <div className="text-center py-5">
          <div className="display-1 text-muted mb-3">📚</div>
          <h3>Sevimli kitoblar yo'q</h3>
          <p className="text-muted mb-4">
            Kutubxonadan kitob tanlang va "Sevimliga qo'shish" tugmasini bosing
          </p>
          <Link to="/library" className="btn btn-primary btn-lg">
            <i className="bi bi-book me-1"></i>
            Kutubxonaga o'tish
          </Link>
        </div>
      ) : (
        <>
          <div className="row mb-4">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Sevimlilar statistikasi</h5>
                  <div className="row text-center">
                    <div className="col-md-4">
                      <h3>{favoriteBooks.length}</h3>
                      <p className="text-muted">Jami sevimli kitoblar</p>
                    </div>
                    <div className="col-md-4">
                      <h3>
                        {favoriteBooks.filter(b => b.category === 'Adabiyot').length}
                      </h3>
                      <p className="text-muted">Badiiy adabiyot</p>
                    </div>
                    <div className="col-md-4">
                      <h3>
                        {favoriteBooks.filter(b => b.category !== 'Adabiyot').length}
                      </h3>
                      <p className="text-muted">O'quv adabiyotlari</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {favoriteBooks.map(book => (
              <div key={book.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="card h-100">
                  <img 
                    src={book.cover} 
                    className="card-img-top" 
                    alt={book.title}
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text text-muted small">{book.author}</p>
                    <div className="mb-3">
                      <span className="badge bg-secondary me-1">{book.category}</span>
                      <span className="badge bg-info">{book.grade}-sinf</span>
                    </div>
                    
                    <div className="d-grid gap-2">
                      <Link 
                        to={`/library/book/${book.id}`}
                        className="btn btn-sm btn-primary"
                      >
                        <i className="bi bi-eye me-1"></i>
                        Ko'rish
                      </Link>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeFavorite(book.id)}
                      >
                        <i className="bi bi-trash me-1"></i>
                        O'chirish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row mt-5">
            <div className="col-12">
              <div className="card">
                <div className="card-header bg-warning">
                  <h5 className="mb-0">💡 Maslahatlar</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h6>Sevimlilaridan foydalanish:</h6>
                      <ul>
                        <li>Kitobni o'qishni rejalashtirganingizda sevimliga qo'shing</li>
                        <li>Muhim kitoblarni tez topish uchun saqlang</li>
                        <li>O'qigan kitoblarni o'chirib, yangilarini qo'shing</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h6>O'qish rejasi:</h6>
                      <ul>
                        <li>Kuniga kamida 30 daqiqa o'qing</li>
                        <li>Har oy 1-2 ta yangi kitob o'qing</li>
                        <li>O'qigan kitoblaringiz haqida qisqacha yozib boring</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Favorites;
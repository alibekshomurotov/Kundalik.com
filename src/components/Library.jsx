// src/components/Library.jsx - ZAMONAVIY VERSIYA
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';

function Library({ user, showNotification }) {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [loading, setLoading] = useState(true);

  // Demo kitoblar ma'lumotlari
  useEffect(() => {
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
        cover: "https://images.unsplash.com/photo-1544716278-e513176f20b5?w=400&h=500&fit=crop",
        available: true,
        rating: 4.8,
        downloads: 1245,
        isbn: "978-9943-4927-1-5",
        language: "O'zbek",
        publisher: "O'qituvchi",
        tags: ["roman", "tarixiy", "sevg", "o'zbek adabiyoti"]
      },
      {
        id: 2,
        title: "Matematika 9-sinf",
        author: "O. Karimov, G. Ismoilova",
        category: "Matematika",
        grade: "9",
        pages: 256,
        year: 2022,
        description: "9-sinf uchun matematika darsligi",
        cover: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=500&fit=crop",
        available: true,
        rating: 4.5,
        downloads: 987,
        isbn: "978-9943-12-456-7",
        language: "O'zbek",
        publisher: "O'qituvchi",
        tags: ["darslik", "algebra", "geometriya", "9-sinf"]
      },
      {
        id: 3,
        title: "Fizika asoslari",
        author: "R. Jo'rayev",
        category: "Fizika",
        grade: "10-11",
        pages: 400,
        year: 2021,
        description: "Fizika fanining asosiy tushunchalari",
        cover: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=500&fit=crop",
        available: true,
        rating: 4.6,
        downloads: 756,
        isbn: "978-9943-12-457-4",
        language: "O'zbek",
        publisher: "O'qituvchi",
        tags: ["darslik", "fizika", "laboratoriya", "10-sinf"]
      },
      {
        id: 4,
        title: "Kimyodan test to'plami",
        author: "G. Toshmatova",
        category: "Kimyo",
        grade: "10-11",
        pages: 180,
        year: 2023,
        description: "Testlar va masalalar to'plami",
        cover: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=500&fit=crop",
        available: false,
        rating: 4.7,
        downloads: 432,
        isbn: "978-9943-12-458-1",
        language: "O'zbek",
        publisher: "Testlar",
        tags: ["test", "masalalar", "kimyo", "10-sinf"]
      },
      {
        id: 5,
        title: "Ingliz tili grammatikasi",
        author: "M. Yusupova",
        category: "Ingliz tili",
        grade: "5-11",
        pages: 300,
        year: 2022,
        description: "Ingliz tilining grammatik qoidalari",
        cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=500&fit=crop",
        available: true,
        rating: 4.9,
        downloads: 1567,
        isbn: "978-9943-12-459-8",
        language: "Ingliz",
        publisher: "Language Press",
        tags: ["grammatika", "ingliz tili", "darslik"]
      },
      {
        id: 6,
        title: "Biologiya atlas",
        author: "L. Karimova",
        category: "Biologiya",
        grade: "7-9",
        pages: 150,
        year: 2021,
        description: "Rangli biologiya atlas",
        cover: "https://images.unsplash.com/photo-1530026405189-8e5d61d69b5c?w=400&h=500&fit=crop",
        available: true,
        rating: 4.4,
        downloads: 321,
        isbn: "978-9943-12-460-4",
        language: "O'zbek",
        publisher: "Atlas nashriyoti",
        tags: ["atlas", "biologiya", "rangli"]
      },
      {
        id: 7,
        title: "Alpomish",
        author: "Xalq ertagi",
        category: "Adabiyot",
        grade: "5-7",
        pages: 120,
        year: 2019,
        description: "O'zbek xalq ertagi",
        cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=500&fit=crop",
        available: true,
        rating: 4.8,
        downloads: 899,
        isbn: "978-9943-12-461-1",
        language: "O'zbek",
        publisher: "Xalq merosi",
        tags: ["ertak", "xalq", "doston"]
      },
      {
        id: 8,
        title: "Informatika darsligi",
        author: "D. Sattorov",
        category: "Informatika",
        grade: "10-11",
        pages: 280,
        year: 2023,
        description: "Zamonaviy informatika darsligi",
        cover: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=500&fit=crop",
        available: true,
        rating: 4.6,
        downloads: 654,
        isbn: "978-9943-12-462-8",
        language: "O'zbek",
        publisher: "IT Books",
        tags: ["informatika", "dasturlash", "kompyuter"]
      }
    ];

    setBooks(demoBooks);
    
    // LocalStorage'dan ma'lumotlarni olish
    const savedFavorites = JSON.parse(localStorage.getItem('libraryFavorites') || '[]');
    const savedBorrowed = JSON.parse(localStorage.getItem('borrowedBooks') || '[]');
    
    setFavorites(savedFavorites);
    setBorrowedBooks(savedBorrowed);
    setLoading(false);
  }, []);

  const categories = ['all', 'Adabiyot', 'Matematika', 'Fizika', 'Kimyo', 'Biologiya', 'Ingliz tili', 'Informatika', 'Tarix', 'Geografiya'];
  const grades = ['all', '1-4', '5-7', '8-9', '10-11'];

  const toggleFavorite = (bookId) => {
    let newFavorites;
    if (favorites.includes(bookId)) {
      newFavorites = favorites.filter(id => id !== bookId);
      showNotification('Kitob sevimlilardan o\'chirildi', 'info');
    } else {
      newFavorites = [...favorites, bookId];
      showNotification('Kitob sevimlilarga qo\'shildi', 'success');
    }
    setFavorites(newFavorites);
    localStorage.setItem('libraryFavorites', JSON.stringify(newFavorites));
  };

  const borrowBook = (book) => {
    const borrowed = JSON.parse(localStorage.getItem('borrowedBooks') || '[]');
    
    if (borrowed.find(b => b.id === book.id)) {
      showNotification('Siz bu kitobni allaqachon olgansiz!', 'warning');
      return;
    }
    
    const newBorrowed = {
      id: book.id,
      title: book.title,
      author: book.author,
      cover: book.cover,
      borrowDate: new Date().toISOString(),
      returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'borrowed'
    };
    
    borrowed.push(newBorrowed);
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowed));
    setBorrowedBooks(borrowed);
    
    showNotification(`"${book.title}" kitobi 2 haftaga sizga berildi!`, 'success');
  };

  const downloadBook = (book) => {
    showNotification(`"${book.title}" yuklanmoqda...`, 'info');
    
    // Simulate download
    setTimeout(() => {
      showNotification(`"${book.title}" muvaffaqiyatli yuklandi!`, 'success');
    }, 1500);
  };

  const filteredBooks = books.filter(book => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Category filter
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    
    // Grade filter
    const matchesGrade = selectedGrade === 'all' || book.grade.includes(selectedGrade);
    
    return matchesSearch && matchesCategory && matchesGrade;
  });

  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch(sortBy) {
      case 'popular':
        return b.downloads - a.downloads;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.year - a.year;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const totalBooks = books.length;
  const totalDownloads = books.reduce((sum, book) => sum + book.downloads, 0);
  const averageRating = (books.reduce((sum, book) => sum + book.rating, 0) / totalBooks).toFixed(1);

  if (loading) {
    return (
      <div className="library-page">
        <div className="container">
          <div className="loading-state">
            <div className="spinner-modern"></div>
            <p>Kutubxona yuklanmoqda...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="library-page">
      {/* Hero Section */}
      <div className="library-hero">
        <div className="container">
          <div className="hero-content">
            <h1>📚 Online Kutubxona</h1>
            <p className="hero-subtitle">
              O'quv adabiyotlari va badiiy kitoblar katalogi
            </p>
            <div className="search-container">
              <div className="search-box">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  placeholder="Kitob nomi, muallif yoki kalit so'z bo'yicha qidirish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    className="clear-search"
                    onClick={() => setSearchTerm('')}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
              <button className="btn-modern search-btn">
                <i className="bi bi-search"></i>
                Qidirish
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container library-content">
        {/* Filters and Stats */}
        <div className="library-toolbar">
          <div className="toolbar-left">
            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-value">{totalBooks}</div>
                <div className="stat-label">Jami kitoblar</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{favorites.length}</div>
                <div className="stat-label">Sevimlilar</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{totalDownloads}</div>
                <div className="stat-label">Yuklab olishlar</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{averageRating}</div>
                <div className="stat-label">O'rtacha reyting</div>
              </div>
            </div>
          </div>
          
          <div className="toolbar-right">
            <Link to="/library/favorites" className="btn-modern-outline favorites-btn">
              <i className="bi bi-heart"></i>
              Sevimlilar ({favorites.length})
            </Link>
            <Link to="/library/borrowed" className="btn-modern-outline borrowed-btn">
              <i className="bi bi-book"></i>
              Olingan kitoblar ({borrowedBooks.length})
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filter-group">
            <label htmlFor="category">
              <i className="bi bi-folder me-2"></i>
              Kategoriya
            </label>
            <select
              id="category"
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'Barcha kategoriyalar' : cat}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="grade">
              <i className="bi bi-mortarboard me-2"></i>
              Sinf
            </label>
            <select
              id="grade"
              className="filter-select"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              {grades.map(grade => (
                <option key={grade} value={grade}>
                  {grade === 'all' ? 'Barcha sinflar' : grade}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="sort">
              <i className="bi bi-sort-down me-2"></i>
              Tartiblash
            </label>
            <select
              id="sort"
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Ommabop</option>
              <option value="rating">Reyting</option>
              <option value="newest">Yangi</option>
              <option value="title">Alfavit</option>
            </select>
          </div>
          
          <div className="filter-group">
            <button 
              className="btn-modern reset-filters"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedGrade('all');
                setSortBy('popular');
                setSearchTerm('');
              }}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Filtrlarni tozalash
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-info">
          <h3>
            {sortedBooks.length} ta kitob topildi
            {selectedCategory !== 'all' && ` • ${selectedCategory}`}
            {selectedGrade !== 'all' && ` • ${selectedGrade} sinf`}
          </h3>
        </div>

        {/* Books Grid */}
        {sortedBooks.length > 0 ? (
          <div className="books-grid">
            {sortedBooks.map(book => (
              <div key={book.id} className="book-card-wrapper">
                <BookCard 
                  book={book}
                  isFavorite={favorites.includes(book.id)}
                  onToggleFavorite={() => toggleFavorite(book.id)}
                  onBorrow={() => borrowBook(book)}
                  onDownload={() => downloadBook(book)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">
              <i className="bi bi-search"></i>
            </div>
            <h3>Kitob topilmadi</h3>
            <p>Boshqa so'z yoki kategoriya bilan qidiring</p>
            <button 
              className="btn-modern"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedGrade('all');
                setSearchTerm('');
              }}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Barcha kitoblarni ko'rish
            </button>
          </div>
        )}

        {/* Popular Categories */}
        <div className="popular-categories">
          <h3 className="section-title">
            <i className="bi bi-star me-2"></i>
            Mashhur Kategoriyalar
          </h3>
          <div className="categories-grid">
            {categories.filter(cat => cat !== 'all').map(category => {
              const categoryBooks = books.filter(b => b.category === category);
              return (
                <Link 
                  key={category}
                  to="#" 
                  className="category-card"
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className="category-icon">
                    <i className={`bi bi-${category === 'Adabiyot' ? 'book' : 
                                      category === 'Matematika' ? 'calculator' : 
                                      category === 'Fizika' ? 'lightning' : 
                                      category === 'Kimyo' ? 'flask' : 
                                      category === 'Biologiya' ? 'flower2' : 
                                      category === 'Ingliz tili' ? 'translate' : 
                                      category === 'Informatika' ? 'pc-display' : 
                                      category === 'Tarix' ? 'clock-history' : 'geo-alt'}`}></i>
                  </div>
                  <div className="category-info">
                    <h4>{category}</h4>
                    <p>{categoryBooks.length} ta kitob</p>
                  </div>
                  <div className="category-arrow">
                    <i className="bi bi-arrow-right"></i>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Library Page Styles */}
      <style>
        {`
          .library-page {
            background: #f8f9ff;
            min-height: 100vh;
            padding-bottom: 60px;
          }
          
          .library-hero {
            background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
            color: white;
            padding: 80px 0 60px;
            margin-bottom: -30px;
            border-radius: 0 0 40px 40px;
            position: relative;
            overflow: hidden;
          }
          
          .library-hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
            opacity: 0.3;
          }
          
          .hero-content {
            position: relative;
            z-index: 2;
            text-align: center;
            max-width: 800px;
            margin: 0 auto;
          }
          
          .hero-content h1 {
            font-size: 48px;
            font-weight: 800;
            margin-bottom: 15px;
            color: white;
          }
          
          .hero-subtitle {
            font-size: 20px;
            opacity: 0.9;
            margin-bottom: 40px;
          }
          
          .search-container {
            display: flex;
            gap: 15px;
            max-width: 700px;
            margin: 0 auto;
          }
          
          .search-box {
            flex: 1;
            position: relative;
          }
          
          .search-box i {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            color: #999;
            font-size: 20px;
          }
          
          .search-box input {
            width: 100%;
            padding: 18px 20px 18px 55px;
            font-size: 16px;
            border: none;
            border-radius: 15px;
            background: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }
          
          .search-box input:focus {
            outline: none;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          }
          
          .clear-search {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #999;
            cursor: pointer;
            font-size: 20px;
            transition: color 0.3s ease;
          }
          
          .clear-search:hover {
            color: #333;
          }
          
          .search-btn {
            padding: 18px 30px;
            border-radius: 15px;
            font-weight: 600;
            white-space: nowrap;
          }
          
          .library-content {
            padding-top: 40px;
          }
          
          .library-toolbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
            flex-wrap: wrap;
            gap: 20px;
          }
          
          .stats-cards {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
          }
          
          .stat-card {
            background: white;
            border-radius: 15px;
            padding: 20px;
            min-width: 120px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
          }
          
          .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          }
          
          .stat-value {
            font-size: 32px;
            font-weight: 800;
            color: #4361ee;
            margin-bottom: 5px;
            line-height: 1;
          }
          
          .stat-label {
            font-size: 14px;
            color: #666;
            font-weight: 500;
          }
          
          .toolbar-right {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
          }
          
          .filters-section {
            display: flex;
            gap: 20px;
            margin-bottom: 30px;
            flex-wrap: wrap;
          }
          
          .filter-group {
            flex: 1;
            min-width: 200px;
          }
          
          .filter-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #333;
            font-size: 14px;
          }
          
          .filter-select {
            width: 100%;
            padding: 12px 20px;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            font-size: 16px;
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .filter-select:focus {
            border-color: #4361ee;
            outline: none;
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
          }
          
          .reset-filters {
            margin-top: 24px;
            width: 100%;
          }
          
          .results-info {
            margin-bottom: 30px;
          }
          
          .results-info h3 {
            font-size: 24px;
            font-weight: 700;
            color: #333;
          }
          
          .books-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 30px;
            margin-bottom: 60px;
          }
          
          .book-card-wrapper {
            transition: all 0.3s ease;
          }
          
          .book-card-wrapper:hover {
            transform: translateY(-10px);
          }
          
          .no-results {
            text-align: center;
            padding: 80px 20px;
            background: white;
            border-radius: 20px;
            margin: 40px 0;
          }
          
          .no-results-icon {
            font-size: 80px;
            color: #e0e0e0;
            margin-bottom: 20px;
          }
          
          .no-results h3 {
            font-size: 28px;
            color: #333;
            margin-bottom: 10px;
          }
          
          .no-results p {
            color: #666;
            margin-bottom: 30px;
            font-size: 18px;
          }
          
          .popular-categories {
            margin-top: 60px;
          }
          
          .section-title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 30px;
            color: #333;
            display: flex;
            align-items: center;
          }
          
          .categories-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
          }
          
          .category-card {
            background: white;
            border-radius: 15px;
            padding: 25px;
            display: flex;
            align-items: center;
            gap: 15px;
            text-decoration: none;
            color: #333;
            transition: all 0.3s ease;
            border: 2px solid transparent;
          }
          
          .category-card:hover {
            border-color: #4361ee;
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.1);
          }
          
          .category-icon {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            background: linear-gradient(135deg, #4361ee, #3a0ca3);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
          }
          
          .category-info {
            flex: 1;
          }
          
          .category-info h4 {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 5px;
          }
          
          .category-info p {
            font-size: 14px;
            color: #666;
            margin: 0;
          }
          
          .category-arrow {
            color: #999;
            font-size: 20px;
            transition: all 0.3s ease;
          }
          
          .category-card:hover .category-arrow {
            color: #4361ee;
            transform: translateX(5px);
          }
          
          .loading-state {
            text-align: center;
            padding: 100px 20px;
          }
          
          .loading-state p {
            margin-top: 20px;
            font-size: 18px;
            color: #666;
          }
          
          /* Responsive */
          @media (max-width: 768px) {
            .library-hero {
              padding: 60px 0 40px;
            }
            
            .hero-content h1 {
              font-size: 36px;
            }
            
            .search-container {
              flex-direction: column;
            }
            
            .search-btn {
              width: 100%;
            }
            
            .library-toolbar {
              flex-direction: column;
              align-items: stretch;
            }
            
            .stats-cards {
              justify-content: center;
            }
            
            .stat-card {
              min-width: 100px;
              padding: 15px;
            }
            
            .toolbar-right {
              justify-content: center;
            }
            
            .filters-section {
              flex-direction: column;
            }
            
            .books-grid {
              grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
              gap: 20px;
            }
            
            .categories-grid {
              grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            }
          }
          
          @media (max-width: 576px) {
            .hero-content h1 {
              font-size: 28px;
            }
            
            .hero-subtitle {
              font-size: 16px;
            }
            
            .stats-cards {
              grid-template-columns: repeat(2, 1fr);
            }
            
            .books-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Library;
// src/components/BookReader.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BookReader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [showNotes, setShowNotes] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState('light');

  const booksData = {
    1: {
      id: 1,
      title: "O'tgan kunlar",
      author: "Abdulla Qodiriy",
      description: "O'zbek adabiyotining durdona asari",
      pages: 320,
      cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600&fit=crop",
      category: "Adabiyot",
      year: 1926,
      language: "O'zbek"
    },
    2: {
      id: 2,
      title: "Matematika 9-sinf",
      author: "O. Karimov",
      description: "9-sinf uchun matematika darsligi",
      pages: 256,
      cover: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&fit=crop",
      category: "Matematika",
      year: 2022,
      language: "O'zbek"
    },
    3: {
      id: 3,
      title: "Fizika asoslari",
      author: "R. Jo'rayev",
      description: "Fizika fanining asosiy tushunchalari",
      pages: 400,
      cover: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&fit=crop",
      category: "Fizika",
      year: 2021,
      language: "O'zbek"
    }
  };

  useEffect(() => {
    const foundBook = booksData[id];
    if (foundBook) {
      setBook(foundBook);
      setTotalPages(Math.min(foundBook.pages, 50)); // Demo uchun max 50 sahifa
      
      // LocalStorage'dan eski bookmark va notelarni olish
      const savedBookmarks = JSON.parse(localStorage.getItem(`bookmarks_${id}`) || '[]');
      const savedNotes = JSON.parse(localStorage.getItem(`notes_${id}`) || '[]');
      setBookmarks(savedBookmarks);
      setNotes(savedNotes);
    } else {
      // Agar kitob topilmasa, kutubxonaga qaytish
      navigate('/library');
    }
  }, [id, navigate]);

  const addBookmark = () => {
    const newBookmark = {
      page: currentPage,
      date: new Date().toLocaleString(),
      note: `Sahifa ${currentPage}`
    };
    
    const updatedBookmarks = [...bookmarks, newBookmark];
    setBookmarks(updatedBookmarks);
    localStorage.setItem(`bookmarks_${id}`, JSON.stringify(updatedBookmarks));
    alert('Bookmark saqlandi!');
  };

  const addNote = () => {
    const noteText = prompt('Eslatma matnini kiriting:');
    if (noteText) {
      const newNote = {
        page: currentPage,
        text: noteText,
        date: new Date().toLocaleString(),
        color: '#fff3cd'
      };
      
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      localStorage.setItem(`notes_${id}`, JSON.stringify(updatedNotes));
    }
  };

  const toggleFullscreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        console.error(`Fullscreen error: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const downloadBook = () => {
    alert(`"${book.title}" kitobi yuklanmoqda...\n\nDemo rejim: Haqiqiy loyihada bu yerda PDF yuklab olish bo'ladi.`);
  };

  const shareBook = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `${book.title} - ${book.author}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Havola nusxalandi!');
    }
  };

  const generateDemoContent = () => {
    const content = [];
    const paragraphs = [
      "Bu demo kitob o'qish interfeysi. Haqiqiy loyihada bu yerda PDF yoki EPUB kitob kontenti bo'ladi.",
      "Kitob o'qish imkoniyatlari: sahifalarni aylantirish, zoom, bookmark qo'shish, eslatmalar yozish.",
      "Har bir o'quvchi o'zining sevimli kitoblarini onlayn o'qishi mumkin.",
      "Tizimda 100 dan ortiq o'quv adabiyotlari va badiiy kitoblar mavjud.",
      "Kitoblarni turli kategoryalarga ajratish mumkin: Matematika, Fizika, Kimyo, Adabiyot va boshqalar.",
      "Har bir kitob uchun batafsil ma'lumotlar, muallif haqida ma'lumot va kitob sharhlari mavjud.",
      "O'quvchilar kitob haqida fikr bildirishi va baho berishi mumkin.",
      "Muhim joylarni bookmark qilish orqali keyinroq tez topish imkoniyati.",
      "Kitob o'qish davomida eslatmalar yozish va ularni ranglar bilan ajratish.",
      "Turli xil o'qish rejimlari: kunduzgi, tungi, sepia."
    ];

    for (let i = 0; i < 5; i++) {
      content.push(
        <p key={i} style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          {paragraphs[i % paragraphs.length]} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      );
    }

    return content;
  };

  if (!book) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Yuklanmoqda...</span>
        </div>
        <p className="mt-2">Kitob yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className={`book-reader-container ${theme} ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="container-fluid py-3">
        {/* Reader toolbar */}
        <div className="reader-toolbar bg-dark text-white p-3 mb-3 rounded">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <button 
                className="btn btn-outline-light me-3"
                onClick={() => navigate('/library')}
              >
                <i className="bi bi-arrow-left me-1"></i>
                Orqaga
              </button>
              
              <div className="book-info">
                <h5 className="mb-0">{book.title}</h5>
                <small className="text-light">{book.author}</small>
              </div>
            </div>
            
            <div className="d-flex align-items-center">
              <div className="btn-group me-3">
                <button 
                  className="btn btn-outline-light btn-sm"
                  onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                >
                  <i className="bi bi-dash-lg"></i>
                </button>
                <span className="btn btn-outline-light btn-sm disabled">
                  {fontSize}px
                </span>
                <button 
                  className="btn btn-outline-light btn-sm"
                  onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                >
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>
              
              <div className="btn-group me-3">
                <button 
                  className={`btn btn-outline-light btn-sm ${theme === 'light' ? 'active' : ''}`}
                  onClick={() => setTheme('light')}
                >
                  <i className="bi bi-sun"></i>
                </button>
                <button 
                  className={`btn btn-outline-light btn-sm ${theme === 'dark' ? 'active' : ''}`}
                  onClick={() => setTheme('dark')}
                >
                  <i className="bi bi-moon"></i>
                </button>
                <button 
                  className={`btn btn-outline-light btn-sm ${theme === 'sepia' ? 'active' : ''}`}
                  onClick={() => setTheme('sepia')}
                >
                  <i className="bi bi-eyedropper"></i>
                </button>
              </div>
              
              <button 
                className="btn btn-outline-light me-2"
                onClick={toggleFullscreen}
              >
                <i className={`bi ${isFullscreen ? 'bi-fullscreen-exit' : 'bi-fullscreen'}`}></i>
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Main content */}
          <div className="col-lg-9">
            <div className="card reader-content-card">
              <div className="card-body p-0">
                <div 
                  className="reader-content p-5"
                  style={{
                    fontSize: `${fontSize}px`,
                    minHeight: '70vh',
                    backgroundColor: theme === 'dark' ? '#1a1a1a' : 
                                   theme === 'sepia' ? '#f4ecd8' : 'white',
                    color: theme === 'dark' ? '#e0e0e0' : '#333'
                  }}
                >
                  <div className="text-center mb-5">
                    <h2>{book.title}</h2>
                    <h4 className="text-muted">{book.author}</h4>
                    <hr className="my-4" />
                  </div>
                  
                  {generateDemoContent()}
                  
                  <div className="text-center mt-5 pt-5 border-top">
                    <p className="text-muted">- {currentPage} -</p>
                  </div>
                </div>
              </div>
              
              <div className="card-footer">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      <i className="bi bi-chevron-left"></i> Oldingi
                    </button>
                    <span className="btn btn-outline-secondary disabled">
                      {currentPage} / {totalPages}
                    </span>
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Keyingi <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                  
                  <div className="d-flex">
                    <input
                      type="range"
                      className="form-range mx-3"
                      min="1"
                      max={totalPages}
                      value={currentPage}
                      onChange={(e) => setCurrentPage(parseInt(e.target.value))}
                      style={{ width: '200px' }}
                    />
                    
                    <div className="btn-group">
                      <button className="btn btn-outline-success" onClick={addBookmark}>
                        <i className="bi bi-bookmark"></i>
                      </button>
                      <button className="btn btn-outline-warning" onClick={addNote}>
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-outline-info" onClick={downloadBook}>
                        <i className="bi bi-download"></i>
                      </button>
                      <button className="btn btn-outline-secondary" onClick={shareBook}>
                        <i className="bi bi-share"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="col-lg-3">
            <div className="sticky-top" style={{ top: '20px' }}>
              {/* Book details */}
              <div className="card mb-3">
                <div className="card-header">
                  <h6 className="mb-0">
                    <i className="bi bi-info-circle me-2"></i>
                    Kitob haqida
                  </h6>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <strong>Muallif:</strong> {book.author}
                    </li>
                    <li className="mb-2">
                      <strong>Sahifalar:</strong> {book.pages}
                    </li>
                    <li className="mb-2">
                      <strong>Yil:</strong> {book.year}
                    </li>
                    <li className="mb-2">
                      <strong>Kategoriya:</strong> {book.category}
                    </li>
                    <li>
                      <strong>Til:</strong> {book.language}
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Bookmarks */}
              <div className="card mb-3">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">
                      <i className="bi bi-bookmark-check me-2"></i>
                      Bookmarklar ({bookmarks.length})
                    </h6>
                    {bookmarks.length > 0 && (
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => {
                          setBookmarks([]);
                          localStorage.setItem(`bookmarks_${id}`, '[]');
                        }}
                      >
                        Tozalash
                      </button>
                    )}
                  </div>
                </div>
                <div className="card-body" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {bookmarks.length > 0 ? (
                    <div className="list-group list-group-flush">
                      {bookmarks.map((bm, index) => (
                        <button
                          key={index}
                          className="list-group-item list-group-item-action text-start"
                          onClick={() => setCurrentPage(bm.page)}
                        >
                          <div className="d-flex justify-content-between">
                            <strong>Sahifa {bm.page}</strong>
                            <small className="text-muted">{bm.date}</small>
                          </div>
                          {bm.note && <small className="text-muted">{bm.note}</small>}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted text-center mb-0">Bookmarklar yo'q</p>
                  )}
                </div>
              </div>
              
              {/* Notes */}
              <div className="card">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">
                      <i className="bi bi-journal-text me-2"></i>
                      Eslatmalar ({notes.length})
                    </h6>
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => setShowNotes(!showNotes)}
                    >
                      {showNotes ? 'Yashirish' : 'Ko\'rish'}
                    </button>
                  </div>
                </div>
                
                {showNotes && (
                  <div className="card-body" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {notes.length > 0 ? (
                      <div>
                        {notes.map((note, index) => (
                          <div 
                            key={index} 
                            className="mb-3 p-3 border rounded"
                            style={{ backgroundColor: note.color }}
                          >
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <strong className="badge bg-primary">Sahifa {note.page}</strong>
                              <button 
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => {
                                  const updated = notes.filter((_, i) => i !== index);
                                  setNotes(updated);
                                  localStorage.setItem(`notes_${id}`, JSON.stringify(updated));
                                }}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                            <p className="mb-2">{note.text}</p>
                            <small className="text-muted d-block">{note.date}</small>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted text-center mb-0">Eslatmalar yo'q</p>
                    )}
                    
                    <button className="btn btn-primary w-100 mt-2" onClick={addNote}>
                      <i className="bi bi-plus-circle me-1"></i>
                      Yangi eslatma
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
          .book-reader-container.fullscreen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: white;
            z-index: 9999;
            overflow: auto;
          }
          
          .book-reader-container.dark .reader-content-card {
            background-color: #1a1a1a;
            color: #e0e0e0;
          }
          
          .book-reader-container.sepia .reader-content-card {
            background-color: #f4ecd8;
            color: #5c4b37;
          }
          
          .reader-toolbar {
            position: sticky;
            top: 0;
            z-index: 1000;
          }
          
          .reader-content {
            line-height: 1.8;
            font-family: 'Georgia', 'Times New Roman', serif;
          }
          
          @media (max-width: 768px) {
            .reader-content {
              padding: 2rem !important;
              font-size: 14px !important;
            }
            
            .reader-toolbar .btn-group {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}

export default BookReader;
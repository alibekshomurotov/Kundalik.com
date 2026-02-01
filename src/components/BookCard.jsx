// src/components/BookCard.jsx - ZAMONAVIY VERSIYA
import { useState } from 'react';
import { Link } from 'react-router-dom';

function BookCard({ book, isFavorite, onToggleFavorite, onBorrow, onDownload }) {
  const [imageError, setImageError] = useState(false);

  const getGradeColor = (grade) => {
    const colors = {
      '1-4': '#4cc9f0',
      '5-7': '#7209b7',
      '8-9': '#f72585',
      '10-11': '#4361ee',
      '9': '#4361ee',
      '10': '#7209b7',
      '11': '#f72585'
    };
    
    return colors[grade] || '#666';
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return '#28a745';
    if (rating >= 4) return '#17a2b8';
    if (rating >= 3.5) return '#ffc107';
    return '#dc3545';
  };

  return (
    <div className="modern-book-card">
      {/* Book Cover */}
      <div className="book-cover-container">
        <div className="book-cover">
          {imageError ? (
            <div className="cover-placeholder">
              <i className="bi bi-book"></i>
              <span>{book.title.substring(0, 2)}</span>
            </div>
          ) : (
            <img 
              src={book.cover} 
              alt={book.title}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          )}
          
          {/* Favorite Button */}
          <button 
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={onToggleFavorite}
            aria-label={isFavorite ? "Sevimlidan o'chirish" : "Sevimliga qo'shish"}
          >
            <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          </button>
          
          {/* Availability Badge */}
          {!book.available && (
            <div className="availability-badge">
              <span>Mavjud emas</span>
            </div>
          )}
          
          {/* Grade Badge */}
          <div 
            className="grade-badge"
            style={{ backgroundColor: getGradeColor(book.grade) }}
          >
            {book.grade} sinf
          </div>
        </div>
      </div>
      
      {/* Book Info */}
      <div className="book-info">
        {/* Category */}
        <div className="book-category">
          <span className="category-badge">{book.category}</span>
          <div className="book-year">{book.year}</div>
        </div>
        
        {/* Title */}
        <h3 className="book-title">
          <Link to={`/library/book/${book.id}`}>
            {book.title}
          </Link>
        </h3>
        
        {/* Author */}
        <p className="book-author">
          <i className="bi bi-person me-2"></i>
          {book.author}
        </p>
        
        {/* Stats */}
        <div className="book-stats">
          <div className="stat-item">
            <i className="bi bi-download"></i>
            <span>{book.downloads.toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <i className="bi bi-file-text"></i>
            <span>{book.pages} sahifa</span>
          </div>
          <div className="stat-item rating" style={{ color: getRatingColor(book.rating) }}>
            <i className="bi bi-star-fill"></i>
            <span>{book.rating}</span>
          </div>
        </div>
        
        {/* Description (truncated) */}
        <p className="book-description">
          {book.description.length > 100 
            ? `${book.description.substring(0, 100)}...` 
            : book.description}
        </p>
        
        {/* Tags */}
        <div className="book-tags">
          {book.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
          {book.tags.length > 3 && (
            <span className="tag more">+{book.tags.length - 3}</span>
          )}
        </div>
        
        {/* Actions */}
        <div className="book-actions">
          <Link 
            to={`/library/book/${book.id}`}
            className="btn-action view-btn"
          >
            <i className="bi bi-eye me-2"></i>
            Ko'rish
          </Link>
          
          <button 
            className={`btn-action borrow-btn ${!book.available ? 'disabled' : ''}`}
            onClick={onBorrow}
            disabled={!book.available}
          >
            <i className="bi bi-book me-2"></i>
            {book.available ? 'Olish' : 'Mavjud emas'}
          </button>
          
          <button 
            className="btn-action download-btn"
            onClick={onDownload}
          >
            <i className="bi bi-download me-2"></i>
            Yuklash
          </button>
        </div>
      </div>
      
      {/* Book Card Styles */}
      <style>
        {`
          .modern-book-card {
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          
          .modern-book-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          }
          
          .book-cover-container {
            position: relative;
            padding: 20px;
            background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
          }
          
          .book-cover {
            position: relative;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            aspect-ratio: 2/3;
            background: white;
          }
          
          .book-cover img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }
          
          .modern-book-card:hover .book-cover img {
            transform: scale(1.05);
          }
          
          .cover-placeholder {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #4361ee, #3a0ca3);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
          }
          
          .cover-placeholder i {
            font-size: 48px;
            margin-bottom: 10px;
            opacity: 0.8;
          }
          
          .cover-placeholder span {
            font-weight: 800;
            font-size: 32px;
          }
          
          .favorite-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: white;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #999;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            z-index: 2;
          }
          
          .favorite-btn:hover {
            color: #f72585;
            transform: scale(1.1);
          }
          
          .favorite-btn.active {
            background: #f72585;
            color: white;
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(247, 37, 133, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(247, 37, 133, 0); }
            100% { box-shadow: 0 0 0 0 rgba(247, 37, 133, 0); }
          }
          
          .availability-badge {
            position: absolute;
            top: 15px;
            left: 15px;
            background: rgba(220, 53, 69, 0.9);
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            z-index: 2;
          }
          
          .grade-badge {
            position: absolute;
            bottom: 15px;
            right: 15px;
            background: #4361ee;
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            z-index: 2;
          }
          
          .book-info {
            padding: 20px;
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          
          .book-category {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
          }
          
          .category-badge {
            background: linear-gradient(135deg, #4361ee, #3a0ca3);
            color: white;
            padding: 5px 15px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .book-year {
            color: #999;
            font-size: 14px;
            font-weight: 500;
          }
          
          .book-title {
            margin: 0 0 10px 0;
            font-size: 20px;
            font-weight: 700;
            line-height: 1.3;
          }
          
          .book-title a {
            color: #333;
            text-decoration: none;
            transition: color 0.3s ease;
          }
          
          .book-title a:hover {
            color: #4361ee;
          }
          
          .book-author {
            color: #666;
            font-size: 14px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
          }
          
          .book-stats {
            display: flex;
            gap: 15px;
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #f0f0f0;
          }
          
          .stat-item {
            display: flex;
            align-items: center;
            gap: 5px;
            color: #666;
            font-size: 14px;
          }
          
          .stat-item i {
            font-size: 16px;
          }
          
          .stat-item.rating {
            font-weight: 600;
          }
          
          .book-description {
            color: #666;
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 15px;
            flex: 1;
          }
          
          .book-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 20px;
          }
          
          .tag {
            background: #f0f4ff;
            color: #4361ee;
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: 500;
          }
          
          .tag.more {
            background: #f8f9fa;
            color: #999;
          }
          
          .book-actions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          
          .btn-action {
            padding: 10px 15px;
            border-radius: 10px;
            border: none;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
          }
          
          .view-btn {
            background: linear-gradient(135deg, #4361ee, #3a0ca3);
            color: white;
            grid-column: 1 / -1;
          }
          
          .view-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
          }
          
          .borrow-btn {
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
          }
          
          .borrow-btn.disabled {
            background: #6c757d;
            cursor: not-allowed;
            opacity: 0.7;
          }
          
          .borrow-btn:not(.disabled):hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
          }
          
          .download-btn {
            background: linear-gradient(135deg, #ffc107, #fd7e14);
            color: white;
          }
          
          .download-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 193, 7, 0.3);
          }
          
          /* Responsive */
          @media (max-width: 768px) {
            .book-actions {
              grid-template-columns: 1fr;
            }
            
            .book-title {
              font-size: 18px;
            }
            
            .book-stats {
              flex-wrap: wrap;
            }
          }
        `}
      </style>
    </div>
  );
}

export default BookCard;
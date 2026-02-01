// src/components/Gallery.jsx
import { useState } from 'react';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'Barchasi', count: 24 },
    { id: 'events', name: 'Tadbirlar', count: 8 },
    { id: 'lessons', name: 'Darslar', count: 6 },
    { id: 'sports', name: 'Sport', count: 5 },
    { id: 'excursions', name: 'Ekskursiyalar', count: 3 },
    { id: 'graduation', name: 'Bitiruv', count: 2 }
  ];
  
  const images = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&fit=crop",
      title: "Matematika olimpiadasi",
      category: "events",
      date: "15.01.2024",
      author: "O. Karimov",
      likes: 45,
      comments: 12
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&fit=crop",
      title: "Jismoniy tarbiya darsi",
      category: "sports",
      date: "10.01.2024",
      author: "A. Tursunov",
      likes: 67,
      comments: 8
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&fit=crop",
      title: "Kimyo laboratoriyasi",
      category: "lessons",
      date: "05.01.2024",
      author: "G. Toshmatova",
      likes: 89,
      comments: 15
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&fit=crop",
      title: "Kutubxona yangi kitoblari",
      category: "events",
      date: "03.01.2024",
      author: "Maktab admin",
      likes: 123,
      comments: 23
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&fit=crop",
      title: "Informatika darsi",
      category: "lessons",
      date: "28.12.2023",
      author: "D. Sattorov",
      likes: 56,
      comments: 9
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1462536943532-57a629f6cc60?w=600&fit=crop",
      title: "Botanika bog'iga ekskursiya",
      category: "excursions",
      date: "20.12.2023",
      author: "L. Karimova",
      likes: 145,
      comments: 31
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&fit=crop",
      title: "Yangi sinf xonasi",
      category: "events",
      date: "15.12.2023",
      author: "Maktab admin",
      likes: 98,
      comments: 17
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&fit=crop",
      title: "Musiqa darsi",
      category: "lessons",
      date: "10.12.2023",
      author: "F. Sobirova",
      likes: 76,
      comments: 11
    }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const uploadImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert('Rasm hajmi 5MB dan oshmasligi kerak!');
          return;
        }
        
        // Rasmni yuklash simulyatsiyasi
        alert('Rasm yuklanmoqda... Admin tomonidan tasdiqlangandan keyin galereyaga qo\'shiladi.');
      }
    };
    
    input.click();
  };

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-md-8">
          <h1>📸 Maktab Galereyasi</h1>
          <p className="lead">Maktab hayotidagi eng yaxshi lahzalar</p>
        </div>
        <div className="col-md-4 text-end">
          <button className="btn btn-primary" onClick={uploadImage}>
            <i className="bi bi-cloud-upload me-1"></i>
            Rasm yuklash
          </button>
        </div>
      </div>

      {/* Kategoriyalar */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`btn ${selectedCategory === cat.id ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.name}
                    <span className="badge bg-light text-dark ms-1">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rasm grid */}
      <div className="row">
        {filteredImages.map(image => (
          <div key={image.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card gallery-card h-100">
              <div 
                className="gallery-image position-relative"
                style={{
                  height: '200px',
                  backgroundImage: `url(${image.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedImage(image)}
              >
                <div className="position-absolute bottom-0 start-0 end-0 p-3" 
                  style={{
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))'
                  }}>
                  <h6 className="text-white mb-1">{image.title}</h6>
                  <small className="text-light">{image.date}</small>
                </div>
              </div>
              
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <i className="bi bi-person-circle me-1"></i>
                    <small className="text-muted">{image.author}</small>
                  </div>
                  <div>
                    <button className="btn btn-sm btn-outline-danger me-2">
                      <i className="bi bi-heart"></i> {image.likes}
                    </button>
                    <button className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-chat"></i> {image.comments}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="card-footer">
                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setSelectedImage(image)}
                  >
                    <i className="bi bi-zoom-in me-1"></i>
                    Kattalashtirish
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal/Lightbox */}
      {selectedImage && (
        <div 
          className="modal fade show"
          style={{ 
            display: 'block',
            backgroundColor: 'rgba(0,0,0,0.8)'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedImage.title}</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setSelectedImage(null)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.title}
                  className="img-fluid"
                  style={{ maxHeight: '70vh', objectFit: 'contain' }}
                />
                <div className="mt-3">
                  <p><strong>Muallif:</strong> {selectedImage.author}</p>
                  <p><strong>Sana:</strong> {selectedImage.date}</p>
                  <p><strong>Izohlar:</strong> {selectedImage.comments} | <strong>Layklar:</strong> {selectedImage.likes}</p>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setSelectedImage(null)}
                >
                  Yopish
                </button>
                <a 
                  href={selectedImage.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  To'liq o'lchamda ochish
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload ko'rsatmalari */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Rasm yuklash qoidalari
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h6>Ruxsat etilgan:</h6>
                  <ul>
                    <li>Maktab tadbirlari suratlari</li>
                    <li>Dars jarayoni suratlari</li>
                    <li>Sport musobaqalari</li>
                    <li>Ekskursiyalar va sayohatlar</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h6>Cheklovlar:</h6>
                  <ul>
                    <li>Max hajm: 5MB</li>
                    <li>Formatlar: JPG, PNG, GIF</li>
                    <li>O'lcham: kamida 800x600 piksel</li>
                    <li>Har bir o'quvchi oyiga max 10 ta rasm</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .gallery-card {
            transition: transform 0.3s ease;
          }
          
          .gallery-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          }
          
          .gallery-image {
            transition: opacity 0.3s ease;
          }
          
          .gallery-image:hover {
            opacity: 0.9;
          }
          
          .modal {
            z-index: 9999;
          }
        `}
      </style>
    </div>
  );
}

export default Gallery;
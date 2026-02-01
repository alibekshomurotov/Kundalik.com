// src/components/VideoLessons.jsx
import { useState } from 'react';
import ReactPlayer from 'react-player';

function VideoLessons() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = [
    { id: 'all', name: 'Barchasi' },
    { id: 'mathematics', name: 'Matematika' },
    { id: 'physics', name: 'Fizika' },
    { id: 'chemistry', name: 'Kimyo' },
    { id: 'biology', name: 'Biologiya' },
    { id: 'english', name: 'Ingliz tili' },
    { id: 'informatics', name: 'Informatika' }
  ];
  
  const videos = [
    {
      id: 1,
      title: "Algebra - Kvadrat tenglamalar",
      description: "Kvadrat tenglamalarni yechish usullari",
      category: 'mathematics',
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Demo URL
      duration: "15:30",
      views: 1245,
      likes: 89,
      teacher: "O. Karimov",
      grade: "9-11",
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Fizika - Nyuton qonunlari",
      description: "Nyutonning harakat qonunlari",
      category: 'physics',
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "22:15",
      views: 987,
      likes: 67,
      teacher: "R. Jo'rayev",
      grade: "10-11",
      date: "2024-01-10"
    },
    {
      id: 3,
      title: "Kimyo - Elementlar davriy jadvali",
      description: "Elementlarning tasnifi va xususiyatlari",
      category: 'chemistry',
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "18:45",
      views: 756,
      likes: 45,
      teacher: "G. Toshmatova",
      grade: "9-11",
      date: "2024-01-05"
    },
    {
      id: 4,
      title: "Ingliz tili - Present Perfect",
      description: "Present Perfect zamonining qo'llanilishi",
      category: 'english',
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "25:10",
      views: 1567,
      likes: 123,
      teacher: "M. Yusupova",
      grade: "5-11",
      date: "2024-01-03"
    },
    {
      id: 5,
      title: "Informatika - Python dasturlash",
      description: "Python dasturlash tiliga kirish",
      category: 'informatics',
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "30:20",
      views: 2345,
      likes: 178,
      teacher: "D. Sattorov",
      grade: "10-11",
      date: "2024-01-01"
    }
  ];
  
  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-md-8">
          <h1>🎥 Video Darslar</h1>
          <p className="lead">O'qituvchilar tomonidan tayyorlangan video darslar</p>
        </div>
        <div className="col-md-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Video qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary">
              <i className="bi bi-search"></i>
            </button>
          </div>
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
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video pleylist */}
      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body p-0">
              <div className="ratio ratio-16x9">
                <ReactPlayer
                  url={filteredVideos[0]?.url || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
                  width="100%"
                  height="100%"
                  controls
                  light={filteredVideos[0]?.thumbnail}
                />
              </div>
            </div>
            <div className="card-footer">
              <h5>{filteredVideos[0]?.title || "Video dars"}</h5>
              <p className="text-muted mb-2">{filteredVideos[0]?.description}</p>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="badge bg-primary me-2">{filteredVideos[0]?.grade}</span>
                  <span className="text-muted">{filteredVideos[0]?.teacher}</span>
                </div>
                <div>
                  <span className="text-muted me-3">
                    <i className="bi bi-eye me-1"></i>
                    {filteredVideos[0]?.views || 0}
                  </span>
                  <span className="text-muted">
                    <i className="bi bi-heart me-1"></i>
                    {filteredVideos[0]?.likes || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Video ro'yxati</h5>
            </div>
            <div className="card-body p-0">
              <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {filteredVideos.map(video => (
                  <div 
                    key={video.id} 
                    className="p-3 border-bottom hover-bg"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      // Video o'zgartirish
                      document.querySelector('.react-player')?.src?.(video.url);
                    }}
                  >
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <div className="rounded bg-secondary d-flex align-items-center justify-content-center" 
                          style={{ width: '80px', height: '60px' }}>
                          <i className="bi bi-play-btn text-white"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6 className="mb-1">{video.title}</h6>
                        <div className="d-flex justify-content-between">
                          <small className="text-muted">{video.duration}</small>
                          <small className="text-muted">{video.views} ko'rish</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Qo'shimcha ma'lumotlar */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">
                <i className="bi bi-camera-video me-2"></i>
                Video yuklash
              </h5>
            </div>
            <div className="card-body">
              <p>O'zingizning video darslaringizni yuklang va boshqa o'quvchilar bilan ulashing.</p>
              <button className="btn btn-success w-100">
                <i className="bi bi-cloud-upload me-1"></i>
                Video yuklash
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">
                <i className="bi bi-graph-up me-2"></i>
                Statistikalar
              </h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-4">
                  <h3>{videos.length}</h3>
                  <p className="text-muted">Video</p>
                </div>
                <div className="col-4">
                  <h3>{videos.reduce((sum, v) => sum + v.views, 0)}</h3>
                  <p className="text-muted">Ko'rishlar</p>
                </div>
                <div className="col-4">
                  <h3>{categories.length - 1}</h3>
                  <p className="text-muted">Fanlar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .hover-bg:hover {
            background-color: #f8f9fa;
          }
          
          .ratio-16x9 {
            aspect-ratio: 16 / 9;
          }
        `}
      </style>
    </div>
  );
}

export default VideoLessons;
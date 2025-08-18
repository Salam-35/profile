import React, { useState, useEffect } from 'react';
import { Heart, Download, Share2, X, ChevronLeft, ChevronRight, Grid3X3 } from 'lucide-react';

// Import JSON data
import photosData from '../data/gallery.json'; // adjust path if needed

const PhotoGallery = () => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());

  useEffect(() => {
    setPhotos(photosData);

    // If you want to fetch dynamically instead:
    // fetch('/data/gallery.json')
    //   .then(res => res.json())
    //   .then(data => setPhotos(data));
  }, []);

  const recentPhotos = photos.slice(0, 8);

  const toggleLike = (photoId: number) => {
    const newLiked = new Set(likedPhotos);
    if (newLiked.has(photoId)) {
      newLiked.delete(photoId);
    } else {
      newLiked.add(photoId);
    }
    setLikedPhotos(newLiked);
  };

  const openPhotoDetail = (photo: any) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden';
  };

  const closePhotoDetail = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'auto';
  };

  const openAllPhotos = () => {
    setShowAllPhotos(true);
    document.body.style.overflow = 'hidden';
  };

  const closeAllPhotos = () => {
    setShowAllPhotos(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (selectedPhoto) {
          closePhotoDetail();
        } else if (showAllPhotos) {
          closeAllPhotos();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedPhoto, showAllPhotos]);

  const navigatePhoto = (direction: 'next' | 'prev') => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    let newIndex;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % photos.length;
    } else {
      newIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    }

    setSelectedPhoto(photos[newIndex]);
  };

  const PhotoCard = ({ photo, isInModal = false }: { photo: any; isInModal?: boolean }) => (
    <div
      className={`group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden ${
        isInModal ? 'w-full' : ''
      }`}
    >
      {/* Photo */}
      <div
        className="relative overflow-hidden cursor-pointer"
        onClick={() => openPhotoDetail(photo)}
      >
        <img
          src={photo.src}
          alt={photo.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
      </div>

      {/* Photo Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">{photo.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(photo.id);
              }}
              className={`flex items-center space-x-1 transition-colors duration-200 ${
                likedPhotos.has(photo.id)
                  ? 'text-pink-500'
                  : 'text-gray-400 hover:text-pink-500'
              }`}
            >
              <Heart
                size={16}
                fill={likedPhotos.has(photo.id) ? 'currentColor' : 'none'}
              />
              <span className="text-sm">
                {photo.likes + (likedPhotos.has(photo.id) ? 1 : 0)}
              </span>
            </button>
          </div>
          <div className="flex space-x-2">
            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200">
              <Share2 size={14} />
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200">
              <Download size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
            ✨ Photo Gallery ✨
          </h1>
          <p className="text-gray-600">A collection of beautiful moments</p>
        </div>

        {/* Recent Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {recentPhotos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center">
          <button
            onClick={openAllPhotos}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <Grid3X3 size={20} />
            <span>Show All Photos ({photos.length - 8} more)</span>
          </button>
        </div>

        {/* All Photos Gallery Modal */}
        {showAllPhotos && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-40 p-2"
            onClick={closeAllPhotos}
          >
            <div
              className="relative w-full h-full max-w-7xl max-h-[95vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-purple-50 flex-shrink-0">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                    🎨 Complete Gallery
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">{photos.length} beautiful photos</p>
                </div>
                <button
                  onClick={closeAllPhotos}
                  className="bg-white hover:bg-gray-50 rounded-full p-3 shadow-md transition-all duration-200"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Scrollable Photos Grid */}
              <div className="flex-1 overflow-y-auto p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                  {photos.map((photo) => (
                    <PhotoCard key={photo.id} photo={photo} isInModal={true} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Photo Detail Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closePhotoDetail}
          >
            <div
              className="relative max-w-5xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closePhotoDetail}
                className="absolute top-4 right-4 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
              >
                <X size={20} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePhoto('prev');
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 transition-all duration-200"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePhoto('next');
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 transition-all duration-200"
              >
                <ChevronRight size={24} />
              </button>

              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-2/3">
                  <img
                    src={selectedPhoto.src}
                    alt={selectedPhoto.title}
                    className="w-full h-64 lg:h-96 object-cover"
                  />
                </div>
                <div className="p-6 lg:w-1/3 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">{selectedPhoto.title}</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {selectedPhoto.description}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <button
                      onClick={() => toggleLike(selectedPhoto.id)}
                      className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-full font-semibold transition-all duration-200 ${
                        likedPhotos.has(selectedPhoto.id)
                          ? 'bg-pink-500 text-white hover:bg-pink-600'
                          : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                      }`}
                    >
                      <Heart
                        size={18}
                        fill={likedPhotos.has(selectedPhoto.id) ? 'currentColor' : 'none'}
                      />
                      <span>
                        {likedPhotos.has(selectedPhoto.id) ? 'Liked' : 'Like'} (
                        {selectedPhoto.likes + (likedPhotos.has(selectedPhoto.id) ? 1 : 0)})
                      </span>
                    </button>
                    <div className="flex space-x-3">
                      <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200">
                        <Share2 size={16} />
                        <span className="text-sm font-medium">Share</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200">
                        <Download size={16} />
                        <span className="text-sm font-medium">Save</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;

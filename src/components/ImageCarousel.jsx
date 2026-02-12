import React, { useState } from 'react';

const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) return null;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="carousel-container">
            <div className="carousel-slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((img, index) => (
                    <div className="carousel-slide" key={index}>
                        <img src={img} alt={`Slide ${index}`} className="carousel-image" />
                    </div>
                ))}
            </div>

            {images.length > 1 && (
                <>
                    <button className="carousel-btn prev" onClick={prevSlide}>&#10094;</button>
                    <button className="carousel-btn next" onClick={nextSlide}>&#10095;</button>

                    <div className="carousel-dots">
                        {images.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(index)}
                            ></span>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ImageCarousel;

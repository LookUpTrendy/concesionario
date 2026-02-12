import React from 'react';

const CarCard = ({ car, onOpenDetails }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
    };

    // Show the first image or the single image
    const displayImage = car.images ? car.images[0] : car.image;

    return (
        <div className="car-card">
            <div className="car-image-container">
                <img src={displayImage} alt={car.name} className="car-image" />
                <div className="car-type-badge">{car.type}</div>
            </div>
            <div className="car-info">
                <div className="car-header">
                    <h3 className="car-name">{car.name}</h3>
                    <span className="car-brand">{car.brand}</span>
                </div>
                <div className="car-specs">
                    {Object.entries(car.specs).slice(0, 3).map(([key, value]) => (
                        <div className="spec-item" key={key}>
                            <span className="spec-label">{key}</span>
                            <span className="spec-value">{value}</span>
                        </div>
                    ))}
                </div>
                <button className="btn-secondary" onClick={() => onOpenDetails(car)}>
                    Descubrir Modelos
                </button>
            </div>
        </div>
    );
};

export default CarCard;

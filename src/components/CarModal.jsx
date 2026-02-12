import React, { useState, useEffect } from 'react';
import ImageCarousel from './ImageCarousel';

const CarModal = ({ car, onClose }) => {
    if (!car) return null;

    const [selectedExtras, setSelectedExtras] = useState([]);
    const [totalPrice, setTotalPrice] = useState(car.basePrice || 0);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        const extrasTotal = selectedExtras.reduce((sum, extraId) => {
            const extra = car.extras?.find(e => e.id === extraId);
            return sum + (extra ? extra.price : 0);
        }, 0);
        setTotalPrice((car.basePrice || 0) + extrasTotal);
    }, [selectedExtras, car]);

    const toggleExtra = (extraId) => {
        setSelectedExtras(prev =>
            prev.includes(extraId)
                ? prev.filter(id => id !== extraId)
                : [...prev, extraId]
        );
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
    };

    const handleOrder = () => {
        if (orderConfirmed) {
            onClose();
        } else {
            setIsCheckingOut(true);
        }
    };

    const confirmPayment = () => {
        if (!paymentMethod) return alert('Por favor, selecciona un método de pago');
        setOrderConfirmed(true);
    };

    const carImages = car.images || [car.image];

    if (orderConfirmed) {
        return (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content success-view" onClick={(e) => e.stopPropagation()}>
                    <div className="success-content">
                        <div className="success-icon">†</div>
                        <h2 className="text-vibrant">Reserva Confirmada</h2>
                        <p>Le agradecemos su confianza en **Arias23**. Su {car.brand} {car.name} está siendo preparado por nuestros especialistas para la entrega exclusiva.</p>
                        <div className="order-summary">
                            <div className="summary-item"><span>Inversión Total:</span> <span>{formatPrice(totalPrice)}</span></div>
                            <div className="summary-item"><span>Método Electo:</span> <span>{paymentMethod}</span></div>
                        </div>
                        <button className="btn-primary" onClick={onClose}>Regresar a la Exposición</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>

                <div className="modal-body">
                    <div className="modal-image-side">
                        <ImageCarousel images={carImages} />
                        <div className="modal-price-float">
                            <span className="label">Configuración Total</span>
                            <span className="value text-vibrant">{formatPrice(totalPrice)}</span>
                        </div>
                    </div>

                    <div className="modal-info-side">
                        {!isCheckingOut ? (
                            <>
                                <div className="modal-header">
                                    <span className="car-brand">{car.brand}</span>
                                    <h2 className="modal-title">{car.name}</h2>
                                    <p className="modal-base-price">Precio Base: {formatPrice(car.basePrice)}</p>
                                </div>

                                <div className="modal-tabs">
                                    <div className="modal-section">
                                        <h3>Resumen y Descripción</h3>
                                        <p className="modal-description">{car.description}</p>
                                    </div>

                                    <div className="modal-section">
                                        <h3>Especificaciones Técnicas</h3>
                                        <div className="modal-specs-grid">
                                            {Object.entries(car.specs).map(([key, value]) => (
                                                <div className="modal-spec-item" key={key}>
                                                    <span className="spec-label">{key.toUpperCase()}</span>
                                                    <span className="spec-value">{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {car.extras && car.extras.length > 0 && (
                                        <div className="modal-section">
                                            <h3>Extras Opcionales y Mejoras</h3>
                                            <div className="extras-list">
                                                {car.extras.map(extra => (
                                                    <div
                                                        key={extra.id}
                                                        className={`extra-item ${selectedExtras.includes(extra.id) ? 'selected' : ''}`}
                                                        onClick={() => toggleExtra(extra.id)}
                                                    >
                                                        <div className="extra-info">
                                                            <span className="extra-name">{extra.name}</span>
                                                            <span className="extra-desc">{extra.description}</span>
                                                        </div>
                                                        <span className="extra-price">+{formatPrice(extra.price)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="checkout-view">
                                <div className="modal-header">
                                    <h2 className="modal-title">Finalizar Pedido</h2>
                                    <p className="modal-base-price">Total a pagar: {formatPrice(totalPrice)}</p>
                                </div>

                                <div className="modal-section">
                                    <h3>Selecciona Método de Pago</h3>
                                    <div className="payment-options">
                                        <div
                                            className={`payment-card ${paymentMethod === 'Crypto' ? 'selected' : ''}`}
                                            onClick={() => setPaymentMethod('Crypto')}
                                        >
                                            <span className="icon">₿</span>
                                            <div className="p-info">
                                                <span className="p-name">Criptomoneda</span>
                                                <span className="p-desc">BTC, ETH o SOL (5% Descuento)</span>
                                            </div>
                                        </div>

                                        <div
                                            className={`payment-card ${paymentMethod === 'Financing' ? 'selected' : ''}`}
                                            onClick={() => setPaymentMethod('Financing')}
                                        >
                                            <span className="icon">📅</span>
                                            <div className="p-info">
                                                <span className="p-name">Financiación Arias23</span>
                                                <span className="p-desc">Desde 0% TAE a 60 meses</span>
                                            </div>
                                        </div>

                                        <div
                                            className={`payment-card ${paymentMethod === 'Transfer' ? 'selected' : ''}`}
                                            onClick={() => setPaymentMethod('Transfer')}
                                        >
                                            <span className="icon">🏛️</span>
                                            <div className="p-info">
                                                <span className="p-name">Transferencia Bancaria</span>
                                                <span className="p-desc">Confirmación instantánea SEPA</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-section">
                                    <p className="legal-text">
                                        Al confirmar, aceptas los términos de servicio de **Arias23**. Se enviará una factura detallada a tu correo de cliente.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="modal-actions">
                            {!isCheckingOut ? (
                                <>
                                    <button className="btn-primary" onClick={handleOrder}>Finalizar Pedido</button>
                                    <button className="btn-secondary" onClick={onClose}>Cerrar</button>
                                </>
                            ) : (
                                <>
                                    <button className="btn-primary" onClick={confirmPayment}>Confirmar Pago</button>
                                    <button className="btn-secondary" onClick={() => setIsCheckingOut(false)}>Volver</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarModal;

import React, { useState } from 'react'
import CarCard from './components/CarCard'
import CarModal from './components/CarModal'
import AuthModal from './components/AuthModal'
import carsData from './cars.json'

const App = () => {
    const [cars] = useState(carsData);
    const [selectedCar, setSelectedCar] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    const openModal = (car) => {
        setSelectedCar(car);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedCar(null);
        document.body.style.overflow = 'auto';
    };

    const handleLogin = (userData) => {
        setUser(userData);
        setIsAuthOpen(false);
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <div className="app-container">
            <nav className="navbar">
                <a href="/" className="logo text-vibrant">ARIAS23</a>
                <div className="nav-links">
                    <a href="#catalog">Exposición</a>
                    <a href="#">Rendimiento</a>
                    <a href="#">Nosotros</a>
                    {user ? (
                        <div className="user-profile">
                            <span className="user-name">Hola, {user.name}</span>
                            <button className="btn-logout" onClick={handleLogout}>Salir</button>
                        </div>
                    ) : (
                        <button className="btn-secondary btn-nav-auth" onClick={() => setIsAuthOpen(true)}>Registrarse</button>
                    )}
                </div>
            </nav>

            <main>
                <section className="hero">
                    <div className="hero-content">
                        <h1 className="hero-title">EL ARTE DE LA <br /><span className="text-vibrant">PERFECCIÓN</span></h1>
                        <p className="hero-subtitle">Descubre el pináculo del lujo automotriz y el alto rendimiento en el catálogo exclusivo de Arias23.</p>
                        <button className="btn-primary" onClick={() => {
                            document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
                        }}>Explorar Modelos</button>
                    </div>
                </section>

                <section className="catalog" id="catalog">
                    <h2 className="section-title text-vibrant">Inventario Actual</h2>
                    <div className="car-grid">
                        {cars.map(car => (
                            <CarCard key={car.id} car={car} onOpenDetails={openModal} />
                        ))}
                    </div>
                </section>
            </main>

            <footer>
                <p>&copy; 2026 Concesionario Arias23. Todos los derechos reservados.</p>
            </footer>

            {selectedCar && (
                <CarModal car={selectedCar} onClose={closeModal} />
            )}

            {isAuthOpen && (
                <AuthModal onClose={() => setIsAuthOpen(false)} onLogin={handleLogin} />
            )}
        </div>
    )
}

export default App

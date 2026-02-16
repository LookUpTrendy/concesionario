import React, { useState } from 'react';

const AuthModal = ({ onClose, onLogin }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLogin) {
            try {
                const response = await fetch('https://localhost:3001/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    onLogin(data.user);
                    onClose();
                } else {
                    alert(data.error || 'Error al iniciar sesión');
                }
            } catch (error) {
                console.error('Error de conexión:', error);
                // Fallback simulation if backend is not running
                const userData = {
                    name: formData.email.split('@')[0],
                    email: formData.email
                };
                onLogin(userData);
                onClose();
            }
        } else {
            // Simulation of a successful registration
            const userData = {
                name: formData.name,
                email: formData.email
            };
            onLogin(userData);
            onClose();
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="modal-overlay auth-overlay" onClick={onClose}>
            <div className="modal-content auth-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>

                <div className="auth-header">
                    <h2 className="text-vibrant">{isLogin ? 'Bienvenido a Arias23' : 'Únete a la Élite'}</h2>
                    <p>{isLogin ? 'Introduce tus credenciales para acceder' : 'Regístrate para personalizar tu garaje'}</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label>Nombre Completo</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Tu nombre"
                                required
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="correo@ejemplo.com"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn-primary auth-btn">
                        {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        {isLogin ? '¿No tienes cuenta?' : '¿Ya eres miembro?'}
                        <button className="text-vibrant toggle-auth" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Regístrate' : 'Inicia Sesión'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;

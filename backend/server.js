const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { secureLogin } = require('./database');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Login Endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    secureLogin(email, password, (err, user) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (user) {
            res.json({
                message: 'Inicio de sesión exitoso',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        } else {
            res.status(401).json({ error: 'Credenciales inválidas' });
        }
    });
});

// Configure HTTPS
try {
    const options = {
        key: fs.readFileSync(path.join(__dirname, 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
    };

    https.createServer(options, app).listen(PORT, () => {
        console.log(`Servidor SEGURO ejecutándose en https://localhost:${PORT}`);
    });
} catch (error) {
    console.error('No se detectaron certificados SSL. Iniciando en modo HTTP...');
    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
}

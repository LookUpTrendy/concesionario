const http = require('http');

const testPayloads = [
    { email: "' OR '1'='1", password: 'any' },
    { email: 'admin@arias23.com', password: "' OR '1'='1" },
    { email: '"; DROP TABLE users; --', password: 'any' }
];

const testPayload = (payload) => {
    return new Promise((resolve) => {
        const data = JSON.stringify(payload);
        const options = {
            hostname: 'localhost',
            port: 3001,
            path: '/api/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                resolve({
                    payload,
                    status: res.statusCode,
                    body: JSON.parse(body)
                });
            });
        });

        req.on('error', (e) => {
            resolve({ error: e.message });
        });

        req.write(data);
        req.end();
    });
};

async function runTests() {
    console.log('--- Iniciando Pruebas de Inyección SQL ---');
    for (const payload of testPayloads) {
        console.log(`Probando Payload: ${payload.email}`);
        const result = await testPayload(payload);
        if (result.error) {
            console.error('Error: Asegúrate de que el servidor esté ejecutándose (npm run dev-backend)');
            return;
        }
        console.log(`Resultado: ${result.status} ${result.body.error || 'SUCCESS'}`);
        if (result.status === 401) {
            console.log('✅ Protección confirmada: El servidor rechazó el intento de inyección.');
        } else {
            console.log('❌ FALLO: El servidor podría ser vulnerable.');
        }
        console.log('-----------------------------------------');
    }
}

runTests();

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'concesionario.db');
const db = new sqlite3.Database(dbPath);

// Initialize database
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `);

    // Insert a demo user if not exists
    // We use ? as placeholders to prevent SQL injection
    const checkUser = "SELECT * FROM users WHERE email = ?";
    db.get(checkUser, ['admin@arias23.com'], (err, row) => {
        if (!row) {
            const insert = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            db.run(insert, ['Administrador', 'admin@arias23.com', 'admin123']);
        }
    });
});

/**
 * SECURE LOGIN: Using parameterized queries (?)
 * The database engine treats the parameters as data, not as executable code.
 */
const secureLogin = (email, password, callback) => {
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.get(query, [email, password], callback);
};

/**
 * VULNERABLE LOGIN (FOR EDUCATIONAL PURPOSES - DO NOT USE)
 * Using string concatenation is dangerous because user input like "' OR '1'='1" 
 * can alter the SQL command structure.
 */
const vulnerableLogin = (email, password, callback) => {
    const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
    // This is NOT executed, just shown as an example of what to avoid.
    console.warn("DANGER: This query is vulnerable to SQL Injection:", query);
    db.get(query, [], callback);
};

module.exports = {
    db,
    secureLogin
};

// Definiera JWT_SECRET först
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

// Importera jwt efter att JWT_SECRET är definierad
const jwt = require('jsonwebtoken');  // Se till att du har jwt installerat

// === Token Generation Function ===
const generateToken = (user) => {
  // The payload is where you store user-specific data (e.g., username, role, user ID)
  const payload = {
    username: user.username,
    role: user.role,
    userId: user.id,
    shared_account_id: user.shared_account_id,
  };

  // Create the token with expiration time set to 1 hour
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  return token;
};

// === Authentication Middleware ===
const authenticateJWT = (req, res, next) => {
  let token = req.headers['authorization']?.split(' ')[1];  // Försök att hämta token från Authorization-headern

  // Om token inte finns i headern, försök att få det från body (antag att det skickas där)
  if (!token && req.body.token) {
    token = req.body.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  // Verifiera token och dekryptera användardata
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification failed:', err.message);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    req.user = user;  // Lägg till den dekrypterade användardatan på request-objektet
    next();  // Fortsätt till nästa middleware eller rutt
  });
};

module.exports = { authenticateJWT, generateToken };  // Exportera middleware-funktionen

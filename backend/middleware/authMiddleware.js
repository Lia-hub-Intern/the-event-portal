import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

// === Token Generation Function ===
export const generateToken = (user) => {
  const payload = {
    username: user.username,
    role: user.role,
    userId: user.id,
    shared_account_id: user.shared_account_id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  return token;
};


// Function to generate a token
export const generateResetToken = (email, userId) => {
  const payload = { email, userId };  // Include email and userId for identification
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
  return token;
};


// === Authentication Middleware ===
export const authenticateJWT = (req, res, next) => {
  let token = req.headers['authorization']?.split(' ')[1];
  if (!token && req.body.token) {
    token = req.body.token;
  }
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification failed:', err.message);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    console.log('Decoded user:', user); // Log the decoded user to ensure it's being set correctly
    req.user = user;
    next();
  });  
};


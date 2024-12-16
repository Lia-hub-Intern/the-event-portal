import bcrypt from 'bcrypt';
import { generateToken } from '../middleware/authMiddleware.js'; // Se till att du importerar den rätta vägen
import UserModel from '../Models/UserModel.js'; // Ersätt med rätt väg till din UserModel

// === ROUTER: Register User ===
export const registerUser = async (req, res) => {
  try {
    const { username, password, role, first_name, last_name, email } = req.body;

    // Validera att alla obligatoriska fält finns
    if (!username || !password || !role || !first_name || !last_name || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validera lösenordslängd (minst 8 tecken)
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    // Validera e-postformat (enkel RegEx för e-post)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Kontrollera om användaren redan finns
    const existingUserByUsername = await UserModel.getUserByUsername(username);
    if (existingUserByUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hasha lösenordet
    const hashedPassword = await bcrypt.hash(password, 10);

    // Skapa ny användare
    const newUser = await UserModel.createUser(
      username,
      hashedPassword,
      role,
      first_name,
      last_name,
      email
    );

    res.status(201).json({
      message: 'Registration successful! Please log in to continue.',
      user: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ message: 'Error during registration. Please try again later.' });
  }
};

// === ROUTER: Login ===
export const loginUser = async (req, res) => {
  const { username, password, rememberMe } = req.body;

  try {
    const user = await UserModel.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);  // Using generateToken to create the JWT

    res.status(200).json({
      token,
      sharedAccountId: user.shared_account_id,
      rememberMe: rememberMe,  // Return rememberMe flag in response
      message: 'Login successful',
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Failed to login user' });
  }
};

// Export the functions
export default { registerUser, loginUser };

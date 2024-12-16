// controllers/authController.js
const bcrypt = require('bcrypt');
const { generateToken } = require('../helpers/authHelper'); // Om du har denna funktion för att generera token
const UserModel = require('../Models/UserModel'); // Ersätt med rätt väg till din UserModel

// === ROUTER: Register User ===
const registerUser = async (req, res) => {
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
const loginUser = async (req, res) => {
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

// // // GET route for resetting the password
// // app.get('/reset-password', async (req, res) => {
// //   const { token } = req.query;

// //   try {
// //     const storedToken = await UserModel.validateToken(token);
// //     if (!storedToken) {
// //       return res.status(400).json({ message: 'Invalid or expired token' });
// //     }
// //     res.status(200).json({ message: 'Token is valid' });
// //   } catch (error) {
// //     console.error("Error validating token:", error.message);
// //     res.status(500).json({ message: 'Internal server error' });
// //   }
// // });


// // // POST route to reset password
// // app.post('/api/reset-password', async (req, res) => {
// //   const { token, newPassword } = req.body;

// //   if (!token || !newPassword) {
// //     return res.status(400).json({ message: 'Invalid or missing data.' });
// //   }

// //   try {
// //     // Validate the token and reset the password
// //     const user = await UserModel.validateToken(token);
// //     if (!user) {
// //       return res.status(400).json({ message: 'Invalid or expired token.' });
// //     }

// //     await UserModel.resetPassword(user.id, newPassword); // Reset password

// //     res.status(200).json({ message: 'Password has been successfully reset.' });
// //   } catch (err) {
// //     console.error('Error during password reset:', err.message);
// //     res.status(400).json({ message: err.message });
// //   }
// // });


module.exports = { registerUser, loginUser };

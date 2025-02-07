import bcrypt from 'bcrypt';
import pool from '../database/db.js';
import { generateToken } from '../middleware/authMiddleware.js'; // Se till att du importerar den rätta vägen
import UserModel from '../models/UserModel.js'; // Ersätt med rätt väg till din UserModel

// === ROUTER: Register User ===
export const registerUser = async (req, res) => {
  try {
    const {
      username,
      password,
      role,
      first_name,
      last_name,
      email,
      phone_number,
      company_name,
      sharedAccountId,
      consentGiven, // Added for GDPR compliance
    } = req.body;

    // Validate required fields except for phone_number and company_name
    if (!username || !password || !role || !first_name || !last_name || !email || consentGiven === undefined) {
      return res.status(400).json({ message: 'All fields except phone number and company name are required' });
    }

    // Validate password length (minimum 8 characters)
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate phone number format (basic validation for digits only, optional)
    if (phone_number && !/^\d{10,15}$/.test(phone_number)) {
      return res
        .status(400)
        .json({ message: 'Invalid phone number. Use 10-15 digits without spaces or special characters.' });
    }

    // Check if the username already exists
    const existingUserByUsername = await UserModel.getUserByUsername(username);
    if (existingUserByUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Om rollen är "user_account" och inget sharedAccountId finns, skapa ett nytt delat konto
if (role === "user_account" && !sharedAccountId) {
  console.log("Creating new shared account for role 'user_account'...");
  
  // Declare sharedAccountId with let so it can be reassigned
  let sharedAccountId;
  
  const createSharedAccountQuery = `
    INSERT INTO shared_accounts DEFAULT VALUES RETURNING id
  `;
  
  const sharedAccountResult = await pool.query(createSharedAccountQuery);
  sharedAccountId = sharedAccountResult.rows[0]?.id;

  if (!sharedAccountId) {
    throw new Error("Failed to retrieve shared_account_id after creation.");
  }
  console.log("New shared_account_id created:", sharedAccountId);
}


    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);  // This is fine since we're not reassigning it

    // Ensure phone_number and company_name are not empty strings
    const validPhoneNumber = phone_number || null;
    const validCompanyName = company_name || null;

    // Create a new user
    const newUser = await UserModel.createUser(
      username,
      hashedPassword,
      role,
      first_name,
      last_name,
      email,
      sharedAccountId,
      validPhoneNumber,
      validCompanyName,
      consentGiven // Added for GDPR compliance
    );

    // Respond with success message
    res.status(201).json({
      message: 'Registration successful! Please log in to continue.',
      user: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        phone_number: newUser.phone_number,
        company_name: newUser.company_name,
        consentGiven: newUser.consentGiven, // Added for GDPR compliance
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

    // Assuming generateToken is a function that generates a JWT token
    const token = generateToken(user);

    // Return token, sharedAccountId, userId, and rememberMe flag in the response
    res.status(200).json({
      token,
      sharedAccountId: user.shared_account_id,
      userId: user.id,  // Add userId here
      rememberMe: rememberMe,  // Return rememberMe flag in response
      message: 'Login successful',
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Failed to login user' });
  }
};

// === ROUTER: Delete User Data (GDPR Compliance) ===
export const deleteUser = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await UserModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await UserModel.deleteUserById(userId);

    res.status(200).json({ message: 'User data deleted successfully' });
  } catch (err) {
    console.error('Error during user data deletion:', err);
    res.status(500).json({ message: 'Failed to delete user data' });
  }
};

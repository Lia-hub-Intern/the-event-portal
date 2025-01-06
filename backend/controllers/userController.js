// Importera UserModel med korrekt sökväg
import UserModel from '../models/UserModel.js';

// === ROUTER: Get Users by Shared Account ID ===
export const getUsersBySharedAccount = async (req, res) => {
  try {
    const sharedAccountId = req.user.shared_account_id;

    if (!sharedAccountId) {
      return res.status(400).json({ message: 'Shared account ID is missing' });
    }

    const users = await UserModel.getUsersBySharedAccountId(sharedAccountId);

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found for the shared account ID' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'An error occurred while fetching users' });
  }
};


// Handle password reset
export const resetPassword = async (req, res) => {
  const token = req.method === 'GET' ? req.query.token : req.body.token;
  const username = req.method === 'GET' ? req.query.username : req.body.username;
  const newPassword = req.body.newPassword;

  if (req.method === 'GET') {
    // Render password reset form
    if (!token || !username) {
      return res.status(400).send('<h1>Invalid or missing link</h1>');
    }

    return res.send(`
      <form action="/reset-password" method="POST">
        <input type="hidden" name="token" value="${token}" />
        <input type="hidden" name="username" value="${username}" />
        <label for="password">New password:</label>
        <input type="password" id="password" name="newPassword" required minlength="8" />
        <button type="submit">Reset password</button>
      </form>
    `);
  }

  if (req.method === 'POST') {
    // Handle password reset
    try {
      if (!token || !username || !newPassword) {
        return res.status(400).send('<h1>Token, username, and new password are required</h1>');
      }

      if (newPassword.length < 8) {
        return res
          .status(400)
          .send('<h1>Password must be at least 8 characters long</h1>');
      }

      // Call UserModel to reset the password
      const result = await UserModel.resetPassword(token, username, newPassword);
      return res.send(`<h1>${result.message}</h1>`);
    } catch (error) {
      console.error('Error in resetPassword:', error.message);
      return res
        .status(400)
        .send(`<h1>Error: ${error.message || 'Something went wrong.'}</h1>`);
    }
  }

  // If method is not GET or POST
  return res.status(405).send('<h1>Method not allowed</h1>');
};

export const getUsersById = async (req, res) => {
  try {
    // Extract user_id from req.user
    const user_id = req.user?.user_id;

    // Validate user_id
    if (!user_id) {
      return res.status(400).json({ message: 'User ID is missing' });
    }

    const user = await UserModel.getUserById(user_id);

    if (!user) {
      return res.status(404).json({ message: `No user found for ID: ${user_id}` });
    }

    return res.status(200).json({ data: user });
  } catch (error) {
    console.error('Error fetching user:', error.message);
    return res.status(500).json({ message: 'An error occurred while fetching the user' });
  }
};


export default { getUsersBySharedAccount, resetPassword, getUsersById };
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


// Hantera lösenordsåterställning
export const resetPassword = async (req, res) => {
  const token = req.method === 'GET' ? req.query.token : req.body.token;
  const newPassword = req.body.newPassword;

  if (req.method === 'GET') {
    // Skicka formuläret för lösenordsåterställning
    if (!token) {
      return res.status(400).send('<h1>Ogiltig länk</h1>');
    }

    return res.send(`
      <form action="/reset-password" method="POST">
        <input type="hidden" name="token" value="${token}" />
        <label for="password">Nytt lösenord:</label>
        <input type="password" id="password" name="newPassword" required />
        <button type="submit">Återställ lösenord</button>
      </form>
    `);
  }

  if (req.method === 'POST') {
    // Hantera lösenordsåterställning
    try {
      if (!token || !newPassword) {
        return res.status(400).send('<h1>Token och nytt lösenord krävs</h1>');
      }

      const result = await UserModel.resetPassword(token, newPassword);
      return res.send(`<h1>${result.message}</h1>`);
    } catch (error) {
      console.error('Error in resetPassword:', error.message);
      return res.status(400).send(`<h1>Fel: ${error.message}</h1>`);
    }
  }
};



export default {getUsersBySharedAccount, resetPassword };
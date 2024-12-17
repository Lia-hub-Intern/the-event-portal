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
export default {getUsersBySharedAccount };
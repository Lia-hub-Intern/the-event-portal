// Importera UserModel med korrekt sökväg
import UserModel from '../models/UserModel.js';

// === ROUTER: Add Speaker ===
export const addSpeaker = async (req, res) => {
  console.log("Add Speaker route hit");

  const { speakerUsername } = req.body;
  if (!speakerUsername) {
    console.log('No speaker username provided');
    return res.status(400).json({
      message: 'Invalid input. Username is required.',
    });
  }

  try {
    const speaker = await UserModel.getUserByUsername(speakerUsername);
    console.log('Speaker retrieved:', speaker);

    if (!speaker) {
      console.log('Speaker not found');
      return res.status(404).json({ message: 'Speaker not found.' });
    }

    if (speaker.role !== 'speaker') {
      console.log(`User does not have the "speaker" role: ${speaker.role}`);
      return res.status(400).json({ message: 'The specified user does not have the "speaker" role.' });
    }

    if (speaker.shared_account_id) {
      console.log('Speaker already assigned to a shared account');
      return res.status(400).json({ message: 'This speaker is already assigned to a shared account.' });
    }

    const updatedSpeaker = await UserModel.updateUserSharedAccountId(
      speaker.id,
      req.user.shared_account_id
    );
    console.log('Speaker updated:', updatedSpeaker);

    return res.status(200).json({
      message: 'Speaker added successfully.',
      updatedSpeaker,
    });
  } catch (error) {
    console.error('Error adding speaker:', error.message);
    return res.status(500).json({ message: 'An error occurred while adding the speaker.' });
  }
};

// === ROUTER: Remove Speaker ===
export const removeSpeaker = async (req, res) => {
  console.log("Remove Speaker route hit");

  const { speakerUsername } = req.body;
  if (!speakerUsername) {
    console.log('No speaker username provided');
    return res.status(400).json({
      message: 'Invalid input. Username is required.',
    });
  }

  try {
    const speaker = await UserModel.getUserByUsername(speakerUsername);
    console.log('Speaker retrieved:', speaker);
    if (!speaker) {
      console.log('Speaker not found');
      return res.status(404).json({ message: 'Speaker not found.' });
    }

    const updatedSpeaker = await UserModel.removeUserFromSharedAccount(speaker.id);
    console.log('Speaker updated:', updatedSpeaker);

    return res.status(200).json({
      message: 'Speaker removed successfully.',
      updatedSpeaker,
    });
  } catch (error) {
    console.error('Error removing speaker:', error.message);
    return res.status(500).json({ message: 'An error occurred while removing the speaker.' });
  }
};

// === ROUTER: Get All Speakers ===
export const getSpeakers = async (req, res) => {
  try {
    const speakers = await UserModel.getSpeakers();
    return res.status(200).json(speakers);
  } catch (error) {
    console.error("Error in getSpeakers controller:", error.message);
    return res.status(500).json({ message: "Failed to fetch speakers" });
  }
};





// Correct export of the controller functions
export default { addSpeaker, removeSpeaker, getSpeakers };

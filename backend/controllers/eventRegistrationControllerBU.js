import InterestModel from "../models/InterestModel.js"; // Assuming you have a model for interests
import EventRegistrationModel from "../Models/EventRegistrationModelBU.js";
// Controller for Event Registration
const EventRegistrationController = {
  // Create or update registration
  registerInterest: async (req, res) => {
    const { user_id, event_id, interests } = req.body;

    if (!user_id || !event_id || !Array.isArray(interests)) {
      return res.status(400).json({ message: "Invalid request data." });
    }

    try {
      const registeredInterests = [];

      for (const interest of interests) {
        // Get interest_id from interest_type
        const interestRecord = await InterestModel.getInterestByType(interest);

        if (!interestRecord) {
          return res.status(400).json({ message: `Invalid interest: ${interest}` });
        }

        const result = await EventRegistrationModel.createRegistration({
          user_id,
          event_id,
          interest: interestRecord.id,
        });

        if (result) {
          registeredInterests.push(result);
        }
      }

      res.status(201).json({
        message: "Registration successful.",
        registeredInterests,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get registrations for a user and event
  getRegistrations: async (req, res) => {
    const { user_id, event_id } = req.params;

    if (!user_id || !event_id) {
      return res.status(400).json({ message: "User ID and Event ID are required." });
    }

    try {
      const registrations = await EventRegistrationModel.getRegistrationsByEventAndUser(
        user_id,
        event_id
      );

      res.status(200).json(registrations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // DELETE: Remove a user's interest in an event
  deleteRegistration: async (req, res) => {
    const { user_id, event_id, interest_id } = req.body;

    if (!user_id || !event_id || !interest_id) {
      return res.status(400).json({ message: "User ID, Event ID, and Interest ID are required." });
    }

    try {
      const deleted = await EventRegistrationModel.deleteRegistration({ user_id, event_id, interest_id });

      if (deleted) {
        res.status(200).json({ message: "Registration deleted successfully." });
      } else {
        res.status(404).json({ message: "Registration not found." });
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred while deleting the registration." });
    }
  },

  // PUT: Update a user's interest in an event
  updateRegistration: async (req, res) => {
    const { user_id, event_id, old_interest_id, new_interest_id } = req.body;

    if (!user_id || !event_id || !old_interest_id || !new_interest_id) {
      return res.status(400).json({ message: "Invalid request data." });
    }

    try {
      // Delete the old interest
      const deleted = await EventRegistrationModel.deleteRegistration({ user_id, event_id, interest_id: old_interest_id });
      if (!deleted) {
        return res.status(404).json({ message: "Old registration not found." });
      }

      // Add the new interest
      const newRegistration = await EventRegistrationModel.createRegistration({
        user_id,
        event_id,
        interest: new_interest_id,
      });

      res.status(200).json({ message: "Registration updated successfully.", newRegistration });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while updating the registration." });
    }
  },
};

export default EventRegistrationController;

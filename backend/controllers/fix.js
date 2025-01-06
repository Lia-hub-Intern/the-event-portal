import InterestModel from "../models/InterestModel.js";
import EventRegistrationModel from "../models/EventRegistrationModel.js";

const EventRegistrationController = {
  // Create or update registration
  registerInterest: async (req, res) => {
    const { user_id, event_id, interests } = req.body;

    if (!user_id || !event_id || !Array.isArray(interests)) {
      return res.status(400).json({ message: "Invalid request data." });
    }

    try {
      const registeredInterests = [];
      const skippedInterests = [];

      for (const interest of interests) {
        // Get interest_id from interest_type
        const interestRecord = await InterestModel.getInterestByType(interest);

        if (!interestRecord) {
          return res.status(400).json({ message: `Invalid interest: ${interest}` });
        }

        // Check for existing registration
        const existingRegistration = await EventRegistrationModel.getRegistration({
          user_id,
          event_id,
          interest_id: interestRecord.id,
        });

        if (existingRegistration) {
          skippedInterests.push(interest); // Add to skipped list if already registered
          continue;
        }

        // Create new registration
        const result = await EventRegistrationModel.createRegistration({
          user_id,
          event_id,
          interest: interestRecord.id,
        });

        if (result) {
          registeredInterests.push(result);
        }
      }

      res.status(201).json({ message: "Registration processed.", registeredInterests, skippedInterests });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while processing the registration.", error: error.message });
    }
  },

  //Retrieve all registrations for a user and event
  getRegistrations: async (req, res) => {
    const { user_id, event_id } = req.query;

    if (!user_id || !event_id) {
      return res.status(400).json({ message: "Missing user_id or event_id." });
    }

    try {
      const registrations = await EventRegistrationModel.getRegistrationsByEventAndUser(user_id, event_id);

      res.status(200).json({ message: "Registrations retrieved successfully.", registrations });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while retrieving registrations.", error: error.message });
    }
  },
};

export default EventRegistrationController;

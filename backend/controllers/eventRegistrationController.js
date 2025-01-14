import InterestModel from "../models/InterestModel.js";
import EventRegistrationModel from "../Models/EventRegistrationModel.js";
import EventModel from "../Models/EventModel.js";
import UserModel from '../models/UserModel.js';

// === ROUTER: Register user for event ===
const EventRegistrationController = {
  // Register user interests for an event
  registerInterest: async (req, res) => {
    const { user_id, event_id, interests } = req.body;

    // Validate request data
    if (!user_id || !event_id || !Array.isArray(interests)) {
      return res.status(400).json({ message: "Invalid request data. Ensure user_id, event_id, and interests are provided." });
    }

    try {
      // Check if the user exists
      const userExists = await UserModel.getUserById(user_id);
      if (!userExists) {
        return res.status(404).json({ message: `User with ID ${user_id} does not exist.` });
      }

      // Check if the event exists
      const eventExists = await EventModel.getEventById(event_id);
      if (!eventExists) {
        return res.status(404).json({ message: `Event with ID ${event_id} does not exist.` });
      }

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
          registeredInterests.push({ interest: interest, registration: result });
        }
      }

      if (registeredInterests.length === 0 && skippedInterests.length > 0) {
        return res.status(201).json({
          message: "Registration already exists."
        });
      }

      res.status(201).json({
        message: "Registration processed.",
        registeredInterests,
        skippedInterests,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while processing the registration.",
        error: error.message,
      });
    }
  },

  // Retrieve all registrations for a user and event
  getRegistrations: async (req, res) => {
    const { user_id, event_id } = req.params; // Extract parameters from URL

    // Validate request parameters
    if (!user_id || !event_id) {
      return res.status(400).json({ message: "Missing user_id or event_id." });
    }

    try {
      const userExists = await UserModel.getUserById(user_id);
      if (!userExists) {
        return res.status(404).json({ message: `User with ID ${user_id} does not exist.` });
      }

      const eventExists = await EventModel.getEventById(event_id);
      if (!eventExists) {
        return res.status(404).json({ message: `Event with ID ${event_id} does not exist.` });
      }

      const registrations = await EventRegistrationModel.getRegistrationsByEventAndUser(user_id, event_id);

      res.status(200).json({
        message: "Registrations retrieved successfully.",
        registrations,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while retrieving registrations.",
        error: error.message,
      });
    }
  },

  deleteEventRegistrations: async (req, res) => {
    const { event_id } = req.params;

    try {
      console.log('Event ID:', event_id); // Debug log  
      const deletedCount = await EventRegistrationModel.deleteAllRegistrationsForEvent(event_id);

      if (deletedCount === 0) {
        return res.status(404).json({ message: `No registrations found for event ID: ${event_id}` });
      }
      res.status(200).json({
        message: `Successfully deleted ${deletedCount} registrations for event ID: ${event_id}`,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteSpecificEventRegistrations: async (req, res) => {
    const { user_id, event_id, interest_id } = req.body;

    if (!user_id || !event_id || !interest_id) {
      return res.status(400).json({ message: 'user_id, event_id, and interest_id are required.' });
    }

    try {
      const deletedRegistration = await EventRegistrationModel.deleteSpecificRegistrationForEvent({
        user_id,
        event_id,
        interest_id,
      });

      if (deletedRegistration) {
        res.status(200).json({
          message: 'Specific registration deleted successfully.',
          data: {
            user_id: deletedRegistration.user_id,
            event_id: deletedRegistration.event_id,
            interest_id: deletedRegistration.interest_id,
            interest_type: deletedRegistration.interest_type,
          },
        });
      } else {
        res.status(404).json({ message: 'Registration not found.' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default EventRegistrationController;


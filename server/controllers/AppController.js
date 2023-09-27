const logger = require('winston');
const dbPool = require('../models/db');

// retrieve client details
exports.getClientProfile = async (req, res) => {
  try {
    // Check if the client is logged in
    if (!req.session.clientId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const clientId = req.session.clientId; // Retrieve the client's ID from the session

    const [client] = await dbPool.execute('SELECT * FROM clients WHERE id = ?', [clientId]);

    if (!client.length) {
      return res.status(400).json({ message: 'Client not found' });
    }

    // Return the client details as JSON
    return res.status(200).json({ client: client[0] });
  } catch (error) {
    logger.error('Error retrieving client profile:', error);
    return res.status(500).json({ message: 'Error occurred' });
  }
};

// retrieve client details
exports.getCaregiverProfile = async (req, res) => {
    try {
      // Check if the client is logged in
      if (!req.session.caregiverId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const caregiverId = req.session.caregiverId; // Retrieve the client's ID from the session
  
      const [caregiver] = await dbPool.execute('SELECT * FROM caregivers WHERE id = ?', [caregiverId]);
  
      if (!caregiver.length) {
        return res.status(400).json({ message: 'Client not found' });
      }
  
      // Return the client details as JSON
      return res.status(200).json({ caregiver: caregiver[0] });
    } catch (error) {
      logger.error('Error retrieving client profile:', error);
      return res.status(500).json({ message: 'Error occurred' });
    }
  };

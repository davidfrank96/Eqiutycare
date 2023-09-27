const logger = require('winston');
const dbPool = require('../models/db');

exports.viewAllClients = async (req, res) => {
    try {
      const [clients] = await dbPool.execute('SELECT * FROM clients');
  
      // Return the list of clients as JSON
      return res.status(200).json({ clients });
    } catch (error) {
      logger.error('Error viewing all clients:', error);
      return res.status(500).json({ message: 'Error occurred' });
    }
};

exports.viewAllCaregivers = async (req, res) => {
    try {
      const [caregivers] = await dbPool.execute('SELECT * FROM caregivers');
  
      // Return the list of clients as JSON
      return res.status(200).json({ caregivers });
    } catch (error) {
      logger.error('Error viewing all clients:', error);
      return res.status(500).json({ message: 'Error occurred' });
    }
};

exports.viewClientById = async (req, res) => {
    try {
      const clientId = req.params.clientId;
  
      // Query the database to retrieve the client with the specified ID
      const [client] = await dbPool.execute('SELECT * FROM clients WHERE id = ?', [clientId]);
  
      if (!client.length) {
        return res.status(400).json({ message: 'Client not found' });
      }
  
      // Return the client data as JSON
      return res.status(200).json({ client: client[0] });
    } catch (error) {
      logger.error('Error viewing client by ID:', error);
      return res.status(500).json({ message: 'Error occurred' });
    }
};

exports.viewCaregiverById = async (req, res) => {
    try {
      const caregiverId = req.params.clientId;
  
      // Query the database to retrieve the client with the specified ID
      const [caregiver] = await dbPool.execute('SELECT * FROM caregivers WHERE id = ?', [caregiverId]);
  
      if (!caregiver.length) {
        return res.status(400).json({ message: 'Client not found' });
      }
  
      // Return the client data as JSON
      return res.status(200).json({ caregiver: caregiver[0] });
    } catch (error) {
      logger.error('Error viewing client by ID:', error);
      return res.status(500).json({ message: 'Error occurred' });
    }
};
  
  
  
  
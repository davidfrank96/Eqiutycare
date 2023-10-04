const dbPool = require('../models/db');
const isAuthenticated = (req, res, next) => {
  if (req.session.clientId) {
    next();
  } else {
    res.redirect('/client-login'); 
  }
};

const isCaregiverAuthenticated = (req, res, next) => {
  if (req.session.caregiverId) {
    next();
  } else {
    res.redirect('/caregiver-login'); 
  }
};

// retrieve client details
exports.getClientProfile = [isAuthenticated, async (req, res) => {
  try {
    const clientId = req.session.clientId;

    const [client] = await dbPool.execute('SELECT * FROM clients WHERE id = ?', [clientId]);

    if (!client.length) {
      return res.render('client-profile', { message: 'Client not found' });
    }

    return res.render('client-profile', { client: client[0] });
  } catch (error) {
    return res.status(500).json({ message: 'Error occurred' });
  }
}];

// retrieve client details
exports.getCaregiverProfile = [isCaregiverAuthenticated, async (req, res) => {
    try {
      const caregiverId = req.session.caregiverId; // Retrieve the client's ID from the session
  
      const [caregiver] = await dbPool.execute('SELECT * FROM caregivers WHERE id = ?', [caregiverId]);
  
      if (!caregiver.length) {
        return res.render('caregiver-profile', { message: 'caregiver not found' });
      }
  
      return res.render('caregiver-profile', { caregiver: caregiver[0] });
    } catch (error) {
      return res.status(500).json({ message: 'Error occurred' });
    }
}];

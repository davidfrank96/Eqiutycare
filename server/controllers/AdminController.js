const dbPool = require('../models/db');

const isAuthenticated = (req, res, next) => {
  if (req.session.adminId) {
    next();
  } else {
    res.redirect('/admin-login'); 
  }
};

exports.adminDashboard = [isAuthenticated, async (req, res) => {
  try {
    const [clients] = await dbPool.execute('SELECT * FROM clients ORDER BY id DESC LIMIT 5');
    res.render('admin/dashboard', { title: 'Equitycare Global | Admin Dashboard', layout: 'layouts/admin', clients});
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occurred" });
  }
}];


exports.viewAllClients = [isAuthenticated, async (req, res) => {
    try {
      const [clients] = await dbPool.execute('SELECT * FROM clients');
  
      res.render('admin/clients', {title: 'Equitycare Global | Admin Dashboard', layout: 'layouts/admin', clients});
    } catch (error) {
      return res.status(500).json({ message: 'Error occurred' });
    }
}];

exports.viewAllCaregivers = [isAuthenticated, async (req, res) => {
    try {
      const [caregivers] = await dbPool.execute('SELECT * FROM caregivers');
  
      // Return the list of clients as JSON
      res.render('admin/caregivers', {title: 'Equitycare Global | Admin Dashboard', layout: 'layouts/admin', caregivers});
    } catch (error) {
      return res.status(500).json({ message: 'Error occurred' });
    }
}];

exports.viewClientById = [isAuthenticated, async (req, res) => {
    try {
      const clientId = req.params.clientId;
  
      const [client] = await dbPool.execute('SELECT * FROM clients WHERE id = ?', [clientId]);
  
      if (!client.length) {
        return res.status(400).json({ message: 'Client not found' });
      }
  
      res.render('admin/client', {title: 'Equitycare Global | Admin Dashboard', layout: 'layouts/admin', client: client[0]});
    } catch (error) {
      return res.status(500).json({ message: 'Error occurred' });
    }
}];

exports.viewCaregiverById = [isAuthenticated, async (req, res) => {
    try {
      const caregiverId = req.params.caregiverId;
  
      // Query the database to retrieve the client with the specified ID
      const [caregiver] = await dbPool.execute('SELECT * FROM caregivers WHERE id = ?', [caregiverId]);
  
      if (!caregiver.length) {
        return res.status(400).json({ message: 'caregiver not found' });
      }
  
      res.render('admin/caregiver', {title: 'Equitycare Global | Admin Dashboard', layout: 'layouts/admin', caregiver: caregiver[0]});
    } catch (error) {
      return res.status(500).json({ message: 'Error occurred' });
    }
}];

  
  
  
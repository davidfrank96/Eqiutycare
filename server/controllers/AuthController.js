const nodemailer = require('nodemailer');
const fs = require('fs');
const util = require('util');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB (adjust the size limit as needed)
  },
});
// const relativePathToServer = '../';
// const destinationFolder = path.join(__dirname, relativePathToServer, 'uploads');
// const upload = multer({ dest: destinationFolder }); // Configure multer with the upload destination folder
// const readFile = util.promisify(fs.readFile);
const bcrypt = require('bcrypt');
const dbPool = require('../models/db');
// Generate a random OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
}

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE, 
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * Handles a POST request to register a new client.
 * Checks if the email already exists in the database, saves the registration data to the database,
 * and sends a welcome email to the registered email address.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves once the request is handled.
 */
exports.requestService = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      gender,
      password,
      type_of_service,
      health_condition,
      recipient_name,
      recipient_email,
      recipient_gender,
      recipient_dob,
      recipient_address,
      preferred_start_date,
      prefered_service_schedule
    } = req.body;

    console.log(req.body);

    // Check if email already exists in the database
    const [existingUser] = await dbPool.execute('SELECT email FROM clients WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO clients (
        first_name,
        last_name,
        email,
        phone,
        gender,
        password,
        type_of_service,
        health_condition,
        recipient_name,
        recipient_email,
        recipient_gender,
        recipient_dob,
        recipient_address,
        preferred_start_date,
        prefered_service_schedule
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    // Save registration data to the database
    const [results] = await dbPool.execute(query,
      [
        first_name,
        last_name,
        email,
        phone,
        gender,
        hashedPassword,
        type_of_service,
        health_condition,
        recipient_name,
        recipient_email,
        recipient_gender,
        recipient_dob,
        recipient_address,
        preferred_start_date,
        prefered_service_schedule
      ]
    );

    // Send a welcome email
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Welcome to Equity Care Global',
      html: 'Thank you for registering with our service! You can <a href="/client-login">login</a> to view your profile.',
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Registration successful. Welcome email sent.' });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error occurred' });
  }
};

/**
 * Handles a POST request to register a new caregiver.
 * Saves the registration data to the database, including file upload for identification_file,
 * and sends a welcome email to the registered email address.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves once the request is handled.
 */
exports.becomeCaregiver = async (req, res) => {
  try {
    console.log(req.body)
    const {
      first_name,
      last_name,
      email,
      phone,
      gender,
      password,
      date_of_birth,
      address,
      type_of_identification,
      skill,
      years_of_experience,
      services_provided,
      scheduling,
      living_arrangement,
      referee_name,
      referee_email,
      referee_phone,
      referee_occupation,
      relationship_with_referee,
    } = req.body;

    console.log(first_name);

    // Check if email already exists in the database
    const [existingUser] = await dbPool.execute('SELECT * FROM caregivers WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    let identificationFilePath = null;

    if (file) {
      // Get the uploaded file path
      identificationFilePath = file.path;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save to database, including the identification_file path
    const query = `INSERT INTO caregivers (
      first_name,
      last_name,
      email,
      phone,
      gender,
      password,
      date_of_birth,
      address,
      type_of_identification,
      identification_file,
      skill,
      years_of_experience,
      services_provided,
      scheduling,
      living_arrangement,
      referee_name,
      referee_email,
      referee_phone,
      referee_occupation,
      relationship_with_referee
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [results] = await dbPool.execute(query, [
      first_name,
      last_name,
      email,
      phone,
      gender,
      hashedPassword,
      date_of_birth,
      address,
      type_of_identification,
      identificationFilePath,
      skill,
      years_of_experience,
      JSON.stringify(services_provided),
      JSON.stringify(scheduling),
      living_arrangement,
      referee_name,
      referee_email,
      referee_phone,
      referee_occupation,
      relationship_with_referee,
    ]);

    // Send a welcome email to the caregiver
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Welcome to Equity Care Gloabal',
      html: 'Thank you for registering as a caregiver with our service! You can <a href="/caregiver-login">login</a> to access your caregiver profile.',
    };

    await transporter.sendMail(mailOptions);
   
    res.status(200).json({ message: 'Registration successful. Welcome email sent.' });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error occurred' });
  }
};

// Controller for client login
exports.clientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Retrieve the hashed password from the database for the email
    const [client] = await dbPool.execute('SELECT * FROM clients WHERE email = ?', [email]);

    if (!client.length) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare plaintext password with hashed password from the database
    const hashedPassword = client[0].password;

    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const otp = generateOTP();

    await dbPool.execute('UPDATE clients SET otp = ? WHERE email = ?', [otp, email]);

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Login OTP',
      text: `Your OTP for login is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(400).json({ message: 'Failed to send OTP' });
      } else {
        return res.status(200).json({ message: 'OTP sent to your email' });
      }
    });
  } catch (error) {
    return res.status(500).json({message: error.message || 'Error occurred' });
  }
};


// Controller for verifying OTP and completing the login
exports.verifyClientOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check if the provided OTP matches the OTP stored in the database
    const [client] = await dbPool.execute('SELECT * FROM clients WHERE email = ? AND otp = ?', [email, otp]);

    if (!client.length) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Clear the OTP from the database after successful login
    await dbPool.execute('UPDATE clients SET otp = NULL WHERE email = ?', [email]);

    // Start a session for the client
    req.session.clientId = client[0].id;

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Error occurred' });
  }
};

// Controller for caregiver login
exports.caregiverLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Retrieve the hashed password from the database for the email
    const [caregiver] = await dbPool.execute('SELECT * FROM caregivers WHERE email = ?', [email]);

    if (!caregiver.length) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare plaintext password with hashed password from the database
    const hashedPassword = caregiver[0].password;

    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const otp = generateOTP();

    await dbPool.execute('UPDATE caregivers SET otp = ? WHERE email = ?', [otp, email]);

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Login OTP',
      text: `Your OTP for login is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(400).json({ message: 'Failed to send OTP' });
      } else {
        return res.status(200).json({ message: 'OTP sent to your email' });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Error occurred' });
  }
};


// Controller for verifying caregiver OTP and completing the login
exports.verifyCaregiverOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check if the provided OTP matches the OTP stored in the database
    const [caregiver] = await dbPool.execute('SELECT * FROM caregivers WHERE email = ? AND otp = ?', [email, otp]);

    if (!caregiver.length) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Clear the OTP from the database after successful login
    await dbPool.execute('UPDATE caregivers SET otp = NULL WHERE email = ?', [email]);

    // Start a session for the client
    req.session.caregiverId = caregiver[0].id;

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Error occurred' });
  }
};


exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Retrieve the hashed password from the database for the email
    const [caregiver] = await dbPool.execute('SELECT * FROM admin WHERE email = ?', [email]);

    if (!caregiver.length) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (password != caregiver[0].password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const otp = generateOTP();

    await dbPool.execute('UPDATE admin SET otp = ? WHERE email = ?', [otp, email]);

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Login OTP',
      text: `Your OTP for login is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(400).json({ message: 'Failed to send OTP' });
      } else {
        return res.status(200).json({ message: 'OTP sent to your email' });
      }
    });
    return res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Error occurred' });
  }
};

exports.verifyAdminOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check if the provided OTP matches the OTP stored in the database
    const [admin] = await dbPool.execute('SELECT * FROM admin WHERE email = ? AND otp = ?', [email, otp]);

    if (!admin.length) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Clear the OTP from the database after successful login
    await dbPool.execute('UPDATE admin SET otp = NULL WHERE email = ?', [email]);

    // Start a session for the client
    req.session.adminId = admin[0].id;

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Error occurred' });
  }
};
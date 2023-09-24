const nodemailer = require('nodemailer');
const mysql = require('mysql2/promise');
const fs = require('fs');
const util = require('util');
const path = require('path');
const multer = require('multer');
const relativePathToServer = '../';
const destinationFolder = path.join(__dirname, relativePathToServer, 'uploads');
const upload = multer({ dest: destinationFolder }); // Configure multer with the upload destination folder
const readFile = util.promisify(fs.readFile);
const logger = require('winston');
require('dotenv').config()
const bcrypt = require('bcrypt');

// Create a MySQL connection pool
const dbPool = mysql.createPool({
  host: process.env.DB_HOST,
  user:  process.env.DB_USER,
  password:  process.env.DB_PASSWORD,
  database:  process.env.DB_NAME,
});

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE, 
  auth: {
    user: process.env,MAIL_USER,
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
      alertness,
      allergy,
      preferred_start_date,
      prefered_service_schedule,
      service_arrangement,
    } = req.body;

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
        alertness,
        allergy,
        preferred_start_date,
        prefered_service_schedule,
        service_arrangement
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
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
        alertness,
        allergy,
        preferred_start_date,
        prefered_service_schedule,
        service_arrangement,
      ]
    );

    // Send a welcome email
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Welcome to Equity Care Global',
      html: 'Thank you for registering with our service! You can <a href="/login">login</a> to view your profile.',
    };

    await transporter.sendMail(mailOptions);
    logger.info('Email sent');
    res.status(200).json({ message: 'Registration successful. Welcome email sent.' });
  } catch (error) {
    logger.error(error);
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

    // Check if email already exists in the database
    const [existingUser] = await dbPool.execute('SELECT * FROM caregivers WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    let identificationFilePath = null;

    if (req.file) {
      // Get the uploaded file path
      identificationFilePath = req.file.path;
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
      html: 'Thank you for registering as a caregiver with our service! You can <a href="/login">login</a> to access your caregiver profile.',
    };

    await transporter.sendMail(mailOptions);
    logger.info('Email sent');
    res.status(200).json({ message: 'Registration successful. Welcome email sent.' });
  } catch (error) {
    logger.error(error);
    res.status(500).send({ message: error.message || 'Error occurred' });
  }
};



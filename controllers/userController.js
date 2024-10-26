// userController.js

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user-service:5004'; 

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password, user_type, phone } = req.body;

  // Ensure all required fields are provided
  if (!name || !email || !password || !user_type || !phone) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  try {
    // Make a request to the user microservice
    const response = await axios.post(`${USER_SERVICE_URL}/v1/register`, {
      name,
      email,
      password,
      user_type,
      phone,
    });

    res.status(201).json(response.data); // Return the response from the user microservice
  } catch (err) {
    console.error('Error during registration:', err);

    // If the error is a response error from the microservice, relay the status and message
    if (err.response) {
      return res.status(err.response.status).json({ error: err.response.data.error });
    }

    res.status(500).json({ error: 'Server error' });
  }
};

// Log in an existing user and send 2FA code
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password' });
  }

  try {
    // Make a request to the user microservice
    const response = await axios.post(`${USER_SERVICE_URL}/v1/login`, {
      email,
      password,
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error('Login error:', err);

    if (err.response) {
      return res.status(err.response.status).json({ error: err.response.data.error });
    }

    res.status(500).json({ error: 'Server error' });
  }
};

// Verify the 2FA code and complete login
export const verify2FA = async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: 'Please provide email and 2FA code' });
  }

  try {
    // Make a request to the user microservice
    const response = await axios.post(`${USER_SERVICE_URL}/v1/verify-2fa`, {
      email,
      code,
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error('2FA verification error:', err);

    if (err.response) {
      return res.status(err.response.status).json({ error: err.response.data.error });
    }

    res.status(500).json({ error: 'Server error' });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  const { name, profile_picture, phone } = req.body;
  const user_id = req.user.user_id; // Extract user ID from the authenticated token

  if (!user_id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Make a request to the user microservice
    const response = await axios.put(`${USER_SERVICE_URL}/v1/profile`, {
      name,
      profile_picture,
      phone,
    }, {
      headers: {
        Authorization: req.headers.authorization, // Pass along the auth token
      },
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error('Error updating profile:', err);

    if (err.response) {
      return res.status(err.response.status).json({ error: err.response.data.error });
    }

    res.status(500).json({ error: 'Server error' });
  }
};

// Request password reset
export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Please provide email' });
  }

  try {
    // Make a request to the user microservice
    const response = await axios.post(`${USER_SERVICE_URL}/v1/request-password-reset`, {
      email,
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error('Error requesting password reset:', err);

    if (err.response) {
      return res.status(err.response.status).json({ error: err.response.data.error });
    }

    res.status(500).json({ error: 'Server error' });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  if (!resetToken || !newPassword) {
    return res.status(400).json({ error: 'Please provide resetToken and newPassword' });
  }

  try {
    // Make a request to the user microservice
    const response = await axios.post(`${USER_SERVICE_URL}/v1/reset-password`, {
      resetToken,
      newPassword,
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error('Error resetting password:', err);

    if (err.response) {
      return res.status(err.response.status).json({ error: err.response.data.error });
    }

    res.status(500).json({ error: 'Server error' });
  }
};

// Helper function to handle errors
const handleErrorResponse = (err, res) => {
    console.error('Error:', err.message);
    if (err.response) {
      return res.status(err.response.status).json({ error: err.response.data.error });
    }
    res.status(500).json({ error: 'Server error' });
  };
  
  // Example usage in your registerUser function
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/v1/register`, {
      name,
      email,
      password,
      user_type,
      phone,
    });
    res.status(201).json(response.data);
  } catch (err) {
    handleErrorResponse(err, res);
  }
  
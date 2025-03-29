const express = require('express');
const Router = express.Router();
const pool = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

Router.route('/login').post(async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE "userName" = $1', [username]);

    if (user.rows.length === 0) {
      return res.json({ status: false, message: 'User not found' });
    }

    const hpassword = user.rows[0].password;
    const passcheck = await bcrypt.compare(password, hpassword);

    if (!passcheck) {
      return res.json({ status: false, message: 'Wrong password' });
    }

    const token = jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: '1d' });

    res
      .cookie('token', token, { httpOnly: true, secure: true })
      .json({ status: true, message: 'Login successful', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Internal Server Error' });
  }
});

module.exports = Router;

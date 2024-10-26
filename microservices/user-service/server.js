import express from 'express';
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello from user-service!');
});

app.listen(port, () => {
  console.log(`user-service is running on port ${port}`);
});

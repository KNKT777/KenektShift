import express from 'express';
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello from job-service!');
});

app.listen(port, () => {
  console.log(`job-service is running on port ${port}`);
});

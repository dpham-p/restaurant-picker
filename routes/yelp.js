'use strict';
const express = require('express');
const router = express.Router();
const yelp = require('yelp-fusion');

const client = yelp.client(process.env.YELP_KEY);

// Business Search Endpoint
router.get('/', async (req, res) => {
  let searchRequest = {
    ...req.query
  };
  console.log(searchRequest);
  try {
    const response = await client.search(searchRequest);
    res.json(response.jsonBody.businesses);
  } catch (err) {
    console.log(err.message);
  }
});

// Business Details Endpoint
router.get('/:id', async (req, res) => {
  try {
    const response = await client.business(req.params.id);
    res.json(response.jsonBody);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;

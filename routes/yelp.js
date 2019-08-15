'use strict';
const express = require('express');
const router = express.Router();
const yelp = require('yelp-fusion');

const client = yelp.client(process.env.YELP_KEY);

router.get('/', async (req, res) => {
  let searchRequest = {
    ...req.query
  };

  try {
    const response = await client.search(searchRequest);
    res.json(response.jsonBody.businesses);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;

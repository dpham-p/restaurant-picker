const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Filters = require('../models/Filters');

//  @route          GET api/filters
//  @desc           Get user filters
//  @access         Public
router.get('/', auth, async (req, res) => {
  try {
    const filters = await Filters.findOne({ user: req.user.id });
    res.json(filters);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//  @route          POST api/filters
//  @desc           Add new filter
//  @access         Private
router.post(
  '/',
  [auth, [check('categories', 'A category is required').isLength({ min: 1 })]],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { categories, location, latitude, longitude } = req.body;

    try {
      const newFilters = new Filters({
        categories,
        location,
        latitude,
        longitude,
        user: req.user.id
      });

      const filters = await newFilters.save();

      res.json(filters);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//  @route          PUT api/filters
//  @desc           Update filter
//  @access         Private
router.put('/:id', auth, async (req, res) => {
  const { categories, location, latitude, longitude } = req.body;
  const filterFields = {};
  if (categories) filterFields.categories = categories;
  if (location) filterFields.location = location;
  if (latitude) filterFields.latitude = latitude;
  if (longitude) filterFields.longitude = longitude;

  try {
    let filters = await Filters.findById(req.params.id);

    if (!filters) return res.status(404).json({ msg: 'Filters not found' });

    if (filters.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    filters = await Filters.findByIdAndUpdate(
      req.params.id,
      { $set: filterFields },
      { new: true }
    );

    res.json(filters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

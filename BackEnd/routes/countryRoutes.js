// Filename: routes/countryRoutes.js

const express = require('express');
const router = express.Router();
const { getCountriesByName,getCountriesByCode ,getAllCountries} = require('../controllers/countryController');

// GET /api/countries?name={name}
router.get('/countries', getCountriesByName);
router.get('/countries/code', getCountriesByCode);
router.get('/get-all-countries', getAllCountries);


module.exports = router;    




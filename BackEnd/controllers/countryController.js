const { MongoClient } = require('mongodb');
require('dotenv').config();
const { successResponse, errorResponse } = require('../utils/responseHandler');
const STATUS = require('../utils/statusCodes');

const uri = process.env.MONGO_URI || "mongodb+srv://pranshu_mishra:Ditinustask123@cluster0.799phfy.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";

async function getCountriesByName(req, res) {
  const name = req.query.name;
  if (!name) {
    return res.status(400).json({ error: 'Name query parameter is required' });
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('test');
    const collection = db.collection('Country');
    const countries = await collection.find({
      "name.common": { $regex: new RegExp(name, 'i') }
    }).toArray();

    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
}


// ...existing code...

async function getCountriesByCode(req, res) {
  const code = req.query.code;
  if (!code) {
    return res.status(400).json({ error: 'Code query parameter is required' });
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('test');
    const collection = db.collection('Country');
    const countries = await collection.find({
      countryCode: { $regex: new RegExp(code, 'i') }
    }).toArray();

    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
}



// this is for all country -------------
async function getAllCountries(req, res) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('test'); 
    const collection = db.collection('Country'); 

    const countries = await collection.find({}).toArray(); 
    res.json(countries);
  } catch (err) {
    console.error("Error fetching countries:", err);
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
}


module.exports = { getCountriesByName, getCountriesByCode, getAllCountries};
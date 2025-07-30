// Filename: insertCountries.js

const { MongoClient } = require('mongodb');
// require('dotenv').config();

// ✅ Use environment variable if desired, or keep hardcoded URI for now
const uri = "mongodb+srv://pranshu_mishra:Ditinustask123@cluster0.799phfy.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

const countries = [
  {
    name: { common: "Thailand" },
        countryCode: "TH",

    flag: "https://flagcdn.com/w320/th.png",
    population: 69799978,
    capital: ["Bangkok"],
    region: "Asia",
    subregion: "South-Eastern Asia",
    languages: { tha: "Thai" },
  },
  {
    name: { common: "Japan" },
        countryCode: "JP",

    flag: "https://flagcdn.com/w320/jp.png",
    population: 125836021,
    capital: ["Tokyo"],
    region: "Asia",
    subregion: "Eastern Asia",
    languages: { jpn: "Japanese" }
  },
  {
    name: { common: "France" },
        countryCode: "FR",

    flag: "https://flagcdn.com/w320/fr.png",
    population: 67391582,
    capital: ["Paris"],
    region: "Europe",
    subregion: "Western Europe",
    languages: { fra: "French" }
  },
  {
    name: { common: "Brazil" },
    flag: "https://flagcdn.com/w320/br.png",
        countryCode: "BR",

    population: 212559409,
    capital: ["Brasília"],
    region: "Americas",
    subregion: "South America",
    languages: { por: "Portuguese" }
  },
  {
    name: { common: "Egypt" },
        countryCode: "EG",

    flag: "https://flagcdn.com/w320/eg.png",
    population: 102334403,
    capital: ["Cairo"],
    region: "Africa",
    subregion: "Northern Africa",
    languages: { ara: "Arabic" }
  }
];

async function run() {
  try {
    await client.connect();

    // ✅ Use 'test' database and 'Country' collection
    const db = client.db('test');
    const collection = db.collection('Country');

    const result = await collection.insertMany(countries);
    console.log(`${result.insertedCount} documents inserted.`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();

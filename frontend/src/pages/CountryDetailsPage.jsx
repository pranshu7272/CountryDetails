import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CountryDetail from '../components/CountryDetail';

const staticCountries = [
  {
    name: { common: 'India' },
    capital: ['New Delhi'],
    region: 'Asia',
    subregion: 'Southern Asia',
    population: 1400000000,
    flags: { svg: 'https://flagcdn.com/in.svg' },
    languages: { hin: 'Hindi', eng: 'English' },
  },
  {
    name: { common: 'United States' },
    capital: ['Washington D.C.'],
    region: 'Americas',
    subregion: 'Northern America',
    population: 331000000,
    flags: { svg: 'https://flagcdn.com/us.svg' },
    languages: { eng: 'English' },
  },
  {
    name: { common: 'Germany' },
    capital: ['Berlin'],
    region: 'Europe',
    subregion: 'Western Europe',
    population: 83000000,
    flags: { svg: 'https://flagcdn.com/de.svg' },
    languages: { deu: 'German' },
  },
];

const CountryDetailPage = () => {
  const { name } = useParams();
  const { countries } = useSelector((state) => state.countries);

  const decodedName = decodeURIComponent(name);

  // Try redux data first, then static data
  const country =
    countries.find(
      (c) => c.name && c.name.common && c.name.common.toLowerCase() === decodedName.toLowerCase()
    ) ||
    staticCountries.find(
      (c) => c.name && c.name.common && c.name.common.toLowerCase() === decodedName.toLowerCase()
    );

  if (!country) {
    return <p className="text-center mt-10 text-red-500">Country not found.</p>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">{country.name.common}</h2>
      <CountryDetail country={country} />
    </div>
  );
};

export default CountryDetailPage;

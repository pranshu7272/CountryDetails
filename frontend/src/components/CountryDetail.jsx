import React from 'react';

const CountryDetail = ({ country }) => {
  if (!country) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10 border border-gray-200">
      <div className="flex flex-col items-center">
        <img
          src={country.flag}
          alt={`${country.name.common} flag`}
          className="w-40 h-28 object-cover rounded-lg shadow mb-6 border"
        />
        {/* <img
          src={country?.flags?.svg || 'https://via.placeholder.com/300x200?text=No+Flag'}
          alt={`${country.name?.common || 'Unknown'} flag`}
          className="w-40 h-28 object-cover rounded-lg shadow mb-6 border"
        /> */}

        <h1 className="text-4xl font-extrabold mb-2 text-blue-700">{country.name.common}</h1>
        <p className="text-gray-500 text-lg mb-6 italic">{country.region} &middot; {country.subregion}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
        <div>
          <span className="font-semibold text-gray-700">Capital:</span>{' '}
          <span className="text-gray-900">{country.capital?.[0] || 'N/A'}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Population:</span>{' '}
          <span className="text-gray-900">{country.population.toLocaleString()}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Languages:</span>{' '}
          <span className="text-gray-900">
            {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
          </span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Region:</span>{' '}
          <span className="text-gray-900">{country.region}</span>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;

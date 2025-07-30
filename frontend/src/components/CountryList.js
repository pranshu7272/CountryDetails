import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountries } from '../features/countries/countrySlice';
import { Link } from 'react-router-dom';

const CountryList = () => {
  const dispatch = useDispatch();
  const { countries, status, error } = useSelector((state) => state.countries);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCountries());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {countries.map((country, index) => {
        const name = country?.name?.common || `Country ${index}`;
        const capital = country?.capital?.[0] || 'N/A';
        const region = country?.region || 'Unknown';
        const population = country?.population || 0;
        // const flag = country?.flag || 'https://via.placeholder.com/300x200?text=No+Flag';
        // const flag = country?.flags?.svg || 'https://via.placeholder.com/300x200?text=No+Flag';
        const flag = country?.flag || 'https://via.placeholder.com/300x200?text=No+Flag';



        return (
          <Link to={`/country/${encodeURIComponent(name)}`} key={name}>
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition cursor-pointer">
              <h2 className="text-xl font-semibold mb-2">{name}</h2>
              <p><strong>Capital:</strong> {capital}</p>
              <p><strong>Region:</strong> {region}</p>
              <p><strong>Population:</strong> {population.toLocaleString()}</p>
              <img
                src={flag}
                alt={`${name} flag`}
                className="mt-2 w-full h-32 object-cover rounded"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CountryList;

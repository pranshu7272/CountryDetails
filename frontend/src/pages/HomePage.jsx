import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CountrySearch from '../components/CountrySearch';
import CountryList from '../components/CountryList';
import { fetchCountries } from '../features/countries/countrySlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { countries, loading, error } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center mb-6">Country Explorer</h1>
      <CountrySearch />

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      {!loading && !error && <CountryList countries={countries} />}
    </div>
  );
};

export default HomePage;

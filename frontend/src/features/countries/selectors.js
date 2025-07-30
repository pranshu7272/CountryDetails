// features/countries/selectors.js
import { createSelector } from 'reselect';

const countriesState = (state) => state.countries;

export const selectCountries = createSelector(
  [countriesState],
  (countries) => countries.countries
);

export const selectLoading = createSelector(
  [countriesState],
  (countries) => countries.loading
);

export const selectError = createSelector(
  [countriesState],
  (countries) => countries.error
);

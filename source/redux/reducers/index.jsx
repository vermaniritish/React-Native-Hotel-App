import {combineReducers} from 'redux';
import APITokenReducer from './apiToken';
import LanguageReducer from './language';
import CurrencyReducer from './currency';
import FilterPopUpReducer from './filterPopUp';
import LastSearchReducer from './setLastSearches';
const appReducer = combineReducers({
  APITokenReducer,
  LanguageReducer,
  CurrencyReducer,
  FilterPopUpReducer,
  LastSearchReducer
});
const rootReducer = (state, action) => {
  return appReducer(state, action);
};
export default rootReducer;

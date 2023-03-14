const DEBOUNCE_DELAY = 300;

import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const tagInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

tagInput.addEventListener('input', debounce(evt => {
    const queryEntered = tagInput.value.trim();

    cleanHtml();

    if(queryEntered !== ''){
        fetchCountries(queryEntered).then(foundResults => {
            if(foundResults.length > 10){
                Notiflix.Notify.info(
                    'Too many matches found. Please enter a more specific name.'
                ) 
            } else if(foundResults.length === 0){
                Notiflix.Notify.failure(
                    'Oops, there is no country with that name'
                )
            } else if(foundResults.length >= 2 && foundResults.length <= 10){
                renderCountryList(foundResults)
            } else if(foundResults.length === 1) {
                renderCountryInfo(foundResults)
            }
        })
    }
}, DEBOUNCE_DELAY))

function renderCountryList (countries) {
    const markup = countries
      .map(country => {
        return `<li>
        <img src="${country.flags.svg}" alt="Flag of ${
          country.name.official
        }" width="30" hight="20">
           <b>${country.name.official}</p>
                  </li>`;
      })
      .join('');
    countryList.innerHTML = markup;
  }

  function  renderCountryInfo(countries) {
    const markup = countries
      .map(country => {
        return `<li>
    <img src="${country.flags.svg}" alt="Flag of ${
          country.name.official
        }" width="30" hight="20">
       <b>${country.name.official}</b></p>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
          <p><b>Languages</b>: ${Object.values(country.languages)} </p>
              </li>`;
      })
      .join('');
      countryInfo.innerHTML = markup;
}


function cleanHtml() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }
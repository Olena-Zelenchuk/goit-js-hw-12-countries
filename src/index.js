import debounce from 'lodash.debounce';
import API from './fetchCountries';
import './styles.css';
import countriesTpl from './templates/countries.hbs';
import oneCountryTpl from './templates/oneCountry.hbs';
// import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import '../node_modules/@pnotify/core/dist/PNotify.css';
import { alert, notice, info, success, error } from '../node_modules/@pnotify/core';
import '../node_modules/@pnotify/mobile/dist/PNotifyMobile.css';
// defaultModules.set(PNotifyMobile, {});
//  error({
//     text: "I'm an error message.",
// });

  

const refs = {
    input: document.querySelector(".country_name"),
    countryContainer: document.querySelector(".country-container")
}

refs.input.addEventListener('input', debounce(onSearchCountry, 500));


// function debouncedSearch(query) {debounce(query, 500) };

function onSearchCountry(e) {
    const query = e.target.value.toLowerCase();
    
    API.fetchCountries(query)
        .then(onFetchResults)
        .catch(onFetchError)
        
        // .finally(() => form.reset())
    }
    
function onFetchResults(countries) {
    if (countries.length === 1) {
        success({
                    text: "Success! There's the country You find!"
                });
        renderOneCountry(countries);
    } else
        if (countries.length < 10) {
            notice({
                    text: "There're some diffrent countries. Please enter a more specific query"
                });;
            renderCountries(countries);
        
        } else
            if (countries.length > 10) {
                console.log(countries.length);
                refs.countryContainer.innerHTML = '';
                alert({
                    text: "Too many matches found. Please enter a more specific query"
                });
            }
};

function onFetchError(err) {
    refs.countryContainer.innerHTML = '';
    alert({
        text: "Nothing was found!"
    });
}

function renderOneCountry(countries) {
    const oneCountryMarkup = oneCountryTpl(countries);
    console.log(oneCountryMarkup);
    refs.countryContainer.innerHTML = oneCountryMarkup;
}

function renderCountries(countries) {
    const countriesMarkup = countriesTpl(countries);
    refs.countryContainer.innerHTML = countriesMarkup;
 }





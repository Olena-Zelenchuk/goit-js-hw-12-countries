const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountries(searchQuery) {
    return fetch(`${BASE_URL}/name/${searchQuery}`)
        .then(response => {
            if (!response.ok) {
                throw Error("Nothing was found!");
            } else return response.json()
        })
}

export default { fetchCountries };
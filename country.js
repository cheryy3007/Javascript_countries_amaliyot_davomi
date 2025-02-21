const countryDetailsContainer = document.getElementById("country-details");

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
async function fetchCountryDetails() {
    try{
        const countryName = getQueryParam("name");
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const country = (await response.json())[0];
        displayCountryDetails(country);
    } catch (error) {
        console.error("Error:" , error);
    }
}
function displayCountryDetails(country) {
    countryDetailsContainer.innerHTML = `
    <h1>${country.name.common}</h1>
    <img src="${country.flags.png}" alt="Flag">
    <p><strong>Capital:</strong> ${country.capital}</p>
    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Region:</strong> ${country.region}</p>
    <p><strong>Subregion:</strong> ${country.subregion}</p>
    <p><strong>Languages:</strong> ${Object.values(country.languages)}</p>
    <p><strong>Currency:</strong> ${Object.values(country.currencies)[0].name} (${Object.keys(country.currencies)[0]}</p>
    `;
}
function goBack() {
    window.history.back();
}
fetchCountryDetails();
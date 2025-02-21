const containerCards = document.getElementById("container-cards");
const daynight = document.getElementById("daynight");
const searchInput = document.getElementById("search"); // Убедись, что input имеет id="search"
const selectocean = document.getElementById("selectocean");
let countries = []; // Сюда сохраним все данные из API

async function fetchAPI() {
    try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        countries = data; // Сохраняем массив стран
        console.log(countries);
        generator(countries); // Отрисовываем карточки
    } catch (error) {
        console.log(error);
    }
}

fetchAPI();

function generator(products) { 
    containerCards.innerHTML = '';
    products.forEach(element => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${element.flags.png}" alt="flag">
            <h3>${element.name.common}</h3>
        `;
        card.addEventListener("click", () => {
            window.location.href = `country.html?name=${element.name.common}`;
        });
        containerCards.appendChild(card);
    });
}

searchInput.addEventListener("input", async () => {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    const searchQuery = searchInput.value.toLowerCase();
    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchQuery)
    );
    generator(filteredCountries);
});
selectocean.addEventListener("change", async () => {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    const regionQuery = selectocean.value.toLowerCase();
    const filteredCountries = countries.filter(country =>
        country.region.toLowerCase().includes(regionQuery)
    );
    generator(filteredCountries);
});
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("dark-mode");
}

daynight.addEventListener("click", () => {
    if (document.body.classList.toggle("light-mode")) {
        daynight.textContent = " Dark mode🌙";
    } else {
        daynight.textContent = "Light mode☀️";
    }
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
});




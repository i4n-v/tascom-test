const BASE_URL = 'https://api.covid19api.com/summary';

const dateFormate = dateStr => {
    let date = dateStr.split('-');
    date[2] = date[2].split('T')[0];
    date = `${date[1]}/${date[2]} - `;

    return date;
}

const hoursFormate = dateStr => {
    let hours = dateStr.split('T');
    hours = hours[1].split('.');
    hours = hours[0].split('.');
    hours = hours[0].split(':');
    hours = `${hours[0]}:${hours[1]}`;

    return hours;
}

function setValueToElement(element, value) {
    const e = element;
    e.innerHTML = value;
}

const getGlobalData = async () => {
    const globalData = await fetch(BASE_URL)
        .then(response => response.json())
        .catch(e => console.log(e));

    return globalData.Global;
}

const getCountriesData = async () => {
    const countries = await fetch(BASE_URL)
        .then(response => response.json())
        .then( countryData => countryData.Countries)
        .catch(e => console.log(e));

    return countries[0];
}

const setGlobalSituation = async () => {
    const confirmedCases = document.querySelector('#global-confirmed-cases');
    const deathCases = document.querySelector('#global-cases-of-death');
    const date = document.querySelector('#date');
    const hours = document.querySelector('#hours');
    const globalDeath = document.querySelector('#global-deaths');
    const globalConfirmed = document.querySelector('#global-confirmeds');
    const globalNewRecovered = document.querySelector('#global-recovereds');
    const globalRecovered = document.querySelector('#global-r-total');

    const globalData = await getGlobalData();
    const { TotalConfirmed, TotalDeaths, Date, NewDeaths, NewConfirmed, TotalRecovered, NewRecovered } = globalData;

    const dateValue = dateFormate(Date);
    const hoursValue = hoursFormate(Date);

    setValueToElement(confirmedCases, TotalConfirmed);
    setValueToElement(deathCases, TotalDeaths);
    setValueToElement(date, dateValue);
    setValueToElement(hours, hoursValue);
    setValueToElement(globalDeath, NewDeaths);
    setValueToElement(globalConfirmed, NewConfirmed);
    setValueToElement(globalNewRecovered, NewRecovered);
    setValueToElement(globalRecovered, TotalRecovered);
}

const setCountrySituation = async () => {
    const confirmedCases = document.querySelector('.country-confirmed-cases');
    const deathCases = document.querySelector('.country-cases-of-death');
    const date = document.querySelector('.date-country');
    const hours = document.querySelector('.hours-country');
    const countryDeath = document.querySelector('.country-new-deaths');
    const countryConfirmed = document.querySelector('.country-new-confirmeds');
    const countryNewRecovered = document.querySelector('.country-new-recovereds');
    const countryRecovered = document.querySelector('.country-total-recovereds');


    const countries = await getCountriesData();
    const { TotalConfirmed, TotalDeaths, Date, NewDeaths, NewConfirmed, TotalRecovered, NewRecovered } = countries;

    const dateValue = dateFormate(Date);
    const hoursValue = hoursFormate(Date);

    setValueToElement(confirmedCases, TotalConfirmed);
    setValueToElement(deathCases, TotalDeaths);
    setValueToElement(date, dateValue);
    setValueToElement(hours, hoursValue);
    setValueToElement(countryDeath, NewDeaths);
    setValueToElement(countryConfirmed, NewConfirmed);
    setValueToElement(countryNewRecovered, NewRecovered);
    setValueToElement(countryRecovered, TotalRecovered);
}

setInterval(() => {
    setGlobalSituation();
    setCountrySituation();
},5000);
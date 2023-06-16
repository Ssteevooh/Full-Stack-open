import axios from 'axios';

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/"

const getAllCountries = () => {
    const request = axios.get(`${baseUrl}api/all`)
    return request.then(request => request.data)
};

const getCountry = (country) => {
    const request = axios.get(`${baseUrl}api/name/${country}`)
    return request.then(response => response.data)
};

const countriesService = {
    getAllCountries,
    getCountry
};

export default countriesService
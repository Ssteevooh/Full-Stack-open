import axios from 'axios';

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?"
const APIKey = process.env.REACT_APP_API_KEY

const getWeatherData = (cityName) => {
    const request = axios.get(`${baseUrl}q=${cityName}&appid=${APIKey}&units=metric`)
    return request.then(response => response.data)
};

const weatherService = {
    getWeatherData
};

export default weatherService;
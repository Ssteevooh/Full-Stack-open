import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const CountryList = ({ countries, searchCountry, setsearchCountry }) => {
    const [weatherData, setWeatherData] = useState(null);

    const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(searchCountry.toLowerCase()));

    useEffect(() => {
        if (filteredCountries.length === 1) {
            const capital = filteredCountries[0].capital;

            weatherService
                .getWeatherData(capital)
                .then((data) => {
                    setWeatherData(data);
                });
        }
    }, [filteredCountries]);

    const handleShowCountry = (event) => {
        setsearchCountry(event.target.value)
    };

    return (
        <div>
            {filteredCountries.length > 10 ? (
                <div>Too many matches, please specify another filter</div>
            ) : filteredCountries.length === 0 ? (
                <div>No matches found</div>
            ) : filteredCountries.length === 1 ? (
                <div>
                    <h1>{filteredCountries[0].name.common}</h1>
                    <p>Capital: {filteredCountries[0].capital}</p>
                    <p>Area: {filteredCountries[0].area}</p>
                    <h3>Languages:</h3>
                    <ul>
                        {Object.values(filteredCountries[0].languages).map((language) =>
                            <li key={language}>
                                {language}
                            </li>
                        )}
                    </ul>
                    <img
                        src={filteredCountries[0].flags.png}
                        alt={`Flag of ${filteredCountries[0].name.common}`}
                    />
                    {weatherData ? (
                        <div>
                            <h3>Weather in {filteredCountries[0].capital}</h3>
                            <p>Temperature: {weatherData.main.temp}°C</p>
                            <img
                                src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                                alt="Weather Icon"
                            />
                            <p>Wind: {weatherData.wind.speed}m/s</p>
                        </div>
                    ) : (
                        <div>Loading weather data...</div>
                    )}
                </div>
            ) : (
                filteredCountries.map((country) => <div key={country.name.official}>
                    {country.name.common}
                    <button value={country.name.common} onClick={handleShowCountry}>
                        Show
                    </button>
                </div>
                )
            )}
        </div>
    );
};

export default CountryList;
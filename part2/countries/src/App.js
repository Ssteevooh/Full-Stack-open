import { useState, useEffect } from "react";

import CountryList from "./components/CountryList";
import FindCountries from "./components/FindCountries";

import countriesService from "./services/countries"

const App = () => {
    const [countries, setCountries] = useState([]);
    const [searchCountry, setsearchCountry] = useState("");

    useEffect(() => {
        countriesService
            .getAllCountries()
            .then(initalCountries => {
                setCountries(initalCountries)
            })
    }, [searchCountry]);

    const handleChangeCountry = event => {
        setsearchCountry(event.target.value)
    };

    return (
        <div>
            <FindCountries
                countryName={searchCountry}
                handleChangeCountry={handleChangeCountry}
            />
            <CountryList
                countries={countries}
                searchCountry={searchCountry}
                setsearchCountry={setsearchCountry}
            />
        </div>
    );
}

export default App;

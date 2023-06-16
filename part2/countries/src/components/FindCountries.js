const FindCountries = ({ countryName, handleChangeCountry }) => {

    return (
        <div>
            Find countries <input
                value={countryName}
                onChange={handleChangeCountry}
            />
        </div>
    )
};

export default FindCountries;
'use client'

import { useEffect, useRef, useState } from "react";
import WeatherDetails from "@/app/components/weathercomponent";

const APIKEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;

export default function Countries () {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);

    useEffect(async () => {
        const url = 'https://city-list.p.rapidapi.com/api/getCountryList';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': APIKEY, // <-- Replace with your RapidAPI key
                'x-rapidapi-host': 'city-list.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setCountries(result['0']);
            // console.log(result['0']);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const getCities = async (countryIso) => {

        setCities([]);

        const url = `https://city-list.p.rapidapi.com/api/getCity/${countryIso}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': APIKEY, // <-- Replace with your RapidAPI key
                'x-rapidapi-host': 'city-list.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            setCities(result['0']);
        } catch (error) {
            console.error(error);
        }
    }

    const getWeatherData = () => {
        console.log("city", city);
        let cityObj = cities.find((c) => c.name.toLowerCase() === city.toLowerCase());
        // console.log(cityObj);
        
        // Make the weather API call here
        let lat = cityObj.lat;
        let lon = cityObj.long;
        const url = `https://open-weather13.p.rapidapi.com/latlon?latitude=${lat}&longitude=${lon}&lang=EN`;
        const options = {
            method: 'GET',
            headers: {
            'x-rapidapi-key': APIKEY, // <-- Replace with your RapidAPI key
            'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
            }
        };

        try {
            fetch(url, options).then(res => res.json()).then(data => {
                console.log(data);
                setWeather(data);
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="mx-auto mt-10 mb-10 p-8 bg-white rounded-lg shadow-lg flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Countries</h1>
            <p className="mb-6 text-gray-600">List of countries</p>
            <select
                onChange={(e) => getCities(e.target.value)}
                className="w-full p-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <option value="">Select a country</option>
                {countries.map((country, index) => (
                    <option
                        key={index}
                        value={country.iso}
                    >
                        {country.cname}
                    </option>
                ))}
            </select>

            {cities.length <= 0 && (
                <p className="text-blue-500 mb-4">Loading Cities ... </p>
            )}
            {cities.length > 0 && (
                <p className="mb-4 text-gray-700">
                    List of cities ({cities.length}) in the selected country
                </p>
            )}

            {cities.length > 0 && (
                <>
                    <div className="flex items-center gap-4 mb-4 w-full">
                        <input
                            list="cities-list"
                            placeholder="Search city..."
                            autoComplete="on"
                            onChange={(e) => setCity(e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            onClick={getWeatherData}
                            className="text-white bg-blue-700 hover:bg-blue-800 font-small rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Get Weather
                        </button>
                    </div>
                    <datalist id="cities-list">
                        {cities.map((city, index) => (
                            <option
                                key={index}
                                value={city.name}
                            />
                        ))}
                    </datalist>
                    {weather && (
                        <div className="mt-8 mb-8 flex justify-center w-full">
                            <WeatherDetails data={weather} className="w-full" />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
'use client'

import { useEffect, useState } from "react";
import WeatherDetails from "@/app/components/weathercomponent";

const APIKEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;

export default function Location() {

    const [position, setPosition] = useState(null);
    const [weather, setWeather] = useState(null);

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    function success(pos) {
        const crd = pos.coords;

        console.log(pos);

        setPosition(crd);

        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error, options);
        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by this browser.");
            return;
        }
    }, []);

    useEffect(() => {
      if(position === null) {
        console.log("Waiting for position...");
        return;
      }

      // Make the weather API call here
      let lat = position.latitude;
      let lon = position.longitude;
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
    }, [position]);
    

  return (
    <div>
      <h1>Get Current Location</h1>
      <br />
      {position && (
        <div>
          <h2>Current Position:</h2>
          <h3>Latitude: {position.latitude}</h3>
          <h3>Longitude: {position.longitude}</h3>
          <h3>Accuracy: {position.accuracy} meters</h3>
        </div>
      )}
      <br />
      <p>This page retrieves your current geographical location using the Geolocation API.</p>
      <p>Check the console for your location details.</p>
      <WeatherDetails data={weather} />
    </div>
  );
}
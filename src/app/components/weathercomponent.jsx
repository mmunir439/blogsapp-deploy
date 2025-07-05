'use client';

const WeatherDetails = ({ data }) => {
  if (!data) return <p className="text-center text-gray-500">No data available</p>;

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  const tempC = (data.main.temp - 273.15).toFixed(1);
  const feelsLikeC = (data.main.feels_like - 273.15).toFixed(1);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-300 p-6 rounded-2xl shadow-lg max-w-md mx-auto text-center w-full">
      <h2 className="text-3xl font-bold text-blue-800 mb-2">{data.name}, {data.sys.country}</h2>
      <p className="text-sm text-gray-600 mb-4">Lat: {data.coord.lat}, Lon: {data.coord.lon}</p>

      <div className="flex justify-center items-center mb-4">
        <img src={iconUrl} alt={data.weather[0].description} width={100} height={100} />
      </div>

      <p className="text-4xl font-semibold text-gray-800">{tempC}°C</p>
      <p className="text-lg text-gray-600 capitalize mb-2">{data.weather[0].description}</p>
      <p className="text-sm text-gray-500">Feels like: {feelsLikeC}°C</p>

      <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-gray-700">
        <div>
          <p className="font-medium">Humidity</p>
          <p>{data.main.humidity}%</p>
        </div>
        <div>
          <p className="font-medium">Pressure</p>
          <p>{data.main.pressure} hPa</p>
        </div>
        <div>
          <p className="font-medium">Wind Speed</p>
          <p>{data.wind.speed} m/s</p>
        </div>
        <div>
          <p className="font-medium">Cloudiness</p>
          <p>{data.clouds.all}%</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
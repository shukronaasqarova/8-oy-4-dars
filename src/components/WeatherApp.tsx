import React, { useState } from 'react';
import { Sun, Cloud, CloudRain } from 'lucide-react';

const WeatherIcon: React.FC<{ condition: string }> = ({ condition }) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return <Sun className="w-10 h-10 text-yellow-400" />;
    case 'clouds':
      return <Cloud className="w-10 h-10 text-gray-400" />;
    case 'rain':
      return <CloudRain className="w-10 h-10 text-blue-400" />;
    default:
      return <Sun className="w-10 h-10 text-yellow-400" />;
  }
};

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
    main: string;
  }>;
  name: string;
}

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = 'eb8aaca4dc769258332b488bf21d0b51';
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}`;

  const getWeather = () => {
    setLoading(true);
    setError(null);

    fetch(`${API_URL}&q=${city}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ob-havo ma'lumotlarini olishda xatolik yuz berdi");
        }
        return response.json();
      })
      .then((data: WeatherData) => {
        setWeather(data);
      })
      .catch(() => {
        setError("Ob-havo ma'lumotlarini olishda xatolik yuz berdi");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex flex-col">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Ob-havo ma'lumotlari
          </h1>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Shahar nomini kiriting"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={getWeather}
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              
            </button>
          </div>

          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

          {weather && (
            <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl p-6 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {weather.name}
              </h2>
              <div className="mb-4">
                <WeatherIcon condition={weather.weather[0].main} />
              </div>
              <div className="text-5xl font-bold text-gray-800">
                {Math.round(weather.main.temp)}°C
              </div>
              <p className="text-gray-600 capitalize mt-2">
                {weather.weather[0].description}
              </p>

              <div className="flex gap-4 mt-6">
                <div className="bg-white/60 rounded-lg p-3 flex flex-col items-center">
                  <p className="text-gray-600">Namlik</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {weather.main.humidity}%
                  </p>
                </div>
                <div className="bg-white/60 rounded-lg p-3 flex flex-col items-center">
                  <p className="text-gray-600">Holat</p>
                  <p className="text-xl font-semibold text-gray-800 capitalize">
                    {weather.weather[0].main}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;

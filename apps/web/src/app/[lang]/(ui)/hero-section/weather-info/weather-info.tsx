import WeatherCodeIcon from './weather-code-icon';

interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: Current;
  daily_units: DailyUnits;
  daily: Daily;
}

interface CurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  weather_code: string;
}

interface Current {
  time: string;
  interval: number;
  temperature_2m: number;
  weather_code: number;
}

interface DailyUnits {
  time: string;
  weather_code: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
}

interface Daily {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

const getWeatherInfo = async () => {
  const endpoint = 'https://api.open-meteo.com/v1/forecast';
  const params = {
    latitude: '36.76419',
    longitude: '-2.61475',
    current: 'temperature_2m,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    forecast_days: '5',
  };
  const url = new URL(endpoint);
  url.search = new URLSearchParams(params).toString();

  const result = await fetch(url, {
    next: {
      revalidate: 60 * 60 * 6,
    },
  });

  if (!result.ok) {
    return null;
  }

  return result.json() as Promise<WeatherResponse>;
};

const WeatherInfo = async () => {
  const data = await getWeatherInfo();

  if (!data) return null;

  return (
    <div>
      <div className="flex gap-6 items-center">
        <span className="text-lg font-medium w-24">Roquetas de Mar</span>
        <WeatherCodeIcon
          className="h-16 w-16"
          code={data.current.weather_code}
        />
        <span className="text-xl font-medium">
          {data.current.temperature_2m}ºC
        </span>
      </div>
      <div className="flex gap-5 mt-2">
        {data.daily.time.map((day, idx) => (
          <div className="flex flex-col items-center" key={day}>
            <span className="text-sm font-medium">
              {new Date(day).toLocaleDateString('es-ES', {
                weekday: 'short',
              })}
            </span>
            <WeatherCodeIcon
              className="h-8 w-8"
              code={data.daily.weather_code[idx]!}
            />
            <span className="text-sm font-medium text-[#fd9590]">
              {data.daily.temperature_2m_max[idx]}ºC
            </span>
            <span className="text-sm font-medium text-[#3a9bfc]">
              {data.daily.temperature_2m_min[idx]}ºC
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherInfo;

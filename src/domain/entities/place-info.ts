export type Units = {
  time: string;
  temperature2M: "°C";
  relativehumidity2M: "%";
  windspeed10M: "km/h";
};

export type CurrentWeather = {
  temperature: number;
  windSpeed: number;
  windDirection: number;
  weatherCode: number;
  isDay?: number;
  time: Date;
};

export type PlaceInfo = {
  city: string;
  description?: string;
  region?: string;
  state?: string;
  country?: string;
  latitude?: string;
  longitute?: string;
  timestamp?: string;
  timezone?: string;
  elevation?: number;
  currentWeather?: CurrentWeather;
  units?: Units;
};

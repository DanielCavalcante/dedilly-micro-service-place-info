import { PlaceInfo } from "../../domain/entities/place-info";
import { IGetPlaceInfo } from "../../domain/usecases/get-place-info";
import { PlaceInfoRequest } from "../../infra/http/place-info-request";
import { IPlaceInfoRepository } from "../repositories/place-info-repository";
import geoCodeBaseUrl from "../../infra/services/geocode";
import openMeteoBaseUrl from "../../infra/services/open-meteo";

export class GetPlaceInfo implements IGetPlaceInfo {
  constructor(private readonly repository: IPlaceInfoRepository) {}

  async execute(data: PlaceInfoRequest): Promise<PlaceInfo | null> {
    const url = data.country
      ? `search?city=${data.city}&country=${data.country}`
      : `search?city=${data.city}`;
    const response = await geoCodeBaseUrl.get(url);
    const placeInformations = response.data[0]?.display_name?.split(",");

    if (placeInformations) {
      let placeInfo: PlaceInfo = {
        latitude: response.data[0]?.lat,
        longitute: response.data[0]?.lon,
        city: placeInformations[0],
        description: placeInformations[1],
        state: placeInformations[4],
        region: placeInformations[5],
        country: placeInformations[6],
      };

      const openMeteoUrl = `?latitude=${placeInfo.latitude}&longitude=${placeInfo.longitute}&current_weather=true`;
      const openMeteoResponse = await openMeteoBaseUrl.get(openMeteoUrl);

      placeInfo = {
        ...placeInfo,
        elevation: openMeteoResponse.data.elevation,
        currentWeather: {
          temperature: openMeteoResponse.data.current_weather.temperature,
          windSpeed: openMeteoResponse.data.current_weather.windspeed,
          windDirection: openMeteoResponse.data.current_weather.winddirection,
          weatherCode: openMeteoResponse.data.current_weather.weathercode,
          isDay: openMeteoResponse.data.current_weather.is_day,
          time: new Date(),
        },
      };

      return await this.repository.getLatLongByCityAndCountry(placeInfo);
    }

    return null;
  }
}

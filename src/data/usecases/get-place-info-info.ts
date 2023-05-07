import { PlaceInfo } from "../../domain/entities/place-info";
import { IGetPlaceInfo } from "../../domain/usecases/get-place-info";
import { PlaceInfoRequest } from "../../infra/http/place-info-request";
import { IPlaceInfoRepository } from "../repositories/place-info-repository";
import geoCodeBaseUrl from "../../infra/services/geocode";

export class GetPlaceInfo implements IGetPlaceInfo {
  constructor(private readonly repository: IPlaceInfoRepository) {}

  async execute(data: PlaceInfoRequest): Promise<PlaceInfo | null> {
    const url = data.country
      ? `search?city=${data.city}&country=${data.country}`
      : `search?city=${data.city}`;
    const response = await geoCodeBaseUrl.get(url);
    const placeInformations = response.data[0]?.display_name?.split(",");

    if (placeInformations) {
      const placeInfo: PlaceInfo = {
        latitude: response.data[0]?.lat,
        longitute: response.data[0]?.lon,
        city: placeInformations[0],
        description: placeInformations[1],
        state: placeInformations[4],
        region: placeInformations[5],
        country: placeInformations[6],
      };
      return await this.repository.getLatLongByCityAndCountry(placeInfo);
    }

    return null;
  }
}
